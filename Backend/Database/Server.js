const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
console.log(process.env.PORT)

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const hardcodedUser = {
  harduser: 'demo',
  hardpass: 'password',
};

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM TodoList WHERE is_deleted = false', (err, results) => {
    if (err) {
      res.status(500).send(`Internal Server Error`);
    }
    res.json(results);
  });
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;

  db.query(
    'INSERT INTO TodoList (name, description, checkmark, creation_time, edited_time, is_deleted) VALUES (?, ?, false, NOW(), NOW(), false)',
    [name, description],
    (err, result) => {
      if (err) {
        res.status(500).send(`Internal Server Error`);
      }
      res.status(201).send(`Task added with ID: ${result.insertId}`);
    }
  );
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { checkmark } = req.body;

  db.query(
    'UPDATE TodoList SET checkmark = ?, edited_time = NOW() WHERE id = ?',
    [checkmark, taskId],
    (err) => {
      if (err) {
        res.status(500).send(`Internal Server Error`);
      } else {
        res.status(200).send(`Task with ID ${taskId} updated`);
      }
    }
  );
});

// Soft delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.query('UPDATE TodoList SET is_deleted = true WHERE id = ?', [taskId], (err) => {
    if (err) {
      res.status(500).send(`Internal Server Error`);
    } else {
      res.status(200).send(`Task with ID ${taskId} soft-deleted`);
    }
  });
});

app.post('/api/login', (req, res) => {
  const { harduser, hardpass } = req.body;

  // Validate username and password
  if (harduser === hardcodedUser.harduser && hardpass === hardcodedUser.hardpass) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ success: false, message: 'Logout failed' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});