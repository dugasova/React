import React, { useContext, useRef } from 'react'
import "./style.scss";
import Button from '../Button/Button';
import PlayersContext from '../../contexts/PlayersContext';

export default function PlayersAmount() {
  const { statePlayers, playersAmountSubmit} = useContext(PlayersContext)
  const inputPlayersCount = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    playersAmountSubmit({
      playersCount: +inputPlayersCount.current.value
    })
  }

  return (
    <form className='player__amount' onSubmit={handleSubmit}>
      <label>Count of Players
        <input
          type="number"
          min="2" max="6" 
          defaultValue={statePlayers.playersCount}
          ref={inputPlayersCount} 
        />
      </label>
      <Button
        title="Sudmit"
        className="player__amount-submit"
      />
    </form>
  )
}

