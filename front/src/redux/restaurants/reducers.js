import {combineReducers} from "redux"
import types from "./types"


export function myRestaurants(state = {
  items: null,
  total: null,
  loading: false,
  error: null,
}, action){
  switch (action.type) {
    case types.GET_MY_RESTAURANTS_SUCCES:
      return {
        ...state,
        total: action.payload.count,
        items: action.payload.rows,
        loading: false,
      };
    case types.GET_MY_RESTAURANTS_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case types.GET_MY_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.POST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case types.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.filter(e => e.id !== action.id)
      }
    case types.DELETE_FAILURE:
      return {
        ...state,
        error: action.error
      } 
    default:
      return state
  }
}


export default combineReducers({
  myRestaurants
})