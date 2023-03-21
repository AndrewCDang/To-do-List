import { configureStore } from "@reduxjs/toolkit";
import toDoList from "./toDoList";

// set configure store function, storing reducer(s)
export default configureStore({
    reducer: {
        toDo : toDoList,
    },
})