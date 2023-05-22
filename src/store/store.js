/* Importing necessary functions from the Redux Toolkit */
import { configureStore } from "@reduxjs/toolkit";
// import the todoReducer function
import todoReducer from './todo'

// configure the redux store with the todoReducer as the only reducer
export default configureStore({
    // register the todo reducer with the "todo" key
    reducer: {
        todo: todoReducer,
    }
})