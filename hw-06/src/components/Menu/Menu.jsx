import { NavLink } from "react-router-dom";
import './style.scss'

export default function Menu() {
  const listStyle = (value) => {
    return value.isActive ? `nav-active` : null
  }

  const routes = [
    {
      path: '/',
      title: "Home"
    },
    {
      path: '/countries',
      title: "Countries"
    },
  ]

  return (
    <nav>
      <ul>
        {routes.map((item, index) => (
          <li key={index}>
            <NavLink className={listStyle} to={item.path}>{item.title}</NavLink>
          </li>)
        )}
      </ul>
    </nav>
  )
}
