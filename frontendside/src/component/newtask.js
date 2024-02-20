import React, { useState } from 'react';
import { createTask } from '../Service/Api';

const NewTask = ({ onAddTask }) => {
  
  const [task, setTask] = useState({
    name: '',
    description: '',
    checkmark: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddClick = async () => {
    // Check if the name is not empty before adding the task
    if (task.name.trim() !== '') {
      try {
        // Call the createTask function to add the task
        const createdTask = await createTask(task);

        // Update the tasks in the local state
        onAddTask(createdTask);

        // Clear the input fields
        setTask({ name: '', description: '', checkmark: false });
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-200 mb-4 rounded">
      <h2 className="text-xl font-semibold mb-2">New Task</h2>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border border-gray-300 p-2 rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="checkmark"
            checked={task.checkmark}
            onChange={handleInputChange}
            className="mr-2"
          />
          Completed?
        </label>
        <button onClick={handleAddClick} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
