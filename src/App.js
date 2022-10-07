import { useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todos, setTodos] =  useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todoAppData'));
    console.log(storedTodos);

    if (storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => {
    if(todos.length>0){
      localStorage.setItem('todoAppData', JSON.stringify(todos))
    }
  }, [todos])

  function toggleToDo(id){
    const newTodos = [...todos] 
    const todo = newTodos.find( todo=> todo.id === id )
    todo.complete =!todo.complete
    setTodos(newTodos)
  }

  function handleAddToDo(event){
    const name = todoNameRef.current.value;
      
    if(name === '') return;
  
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name:name, complete:false}];
    })

    todoNameRef.current.value = "";
  }

  function handleClearToDo(){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos);

    if(todos.length == 0){
      setTodos([]);
      localStorage.setItem('todoAppData', JSON.stringify(todos))
    }
  }

  // <> blank html element is called fragment.

  return (
    <> 
        <TodoList todos ={todos} toggleToDo={toggleToDo}/>
        <input ref={todoNameRef}    type="text"/>
        <button onClick={handleAddToDo}>Add Todo</button>
        <button onClick={handleClearToDo}>Clear completed Todos</button>
        <div>{todos.filter(todo=> !todo.complete).length}</div>
    </>
  );
}

export default App;
