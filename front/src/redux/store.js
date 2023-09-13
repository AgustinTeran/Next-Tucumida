"use client"
import {createStore, compose, applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"
import Reducers from "../redux/index"

var composeEnhancer;
// if(process.env.NODE_ENV !== "production"){
    // composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// }else{
    composeEnhancer = compose
// }

var store = createStore(Reducers,composeEnhancer(applyMiddleware(thunkMiddleware)))

export default store