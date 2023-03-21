import { createSlice } from "@reduxjs/toolkit";

// Initialised createslice function to set initial state and reducers.
export const toDoSlice = createSlice({
    name: "toDo",

    initialState: {
        nextId: 5,
        data:
        {
            1: {
                content: 'Content',
                completed: 'false'
            },
            2: {
                content: 'Walk the dog',
                completed: 'true'
            },
            3: {
                content: 'Make lasagna',
                completed: 'false'
            },
            4: {
                content: 'Go to gym',
                completed: 'false'
            },
        }
    },
    reducers:{

        // reducers with action argument passing through unique object id number/content
        editContent: (state, action) =>{
            state.data[action.payload.id].content = action.payload.content;
        },
        editCompleted: (state, action) =>{
            state.data[action.payload.id].completed = action.payload.complete;
        },
        addItem: (state) =>{
            state.data[state.nextId] = {
                content: '',
                completed: 'false'
            }
            state.nextId += 1;  
        },

        delItem: (state, action) =>{
            // Deleting key object from data state
            const itemId = action.payload;
            delete state.data[itemId];
        }
}});
// CreatSlice generating actions and reducer objects which I destructure. 
export const { edit, editCompleted, addItem, delItem } = toDoSlice.actions;
export default toDoSlice.reducer;