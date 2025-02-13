import { useContext } from 'react'
import Button from '../../Button/Button'
import PlayersContext from '../../../contexts/PlayersContext'
import BattleStatus from '../../BattleStatus/BattleStatus';

export default function PlayersCardInfo({ item, index }) {
  const { resetPlayer, statePlayers } = useContext(PlayersContext);

  const isWinner = statePlayers.battlePlayers.winner && statePlayers.battlePlayers.winner.id === item.id;
  const isLoser = statePlayers.battlePlayers.loser && statePlayers.battlePlayers.loser.id === item.id;

  return (
    <div className='players-card-container'>
      {isWinner && <div className='player-status winner'>🏆 Winner!</div>}
      {isLoser && <div className='player-status loser'>😢 Loser</div>}

      <div className={`player__info`}>
        <img src={item.data.avatar_url} alt={`${item.username}'s avatar`} className='player__avatar' />
        <p className='player__username'>@{item.data.login}</p>
        {!statePlayers.isBattleStarted && (
          <Button title="Reset" className='player__info-reset' handleClick={() => resetPlayer(item.id)} />
        )}
        {statePlayers.battlePlayers.length ? (<BattleStatus item={item} />) : null}

        {statePlayers.isBattleStarted && (
          <>
            <h3>👥Followers: {item.data.followers}</h3>
            <h3>Repos: {item.additionalData.repos}</h3>
            <h3>🌟Repo Stars: {item.additionalData.reposStars}</h3>
            <h3>🏁Total Score: {item.additionalData.totalScore}</h3>
          </>
        )}
      </div>
    </div>
  );
}
