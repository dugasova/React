import React from 'react'
import { useState, useEffect } from 'react';
import service from '../services/todos';

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await service.get();
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemDeleta = async (id) => {
    try {
      await service.delete(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const addNewTask = async (item) => {
    try {
      const response = await service.post(item);
      setTodos((prevTodos) => [...prevTodos, response]);
      getTodos()
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const updateTodoStatus = async (taskId, newStatus) => {
    try {
      const updatedTodo = todos.find(todo => todo.id === taskId);
      if (updatedTodo) {
        const updatedTodoWithStatus = { ...updatedTodo, status: newStatus };
        const response = await service.put(taskId, updatedTodoWithStatus);
        setTodos(prevTodos => prevTodos.map(todo => todo.id === taskId ? response : todo));
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { todos, handleItemDeleta, addNewTask, updateTodoStatus }
}
