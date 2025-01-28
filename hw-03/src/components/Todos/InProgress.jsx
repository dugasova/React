import Button from "../Button/Button";

export default function InProgress({
  todo,
  done,
  id,
  toDo
}) {

  return (
    <>
      <li className="in-progress">{todo}</li>
      <Button title="Done" handleClick={() => done(id)} />
      <Button title="To Do" handleClick={() => toDo(id)} />
    </>
  )
}
