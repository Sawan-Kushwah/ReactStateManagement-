import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [{}],
    addTodo: (todo) => { },
    deleteTodo: (id) => { },
    updateTodo: (id, todo) => { },
    isComplete: (id) => { },
})

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}