import React, { useContext, useRef } from 'react';
import "./style.scss";
import Button from '../../Button/Button';
import PlayersContext from '../../../contexts/PlayersContext';

export default function PlayersCardForm({ item, index }) {
  const { setPlayerName } = useContext(PlayersContext);

  const usernameInput = useRef();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    await setPlayerName({
      id: item.id,
      username: usernameInput.current.value
    });
  };

  return (
    <form className="player__card-form" onSubmit={handleSubmit}>
      <label>Choose Player {index + 1} username
        <input type="text" placeholder={`Player ${index + 1}`} ref={usernameInput} required/>
        {item.errorMessage && (
          <h2 className='error-message'>{item.errorMessage}</h2>
        )}
      </label>
      <Button title="Submit" className='player__card-submit' />
    </form>
  )
}
