import { useState } from "react";
import { STATUS_TODO, STATUS_IN_PROGRESS, STATUS_DONE, NEW_TASK_DEFAULT, ON_HOLD } from "../../../constats/todos";
import "./style.scss";
import Button from "../../Button/Button";

export default function TodosForm({ liftingNewTask }) {
  const [newTask, setNewTask] = useState(NEW_TASK_DEFAULT);

  const handleFormTitle = (e) => {
    setNewTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleFormStatus = (e) => {
    setNewTask((prev) => ({ ...prev, status: parseInt(e.target.value) }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    liftingNewTask(newTask);
    setNewTask({ title: "", status: ON_HOLD });
  };

  return (
    <form className="todo-form" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend className="legend">Create task</legend>
      <label>
        Title:
        <input type="text" onChange={handleFormTitle} value={newTask.title} required />
      </label>
      <label>
        Status:
        <select onChange={handleFormStatus} value={newTask.status}>
          <option value={STATUS_TODO}>To Do</option>
          <option value={STATUS_IN_PROGRESS}>In Progress</option>
          <option value={STATUS_DONE}>Done</option>
        </select>
      </label>
      <Button className="formbtn" type="submit" title="Add Task"/>
    </fieldset>
    </form>
  );
}