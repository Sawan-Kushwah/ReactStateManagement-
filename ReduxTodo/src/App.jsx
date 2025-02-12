import './App.css'
// react redux bridge h react-redux-toolkit and react , 
// With dispatch we can send the data , and receive as action.payload
// With useSelector we can get the current state data
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo } from './Feature/Todo/TodoSlice';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const [isUpdating, setisUpdating] = useState(false)

  const add = () => {
    dispatch(addTodo(input))
    setInput('')
    setisUpdating(false)
  }

  const todos = useSelector(state => state.todos);

  const updateTodo = (id) => {
    setisUpdating(true)
    let todo = todos.filter((item) => item.id === id)
    setInput(todo[0].text);
    dispatch(removeTodo(id))
  }

  return (
    <>

      <div className="bg-[#172842] min-h-screen py-8">
        <h1 className="text-3xl font-bold underline mb-8 text-white text-center">   TODO APP  </h1>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="mb-4">
            <input type="text" className="w-full p-2 text-lg text-gray-700
            placeholder:text-gray-400 placeholder:text-lg placeholder:italic
            focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Enter your task" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={add} className='bg-green-700 cursor-pointer'> {isUpdating ? 'UpdateTodo' : "Add Todo"}</button>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => {
              return (
                <div key={todo.id} className="bg-gray-800 rounded-lg p-4 text
                  text-white mb-4">
                  <h2 className="text-lg font-bold">{todo.text}</h2>
                  <button className='bg-red-500 cursor-pointer' onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
                  <button className='bg-blue-500 cursor-pointer' onClick={() => updateTodo(todo.id)}>Update</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
