import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts'
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const isComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo))
  }

  useEffect(() => {
    let todo = JSON.parse(localStorage.getItem("todos"));
    if (todo && todo.length > 0) {
      setTodos(todo)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, isComplete }}>
      <h1 className="text-3xl font-bold underline mb-8">   TODO APP  </h1>

      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-gray-800 rounded-lg p-4 mb-4">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </TodoProvider>
  )
}

export default App
