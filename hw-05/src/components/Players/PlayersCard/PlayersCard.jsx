import React from 'react';
import "./style.scss";
import PlayersCardForm from '../PlayersCardForm/PlayersCardForm';
import PlayersCardInfo from '../PlayersCardInfo/PlayersCardInfo';

export default function PlayersCard({ item, index }) {
  return (
    <div className='player__card'>
      {item.data ? (
        <PlayersCardInfo item={item} index={index} />
      ) : (
        <PlayersCardForm item={item} index={index} />
      )}
    </div>
  )
}
