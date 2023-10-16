import { useEffect, useState } from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search  from './components/TodoSearch'
import Filter  from './components/TodoFilter'
import TodoList from './components/TodoList'
import axios from 'axios'



function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");

  // const [todos, setTodos] = useState(
  //   [
  //   { id: 0, task: "Learn JavaScript", status: "Active" },
  //   { id: 1, task: "Read a self-help book", status: "Active" },
  //   { id: 2, task: "Play PS5", status: "Active" },
  //   { id: 3, task: "Watch YouTube videos", status: "Active" },
  //   // { id: 5, task: "Pray to God", status: "Active" },
  // ]
  // );

  useEffect(()=> {
    axios.get("http://127.0.0.1:8000/todo")
    .then(res => setTodos(res.data))
    .catch(err=>setErrors(err.message))
  
  
  }, [])


// add todo function
  const addTodo = (data) => {
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, status:"Active"}] )
    const originalTodos = [...todos]
    axios.post("http://127.0.0.1:8000/todo", data)
    .then(res => setTodos([...todos, res.data]))
    .catch(err => { setErrors(err.message)
    setTodos(originalTodos) }
    );
  }

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    const originalTodos = [...todos]
    axios.delete(`http://127.0.0.1:8000/todo/${id}`)
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    });
  }


  // update function
  const updateTodo = (e, id, text, todo) => {
    e.preventDefault();
  // const todo = todos.find(todo => todo.id === id);
  
  
  const updatedUser = { ...todo, task: text, status: "Active" };
  setTodos(todos.map(t=>t.id == id ? updatedUser: t))
  const updatedTodo = {...todo, task:text}
  
  const originalTodos = [...todos]

  axios.patch(`http://127.0.0.1:8000/todo/${id}`, updatedTodo)
    .then(() => setTodos(todos.map(t => (t.id === id ? updatedTodo : t))))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    });

  }

  const completeTodo = (e, id) => {

    const status = e.target.checked ? "Completed" : "Active";
  const todo = todos.find(todo => todo.id === id);
  const updatedTodo = { ...todo, status };
  const originalTodos = [...todos]

  axios.patch(`http://127.0.0.1:8000/todo/${id}`, updatedTodo)
    .then(() => setTodos(todos.map(t => t.id === id ? updatedTodo : t)))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    });

   
  }

  return (
    <div className="todo-container">
      { errors && <p>{ errors }</p> }
      <Search addTodo = { addTodo } />
      <Filter filter_todo = { filterTodo }/>
      <TodoList todos = { todos } delTodo = { delTodo } update_todo = { updateTodo } complete_todo = { completeTodo } filter_todo = { filterTodo } />
    </div>
  );
}



export default App;