import { useContext } from 'react'
import "./style.scss";
import PlayersContext from '../../../contexts/PlayersContext'
import PlayersCard from '../PlayersCard/PlayersCard';
import Button from '../../Button/Button';

export default function PlayersCards() {
  const { statePlayers, startBattle } = useContext(PlayersContext)
  console.log(statePlayers);
  return (
    <>
      <div className='players__cards'>
        {statePlayers.players.map((item, index) => (
          <PlayersCard key={index} item={item} index={index} />
        ))}
      </div>
      {statePlayers.playersSelected && (
        <div>
          <Button title="Start Battle" handleClick={startBattle} className='players__cards-battle'/>
        </div>
      )}
    </>
  )
}

