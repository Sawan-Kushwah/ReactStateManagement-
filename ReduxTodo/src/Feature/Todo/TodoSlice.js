import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "hello sawan" }],
    // we can add many more state in this state this is a single source or truth 
// all the state is updated by using the reducer , we can create different slice for different state
    // same work can web done in react use context but there is a catch we don't able to add the funtion defination (eg addTodo = () =>{}) 
    // the defination has been written on the app.jsx , where we write provider value = {addTodo , , ,} and we write the defination for it this may change the state many times
    // we have to create the different context for different state 
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload, //it is an object so we can access multiple value as (action.payload.text ,)
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
    }
})

export const { addTodo, removeTodo } = TodoSlice.actions;

export const reducers = TodoSlice.reducer;
