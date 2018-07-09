import axios from 'axios';
import { setHeaders } from '../reducers/headers';
const COINS = 'COINS';
const ADD_COIN = 'ADD_COIN';
const REMOVE_COIN = 'REMOVE_COIN';

export const addCoin = (coin) => {
  return (dispatch) => {
    axios.post('/api/coins', { coin })
      .then( ({ data, headers }) => {
        dispatch({ type: ADD_COIN, coin: data, headers }) )
        dispatch(setHeaders(headers));
    }
  }
}

export const getCoins = () => {
  return (dispatch) => {
    axios.get('/api/coins')
      .then( ({ data, headers }) => {
        dispatch({ type: COINS, coins: data, headers }) )
        dispatch(setHeaders(headers));
    }
  }
}

export const removeCoin = (id) => {
  return (dispatch) => {
    axios.put(`/api/coins/${id}`)
      .then( ({ headers }) => {
        dispatch({ type: REMOVE_COIN, id, headers }) )
        dispatch(setHeaders(headers));
    }
  }
}

const coins = (state = [], action) => {
  switch (action.type) {
    case COINS:
      return action.coins;
    case ADD_COIN:
      return [...state, action.coin]
    case REMOVE_COIN:
      return state.filter( c => c.id !== action.id )
    default:
      return state
  }
}

export default coins;

