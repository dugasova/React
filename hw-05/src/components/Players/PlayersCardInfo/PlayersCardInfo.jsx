import { useContext } from 'react'
import Button from '../../Button/Button'
import PlayersContext from '../../../contexts/PlayersContext'
import PlayerStatistics from '../../PlayerStatistics/PlayerStatistics';

export default function PlayersCardInfo({ item, index }) {
  const { resetPlayer, statePlayers } = useContext(PlayersContext);

  return (
    <div className='players-card-container'>
      {statePlayers.isBattleStarted &&
        (statePlayers.winnerId == item.id ?
          (<div className='player-status winner'>🏆 Winner!</div>) :
          (<div className='player-status loser'>😢 Loser</div>))}

      <div className={`player__info`}>
        <img src={item.data.avatar_url} alt={`${item.username}'s avatar`} className='player__avatar' />
        <p className='player__username'>@{item.data.login}</p>
        {!statePlayers.isBattleStarted && (
          <Button title="Reset" className='player__info-reset' handleClick={() => resetPlayer(item.id)} />
        )}

        {statePlayers.isBattleStarted && (
          <PlayerStatistics item={item} />
        )}
      </div>
    </div>
  );
}
