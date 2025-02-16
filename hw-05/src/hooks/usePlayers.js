import { useEffect, useReducer } from 'react';
import { reducer, INITIAL_STATE } from "../store/player/reducer";
import {
  PLAYERS_COUNT_SUBMIT,
  SET_ERROR_MESSAGE,
  SET_PLAYER_INFO,
  SET_PLAYERS_SELECTED,
  SET_PLAYER_NAME,
  SET_RESET_PLAYER,
  SET_WINNER_INFO,
  RESET_BATTLE
} from "./../store/player/actions";
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
          service.getUserRepos(player.data.login)
        )
      );

      const additionalData = responses.map((response, index) => {
        const reposStars = response.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const followers = statePlayers.players[index].data.followers;
        const totalScore = followers + reposStars;
        return {
          followers: followers,
          reposStars: reposStars,
          totalScore: totalScore,
          id: statePlayers.players[index].id
        };
      });

      dispatch(actionCreator(SET_PLAYER_INFO, additionalData));
      const sortedPlayers = additionalData.sort((a, b) => b.totalScore - a.totalScore);
      const winner = sortedPlayers[0].id;
      dispatch(actionCreator(SET_WINNER_INFO, winner))
    } catch (err) {
      console.log(err);
    }
  };

  const restartBattle = () => {
    dispatch(actionCreator(RESET_BATTLE));
  }

  return {
    statePlayers,
    playersAmountSubmit,
    setPlayerName,
    resetPlayer,
    startBattle,
    restartBattle
  }
}

