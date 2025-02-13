import { useEffect, useReducer } from 'react';
import { reducer, INITIAL_STATE } from "../store/player/reducer";
import { PLAYERS_COUNT_SUBMIT, SET_ERROR_MESSAGE, SET_PLAYER_INFO, SET_PLAYERS_SELECTED, SET_PLAYER_NAME, SET_RESET_PLAYER, SET_WINNER_INFO, RESET_BATTLE } from "./../store/player/actions";
import { actionCreator } from "../store/store";
import service from '../sevices/players';

export default function usePlayers() {
  const [statePlayers, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    let playersSelected = statePlayers.players.every((player) => player.data)

    statePlayers.players.length && dispatch(actionCreator(SET_PLAYERS_SELECTED, playersSelected));
  }, [statePlayers.players]);

  const playersAmountSubmit = (payload) => {
    dispatch(actionCreator(PLAYERS_COUNT_SUBMIT, payload))
  }

  const setPlayerName = async ({ id, username }) => {
    try {
      const playerData = await service.getUser(username);
      if (!playerData) {
        throw new Error("User does not exist");
      }
      dispatch({ type: SET_PLAYER_NAME, payload: { id, username, data: playerData } });
    } catch (error) {
      const errorMessage = error.response && error.response.status === 404
        ? "User does not exist"
        : error.message;
      dispatch({ type: SET_ERROR_MESSAGE, payload: { id, message: errorMessage } });
    }
  };

  const resetPlayer = (id) => {
    dispatch({ type: SET_RESET_PLAYER, payload: id })
  }

  const startBattle = async () => {
    try {
      const responses = await Promise.all(
        statePlayers.players.map((player) =>
          service.getUserRepos(player.username)
        )
      );

      const additionalData = responses.map((response, index) => {
        const reposStars = response.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const followers = statePlayers.players[index].data.followers;
        const totalScore = followers + reposStars;
        return {
          repos: response.length,
          followers: followers,
          reposStars: reposStars,
          totalScore: totalScore
        };
      });
      dispatch(actionCreator(SET_PLAYER_INFO, additionalData));

      const { winner, loser } = calculateBattleResults(statePlayers.players);
      console.log("winner, loser", winner, loser)
      dispatch(actionCreator(SET_WINNER_INFO, { winner, loser }))
    } catch (err) {
      console.log(err);
    }
  };

  const calculateBattleResults = (players) => {
    console.log("Players:", players)
    const sortedPlayers = players.sort((a, b) => b.additionalData.totalScore - a.additionalData.totalScore);
    console.log("Winners:", sortedPlayers)
    const winner = sortedPlayers[0];
    const loser = sortedPlayers[sortedPlayers.length - 1];
    console.log("winner", winner)
    return { winner, loser }

  }

  const restartBattle = () => {
    dispatch(actionCreator(RESET_BATTLE));
  }

  useEffect(() => {
    if (statePlayers.playersAmountSubmit) {
      getPlayers()
    }
  }, [statePlayers.playersAmountSubmit])

  return {
    statePlayers,

    playersAmountSubmit,
    setPlayerName,
    resetPlayer,
    startBattle,
    calculateBattleResults,
    restartBattle
  }
}

