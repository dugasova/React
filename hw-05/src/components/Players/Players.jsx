import Header from '../Header/Header';
import "./style.scss";
import PlayersContext from '../../contexts/PlayersContext';
import usePlayers from "../../hooks/usePlayers"
import PlayersWrapper from '../PlayersWrapper/PlayersWrapper';

export default function Players() {

  const statePlayers = usePlayers()

  return (
    <div className='container'>
      <Header />
      <PlayersContext.Provider value={{ ...statePlayers }}>
        <PlayersWrapper />
      </PlayersContext.Provider>
    </div>
  )
}