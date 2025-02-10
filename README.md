Babel is used to transpiler the modern javascript to old browser javascript which can be understood by every browser so that developer can use the modern day javascript efficiently 
Babel take the script file to map source and then convert the jsx to , React.createElement() this convert this to Tree like structure then this structure has been taken by , 
React.render method (createElement , root) then it inject that js to docs by doing document.createElement('h1')

``` javascript 
React jsx -> Map source (map the jsx to converted script) -> Script (this browser will understand)
-> This script get inject to Document using React.render(react.createElement , root)
```


Redux toolkit and react-redux both are different 
redux toolkit is the main redux library which is used by many other framework or library eg react , vue , etc
we can add many more state in this state this is a single source or truth 
all the state is updated by using the reducer , we can create different slice for different state
same work can web done in react use context but there is a catch we don't able to add the funtion defination (eg addTodo = () =>{}) 
the defination has been written on the app.jsx , where we write provider value = {addTodo , , ,} and we write the defination for it this may change the state many times
we have to create the different context for different state

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
// Step 1 : Create a store in app or store or redux folder as store.js
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../Feature/Todo/TodoSlice";

export const Store = configureStore({
    reducer: reducers,
})
 _________________________________

// Step 2 : Create a slice with reducer ( they are the funtion )
// Here we can create more slices as per requirement and export everything to store 

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

const About = lazy(() => import('./component/About')) // Where browser router is there main.js

// aap.jsx or layout.jsx
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

___________________________
Debouncing is a concept of calling the api after some delay , use case -> when is type something calling api for every change in input field may lead us to reach the api limit 
this should not be there !! , we have to call the api when user stop for sometime 

``` javascript

async function fetchData(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

function debouncing(func, delay) {
    let time;
    return function (...args) {
        clearTimeout(time);
        time = setTimeout(() => func(...args), delay);  
    };
}

const inputField = document.getElementById('inputField');  
const url = "https://api.example.com/data"; // Replace with the actual API URL

inputField.addEventListener('input', debouncing(() => fetchData(url), 1000)); // ✅ 
inputField.addEventListenor('input' , () => fetchData(url)) // ❌

```
React life cycle of class component 
![image](https://github.com/user-attachments/assets/19a8e315-545e-4d97-ab0c-a1fd01c35977)




