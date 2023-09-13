import {combineReducers} from "redux"
import types from "./types"


export default function current(state={
  user: null,
  loading: false,
  error: null
},action){
  switch (action.type) {
    case types.CLEAR_CURRENT:
      return {
        ...state,
        user: null
      }
    case types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.POST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.POST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.POST_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}