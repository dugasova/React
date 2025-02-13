import {
  PLAYERS_COUNT_SUBMIT,
  SET_PLAYER_NAME,
  SET_ERROR_MESSAGE,
  SET_RESET_PLAYER,
  SET_PLAYERS_SELECTED,
  SET_PLAYER_INFO,
  SET_WINNER_INFO,
  RESET_BATTLE
} from "./actions"

const INITIAL_STATE = {
  players: [],
  playersCount: 2,
  isPlayerCountSubmited: false,
  playersSelected: false,
  errorMessage: '',
  battlePlayers: [],
  isBattleStarted: false,
  resetBattle: false,
}

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PLAYERS_COUNT_SUBMIT:
      return {
        ...state,
        isPlayerCountSubmited: true,
        players: new Array(payload.playersCount).fill(0).map((item, index) => ({ id: ++index, data: null, username: null, errorMessage: null })),
        ...payload
      }
    case SET_PLAYER_NAME:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === payload.id
            ? { ...player, data: payload.data, username: payload.username, errorMessage: null }
            : player
        )
      }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        players: state.players.map(player =>
          player.id === payload.id ? { ...player, errorMessage: payload.message } : player
        )
      }
    case SET_RESET_PLAYER:
      return {
        ...state,
        players: state.players.map(player =>
          player.id === payload
            ? { ...player, data: null, username: null, errorMessage: null }
            : player
        ),
      }

    case SET_PLAYERS_SELECTED:
      return { ...state, playersSelected: payload }

    case SET_PLAYER_INFO:
      return {
        ...state,
        isBattleStarted: true,
        players: state.players.map((item, index) => ({
          ...item,
          additionalData: payload[index],
        }))
      }

    case SET_WINNER_INFO:
      return {...state, battlePlayers: payload}

    case RESET_BATTLE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export { reducer, INITIAL_STATE }
