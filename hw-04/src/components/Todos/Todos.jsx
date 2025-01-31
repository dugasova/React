import { useState, useEffect } from "react";
import service from "../../services/todos";
import { ON_HOLD, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_TODO } from "../../constats/todos";
import "./style.scss";
import Tasks from "../Tasks/Tasks";
import TodosForm from "./TodosForm/TodosForm";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [taskToDo, setTaskTodo] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [taskOnHold, setTaskOnHold] = useState([])

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

  useEffect(() => {

    getTodos();
  }, []);

  useEffect(() => {
    setTaskTodo(todos.filter((task) => task.status === STATUS_TODO));
    setTaskInProgress(todos.filter((task) => task.status === STATUS_IN_PROGRESS));
    setTaskDone(todos.filter((task) => task.status === STATUS_DONE));
    setTaskOnHold(todos.filter((task) =>
      task.status !== STATUS_TODO && task.status !== STATUS_IN_PROGRESS && task.status !== STATUS_DONE
    ))
  }, [todos]);

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

  const TASKS = [
    {
      title: 'Todo',
      tasks: taskToDo,
      btns: [
        { title: 'In Progress', action: (id) => updateTodoStatus(id, STATUS_IN_PROGRESS) },
      ],
    },
    {
      title: 'On Hold',
      tasks: taskOnHold,
      btns: [
        { title: 'Todo', action: (id) => updateTodoStatus(id, STATUS_TODO) },
        { title: 'In Pogress', action: (id) => updateTodoStatus(id, STATUS_IN_PROGRESS) },
      ],
    },
    {
      title: 'In Progress',
      tasks: taskInProgress,
      btns: [
        { title: 'Done', action: (id) => updateTodoStatus(id, STATUS_DONE) },
        { title: 'Todo', action: (id) => updateTodoStatus(id, STATUS_TODO) },
        { title: 'On Hold', action: (id) => updateTodoStatus(id, ON_HOLD) },

      ],
    },
    {
      title: 'Done',
      tasks: taskDone,
      btns: [
        { title: 'To Archive', action: (id) => handleItemDeleta(id) },
      ],
    },

  ];
  const addNewTask = async (item) => {
    try {
      const response = await service.post(item);
      setTodos((prevTodos) => [...prevTodos, response]);
      getTodos()
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  return (
    <div className="container">
      <TodosForm liftingNewTask={addNewTask} />
      <div className="todos">
        {TASKS.map((item, index) => (
          <Tasks key={index} title={item.title} tasks={item.tasks} btns={item.btns} />
        ))}
      </div>
    </div>
  );
}
