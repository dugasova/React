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

// <div className='container'>
// <Header />
// <div className='players'>
//   {!state.isBattle ? (
//     <PlayersContext.Provider value={{ state, dispatch }}>
//       <PlayerForm numberOfPlayer={1} />
//       <PlayerForm numberOfPlayer={2} />
//       {state.player1Success && state.player2Success && (
//         <Button className='players-btn' title="Battle!" handleClick={handleBattleClick} />
//       )}
//     </PlayersContext.Provider>
//   ) : (
//     <Battle
//       player1Data={state.player1Data}
//       player2Data={state.player2Data}
//       handleReset={handleReset}
//     />
//   )}
//   </div>
// </div>
// );