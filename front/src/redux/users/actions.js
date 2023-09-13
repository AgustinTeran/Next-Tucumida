import axios from "axios"
import { back } from "../../config"
import backRoutes from "../../config/backRoutes";
import types from "./types"


function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function get(id){
  return function(dispatch){
    dispatch({type: types.GET_REQUEST})

    back.get(`${backRoutes.USERS}/${id}`)
    .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}

function getAll(query){
  return function(dispatch){
    dispatch({type: types.GETALL_REQUEST})

    let cancel;
    back.get(`${backRoutes.USERS}`,{params: query,cancelToken: new axios.CancelToken(c => cancel = c)})
    .then(res => {if(query.search) dispatch({type: types.CLEAR_ALL});dispatch({type: types.GETALL_SUCCESS, payload: res.data})})
    .catch(err => {
      if(axios.isCancel(err)){
        console.log("Se cancelo");
      }else{
        dispatch({type: types.GETALL_FAILURE, error: err.response.data})
      }
      })
      return {cancel};
  }
}

function Put(id,user){
  return function(dispatch,state){
    dispatch({type: types.POST_REQUEST})

    back.put(`${backRoutes.USERS}/${id}`,{...user},{headers: {token: localStorage.getItem("token")}})
    .then(res => {dispatch({type: types.POST_SUCCESS});return res})
    .then(res => {dispatch({type: types.CLEAR_ALL}); return res})
    .then(res => {if(state().auth.user.id == id){(user.role !== "admin" && state().auth.user.role === "admin")? window.location.replace("/") : dispatch({type: "AUTH_GET_SUCCESS",payload:res.data})}; dispatch({type: types.GET_SUCCESS, payload: res.data})})
    .then(() => {if(state().auth.user.id !== id) dispatch(getAll())})
    .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))  
  }
}

function del(id){
  return function(dispatch){
    dispatch({type: types.DELETE_REQUEST,id})

    back.delete(`${backRoutes.USERS}/${id}`,{headers: {token: localStorage.getItem("token")}})
    // .then(res => dispatch(getAll()))
    .catch(err => dispatch({type: types.DELETE_FAILURE, error: err.response.data}))
  }
}


export default {
  clearCurrent,
  get,
  getAll,
  Put,
  del
}