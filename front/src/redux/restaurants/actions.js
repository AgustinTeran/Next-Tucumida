import axios from "axios"
import { back } from "../../config"
import backRoutes from "../../config/backRoutes";
import types from "./types"
import Cookies from "js-cookie";


function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function get(id){
  return function(dispatch){
    dispatch({type: types.GET_REQUEST})

    back.get(`${backRoutes.RESTAURANTES}/${id}`)
    .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}

function getAll(query){
  return function(dispatch){
    dispatch({type: types.GETALL_REQUEST})

    let cancel;
    back.get(`${backRoutes.RESTAURANTES}`,{params: query,cancelToken: new axios.CancelToken(c => cancel = c)})
    .then(res => {if(query.search) dispatch({type: types.CLEAR_ALL});dispatch({type: types.GETALL_SUCCESS, payload: res.data})})
    .catch(err => {
      if(axios.isCancel(err)){
        console.log("Se cancelo");
      }else{
        console.log(err);
        dispatch({type: types.GETALL_FAILURE, error: err.response.data})
      }
      })
      return {cancel};
  }
}

function getMisRestaurantes(){
  return function(dispatch){
    dispatch({type: types.GET_MY_RESTAURANTS_REQUEST})
    back.get(`${backRoutes.RESTAURANTES}/misRestaurantes`,{headers: {token: Cookies.get("token")}})
    .then(res => dispatch({type: types.GET_MY_RESTAURANTS_SUCCES,payload: res.data}))
    .catch(err => dispatch({type: types.GET_MY_RESTAURANTS_FAILURE,error: err.response.data}))
  }
}

function postOrPut(restaurante){
  return function(dispatch){
    dispatch({type: types.POST_REQUEST})

    if(restaurante.id){
      back.put(`${backRoutes.RESTAURANTES}/${restaurante.id}`,{...restaurante},{headers: {token: Cookies.get("token")}})
      .then(() => dispatch(getMisRestaurantes()))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }else{
      back.post(`${backRoutes.RESTAURANTES}`,{...restaurante},{headers: {token: Cookies.get("token")}})
      .then(() => dispatch(getMisRestaurantes()))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }
  }
}

function del(id){
  return function(dispatch){
    dispatch({type: types.DELETE_REQUEST,id})

    back.delete(`${backRoutes.RESTAURANTES}/${id}`,{headers: {token: Cookies.get("token")}})
    // .then(() => dispatch(getAll()))
    .catch(err => dispatch({type: types.DELETE_FAILURE, error: err.response.data}))
  }
}


export default {
  clearCurrent,
  get,
  getAll,
  postOrPut,
  del,
  getMisRestaurantes
}