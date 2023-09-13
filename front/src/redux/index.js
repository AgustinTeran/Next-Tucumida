import { combineReducers } from "redux";

import productsReducers from "./products/reducers"
import usersReducers from "./users/reducers"
import authReducers from "./auth/reducers"
import categoriesReducers from "./categories/reducers"
import appConfigReducers from "./appConfig/reducers"
import restaurantReducers from "./restaurants/reducers"



export default combineReducers({
    products: productsReducers,
    users: usersReducers,
    auth: authReducers,
    categories: categoriesReducers,
    appConfig: appConfigReducers,
    restaurants: restaurantReducers,
})