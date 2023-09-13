import {combineReducers} from "redux"
import types from "./types"


export function current(state={
  item: null,
  loading: false,
  error: null
},action){
  switch (action.type) {
    case types.CLEAR_CURRENT:
      return {
        ...state,
        item: null
      }
    case types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        item: action.payload,
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

export function list(state = {
  items: null,
  loading: false,
  error: null,
}, action){
  switch (action.type) {
    case types.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CLEAR_ALL:
      return {
        ...state,
        items: null
      }
    case types.GETALL_SUCCESS:
      return {
        ...state,
        total: action.payload.count,
        items: state.items? [...state.items,...action.payload.rows] : action.payload.rows,
        loading: false,
      };
    case types.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case types.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.filter(e => e.id !== action.id),
        total: state.total - 1
      };
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
  current,
  list
})