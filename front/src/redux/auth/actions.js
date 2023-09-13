import { back } from "@/config"
import backRoutes from "@/config/backRoutes";
import types from "./types"
import Cookies from "js-cookie";


function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function get(){
  return function(dispatch){
    dispatch({type: types.GET_REQUEST})

    back.get(`${backRoutes.USUARIOS}/profile`,{withCredentials: true})
    .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}


function post(user){
  return function(dispatch){
    dispatch({type: types.POST_REQUEST})


    if(user.nombre){
      back.post(`${backRoutes.USUARIOS}/`,{...user})
      .then(res => {Cookies.set("token",res.data); dispatch({type: types.POST_SUCCESS})})
      .then(() => window.location.replace("/"))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }else{
      back.post(`${backRoutes.USUARIOS}/auth`,{...user})
      .then(res => {Cookies.set("token",res.data); dispatch({type: types.POST_SUCCESS})})
      .then(() => window.location.replace("/"))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }
  }
}



export default {
  clearCurrent,
  get,
  post,
}