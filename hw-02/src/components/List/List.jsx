import { useEffect, useState } from 'react';
import './style.scss';

const ANIMALS = [
  { type: `turtle`, icon: `🐢` },
  { type: `octopus`, icon: `🐙` },
  { type: `fish`, icon: `🐠` },
  { type: `flamingo`, icon: `🦩` },
  { type: `penguin`, icon: `🐧` }
]

export default function List() {
  const [list, setList] = useState(ANIMALS);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setList((prevList) => {
        const nonActiveAnimals = prevList.filter(animal => !animal.active)
        if (nonActiveAnimals.length === 0) {
          clearInterval(intervalId)
          return prevList
        }
        const randomIndex = Math.floor(Math.random() * nonActiveAnimals.length)
        const newList = prevList.map(animal =>
          animal === nonActiveAnimals[randomIndex] ? { ...animal, active: true } : animal
        )
        return newList
      })
    }, 1000);
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <table className='list-table'>
      <tbody>
        {list.map((animal) => (
          <tr key={animal.type} className={animal.active ? 'active' : ''}>
            <td>{animal.type}</td>
            <td>{animal.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
