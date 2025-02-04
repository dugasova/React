import TaskItem from "../TaskItem/TaskItem"
import "./style.scss";

export default function Tasks({ title = '', tasks = [], btns = [] }) {

  return (
    <div className="tasks">
      <h3>{title}: {tasks.length}</h3>
      {tasks.length ? (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} btns={btns} />
          ))}
        </ul>
      ) : null}

    </div>
  )
}
