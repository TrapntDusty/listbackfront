const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const config = require('./Config')

const app = express();
const port = config.db.port;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM TodoList WHERE is_deleted = false', (err, results) => {
    if (err) throw err;
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
      if (err) throw err;
      res.status(201).send(`Task added with ID: ${result.insertId}`);
    }
  );
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { name, description, checkmark } = req.body;

  db.query(
    'UPDATE TodoList SET name = ?, description = ?, checkmark = ?, edited_time = NOW() WHERE id = ?',
    [name, description, checkmark, taskId],
    (err) => {
      if (err) throw err;
      res.status(200).send(`Task with ID ${taskId} updated`);
    }
  );
});

// Soft delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.query('UPDATE TodoList SET is_deleted = true WHERE id = ?', [taskId], (err) => {
    if (err) throw err;
    res.status(200).send(`Task with ID ${taskId} soft-deleted`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});