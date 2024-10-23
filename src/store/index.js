import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
const store=configureStore({
    reducer:{
        auth:authReducer,
    }, //to state iinitial and final state of user
});

export default store;