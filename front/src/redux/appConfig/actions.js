import types from "./types"


function updateTheme(theme){
  return {
    type: types.UPDATE_THEME, payload: theme
  }
}

export default {
  updateTheme
}