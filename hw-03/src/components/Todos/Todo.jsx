import Button from "../Button/Button"
export default function Todo({ 
  todo, 
  onProgress, 
  id 
  }) {

  return (
    <>
      <li className="todo">{todo}</li>
      <Button title="In Progress" handleClick={() => onProgress(id)} />
    </>
  )
}

