import Button from "../Button/Button"

export default function TaskItem({ btns = [], task = {} }) {
    const { id, title } = task; 
   
  return (
    <li>
      <p>{title}{" "}</p>
      <div className="item-btns">
        {btns.map((btn, index) => ( 
          <Button key={index} title={btn.title} handleClick={() => btn.action(id)} />
        ))}

      </div>
    </li>
  )
}