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

    back.get(`${backRoutes.PRODUCTS}/${id}`)
    .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}

function getAll(query){
  return function(dispatch){
    dispatch({type: types.GETALL_REQUEST})

    let cancel;
    back.get(`${backRoutes.PRODUCTS}`,{params: query,cancelToken: new axios.CancelToken(c => cancel = c)})
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

function postOrPut(product){
  return function(dispatch){
    dispatch({type: types.POST_REQUEST})

    if(product.id){
      back.put(`${backRoutes.PRODUCTS}/${product.id}`,{...product},{headers: {token: localStorage.getItem("token")}})
      .then(res => {dispatch({type: types.POST_SUCCESS}); return res})
      .then(res => {dispatch({type: types.CLEAR_ALL}); return res})
      .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
      .then(() => dispatch(getAll()))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }else{
      back.post(`${backRoutes.PRODUCTS}`,{...product},{headers: {token: localStorage.getItem("token")}})
      .then(() => dispatch({type: types.POST_SUCCESS}))
      .then(res => {dispatch({type: types.CLEAR_ALL}); return res})
      .then(() => dispatch(getAll()))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }
  }
}

function del(id){
  return function(dispatch){
    dispatch({type: types.DELETE_REQUEST,id})

    back.delete(`${backRoutes.PRODUCTS}/${id}`,{headers: {token: localStorage.getItem("token")}})
    // .then(() => dispatch(getAll()))
    .catch(err => dispatch({type: types.DELETE_FAILURE, error: err.response.data}))
  }
}


export default {
  clearCurrent,
  get,
  getAll,
  postOrPut,
  del
}