export default function Button({ title, handleClick, className = "btn" }) {
  return <button className={className} onClick={handleClick}>{title}</button>
}
