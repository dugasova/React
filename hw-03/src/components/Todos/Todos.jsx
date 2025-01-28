import { useState, useEffect } from "react";
import service from "../../services/todos";
import { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_TODO } from "../../constats/todos";
import "./style.scss";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

export default function Todos() {
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

  useEffect(() => {
    getTodos();
  }, []);

  const updateTodoStatus = async (id, newStatus) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    const updatedTodoWithStatus = { ...updatedTodo, status: newStatus };

    try {
      const response = await service.put(id, updatedTodoWithStatus);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? response : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const todoTasks = todos.filter((task) => task.status === STATUS_TODO).length;
  const inProgressTasks = todos.filter((task) => task.status === STATUS_IN_PROGRESS).length;
  const doneTasks = todos.filter((task) => task.status === STATUS_DONE).length;

  return (
    <div className="todos">
      {todos.length ? (
        <table>
          <thead>
            <tr>
              <th>Todo: {todoTasks}</th>
              <th>In Progress: {inProgressTasks}</th>
              <th>Done: {doneTasks}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                  {todos.filter(todo => todo.status === STATUS_TODO).map(todo => (
                    <Todo
                      todo={todo.title}
                      key={todo.id}
                      onProgress={() => updateTodoStatus(todo.id, STATUS_IN_PROGRESS)}
                    />
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {todos.filter(todo => todo.status === STATUS_IN_PROGRESS).map(todo => (
                    <InProgress
                      key={todo.id}
                      todo={todo.title}
                      id={todo.id}
                      done={() => updateTodoStatus(todo.id, STATUS_DONE)}
                      toDo={() => updateTodoStatus(todo.id, STATUS_TODO)}
                    />
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {todos.filter(todo => todo.status === STATUS_DONE).map(todo => (
                    <Done
                      key={todo.id}
                      todo={todo.title}
                      status={todo.status}
                      id={todo.id}
                      toArchive={() => handleItemDeleta(todo.id)}
                    />
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
