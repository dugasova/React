import { ON_HOLD, STATUS_DONE, STATUS_IN_PROGRESS, STATUS_TODO } from "../../constats/todos";
import "./style.scss";
import Tasks from "../Tasks/Tasks";
import TodosForm from "./TodosForm/TodosForm";
import useToodsFilter from "../../hooks/useToodsFilter";
import useTodos from "../../hooks/useTodos";

export default function Todos() {
  const { todos, handleItemDeleta, addNewTask, updateTodoStatus } = useTodos()
  const { taskToDo, taskInProgress, taskDone, taskOnHold } = useToodsFilter(todos)

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
