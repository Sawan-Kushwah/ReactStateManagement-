Redux toolkit and react-redux both are different 
redux toolkit is the main redux library which is used by many other framework or library eg react , vue , etc

react-redux help us to create a bridge between the react and redux 
``` javascript
// useSelector  (this is used to see the current state ) as
const todo = useSelector(state => state.todos) ,
_______________

// useDispatch this help us to send the data to the redux state as
const dispatch = useDispatch()
dispatch(addTodo("redux ho gaya"))
```

Steps to set up redux 

``` javascript
// Step 1 : Create a store
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../Feature/Todo/TodoSlice";

export const Store = configureStore({
    reducer: reducers,
})
 _________________________________

// Step 2 : Create a slice with reducer ( they are the funtion )
    // we can add many more state in this state this is a single source or truth 
    // all the state is updated by using the reducer , we can create different slice for different state
    // same work can web done in react use context but there is a catch we don't able to add the funtion defination (eg addTodo = () =>{}) 
    // the defination has been written on the app.jsx , where we write provider value = {addTodo , , ,} and we write the defination for it this may change the state many times
    // we have to create the different context for different state

import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
    todos: [{ id: 1, text: "hello sawan" }],
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

// Here we can create more slices as per requirement and export everything to store 

export const { addTodo, removeTodo } = TodoSlice.actions;

export const reducers = TodoSlice.reducer;

__________________________________________

// Step 3 : Wrap everything in Provider from react-redux

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>,
)
```




____________________________________
____________________________________





Lazy load : we do lazy load to load the page when user intract with that page before that we don't load that , this is done because if we have a large website user may or may not reach to every page of the website so instead of loading everything load the page where user go else don't load it this is enhance our performance 
it basically split the code and render when the user intract with it 
``` Javascript

const About = lazy(() => import('./component/About'))

<Suspence fallback={<h1> loading... </h1>}
  <Outlet/>
</Suspence>

```
This import statement will return a promise so we it return the ``` {default : About} ``` so if you dont do ``` export default About```
you can explicitly say like this ```const About = lazy(() => import(./component/About).then(module) => ({default : module.About})) ```

-------------------
Now let say we have to lazy load some data or function how we will do ?

``` Javascript
<Button onClick = {() => import('./data').then((module) => setTodos(module.todos))}> click </button>
```
Here the data will be load when user click on this button 
``` module.todos ``` where todos is the key in the data this is done in order to optimize and seperate the data from the | main thread | to background thread 

