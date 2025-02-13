import React, { useContext } from 'react';
import PlayersContext from '../../contexts/PlayersContext';
import PlayersAmount from '../PlayersAmount/PlayersAmount'
import PlayersCards from '../Players/PlayersCards/PlayersCards';

export default function PlayersWrapper() {
  const { statePlayers } = useContext(PlayersContext)
  return (
    <>
      {statePlayers.isPlayerCountSubmited ? (
        <PlayersCards />
      ) : (
        <PlayersAmount />

      )
      }
    </>
  )
}

