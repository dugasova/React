import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_TODO } from '../constats/todos';

export default function useToodsFilter(todos) {
  const [taskToDo, setTaskTodo] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [taskOnHold, setTaskOnHold] = useState([])


  useEffect(() => {
    setTaskTodo(todos.filter((task) => task.status === STATUS_TODO));
    setTaskInProgress(todos.filter((task) => task.status === STATUS_IN_PROGRESS));
    setTaskDone(todos.filter((task) => task.status === STATUS_DONE));
    setTaskOnHold(todos.filter((task) =>
      task.status !== STATUS_TODO && task.status !== STATUS_IN_PROGRESS && task.status !== STATUS_DONE
    ))
  }, [todos]);

  return { taskToDo, taskInProgress, taskDone, taskOnHold }
}

