import Button from "../Button/Button";

export default function Done({ 
  todo, 
  toArchive, 
  id 
}) {
  return (
    <>
      <li className="done">{todo}</li>
      <Button title="In Progress" handleClick={() => toArchive(id)} />

    </>
  )
}

