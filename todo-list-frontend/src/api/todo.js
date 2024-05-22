import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/todo', // 确保baseURL是正确的
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  try {
    const response = await api.get('/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await api.post('/add', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.post(`/delete`, { id });
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const complete = async (id) => {
  try {
    const response = await api.post(`/complete`, { id });
    return response.data;
  } catch (error) {
    console.error('Error updating todo status:', error);
    throw error;
  }
};
