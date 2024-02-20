import React, { useState, useEffect } from 'react';
import { getTasks,softdelete } from '../Service/Api';

const SideTable = ({ sortingOption,searchTerm  }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      // Filter tasks with checkmark set to false
      const filteredTasks = tasksData.filter(task => task.checkmark);

      // Sort the filtered tasks based on the sorting option
      const sortedTasks = [...filteredTasks];

      if (sortingOption === 'start') {
        sortedTasks.sort((a, b) => a.id - b.id);
      } else if (sortingOption === 'created') {
        sortedTasks.sort((a, b) => new Date(a.creation) - new Date(b.creation));
      } else if (sortingOption === 'edited') {
        sortedTasks.sort((a, b) => new Date(a.edited) - new Date(b.edited));
      } else if (sortingOption === 'alphabetical') {
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      }

      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching and sorting tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [sortingOption]);

  const filteredTodos = tasks.filter((task) => {
    const searchValue = searchTerm.toLowerCase();
  
    // Ensure properties exist and convert to lowercase
    const title = task.title ? task.title.toLowerCase() : '';
    const description = task.description ? task.description.toLowerCase() : '';
    
    // Convert date properties to string in a specific format if they are date objects
    const creation = task.creation ? task.creation.toString() : '';
    const edited = task.edited ? task.edited.toString() : '';
  
    return (
      title.includes(searchValue) ||
      description.includes(searchValue) ||
      creation.includes(searchValue) ||
      edited.includes(searchValue)
    );
  });

  const handleEdit = (todo) => {
    const confirmed = window.confirm('Are you sure you want to EDIT this todo?');
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to DELETE this todo?');
    if (confirmed) {
      try {
        const updatedTaskData = { is_deleted: true };
  
        // Call the updateTask function to update the task status in the database
        await softdelete(taskId, updatedTaskData);
  
        // Update the local state to reflect the changes
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, is_deleted: true } : task
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div>
      <div className="bg-blue-200 p-2 w-full mb-50">
        <div className="border border-blue-300 border-5 p-4 rounded mt-4">
          <h3 className="text-lg font-semibold mb-2">To-Do</h3>
          <ul>
            {filteredTodos.map((tasks) => (
              <li key={tasks.id} className="mb-4">
              <div className="border border-blue-300 p-4 rounded relative flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold mb-2 whitespace-pre-line break-words">{tasks.title}</h4>
                  <p className="text-gray-600 text-sm mb-2 whitespace-pre-line break-words">{tasks.description}</p>
                </div>
                <div className="text-xs text-gray-400 flex items-center space-x-2">
                <div className="text-xs text-gray-400 absolute bottom-0 right-3 flex">
                  <p className="mr-2">Created: {tasks.creation}</p>
                  <span>|</span>
                  <p className="ml-2">Edited: {tasks.edited}</p>
                </div>
                  <button onClick={() => handleEdit(tasks.id)} className="cursor-pointer">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      className="h-5 w-5 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(tasks.id)} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideTable;