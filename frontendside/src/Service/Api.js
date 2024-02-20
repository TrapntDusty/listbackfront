const BASE_URL = 'http://localhost:3300';

const adaptTaskFromBackend = (backendTask) => {
    if (!backendTask.deleted) {
        return {
          id: backendTask.id,
          title: backendTask.name,
          description: backendTask.description,
          checkmark: backendTask.checkmark,
          creation: backendTask.creation_time,
          edited: backendTask.edited_time,
          deleted: backendTask.is_deleted,
        };
    }
  return null;
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    const data = await response.json();
    const adaptedTasks = data.map(adaptTaskFromBackend).filter(task => task !== null);
    return adaptedTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();

    const adaptedTask = adaptTaskFromBackend(data);
    return adaptedTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
    } else {
      throw new Error(`Error updating task with ID ${taskId}`);
    }
  } catch (error) {
    throw error;
  }
};

export const softdelete = async (taskId, taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    console.log('Delete response:', response);

    if (response.ok) {
    } else {
      throw new Error(`Error updating task with ID ${taskId}`);
    }
  } catch (error) {
    throw error;
  }
};