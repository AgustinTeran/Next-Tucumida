import {combineReducers} from "redux"
import types from "./types"



export default function current(state={
  theme: "mytheme",
},action){
  switch (action.type) {
    case types.UPDATE_THEME:
      return {
        ...state,
        theme: action.payload
      }
    default:
      return state
  }
}