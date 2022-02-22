import { useState, useEffect } from 'react'
import TodoInput from './TodoInput/TodoInput'
import TodosList from './TodosList/TodosList'
import './App.css'

export type TodoItemType = {
  text: string,
  done: boolean,
  id: number
}

function App() {

  const [todos, setTodos ] = useState([] as TodoItemType[])

  const fetchData = () => {
    fetch('http://localhost:8000/todos')
     .then(response => response.json())
     .then(json => setTodos(json))
  }

  const addNewTodo = (text: string) => {
    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'text': text,
        'done': false
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      fetchData()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  const editTodo = (item: TodoItemType) => {
    fetch(`http://localhost:8000/todos/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'text': item.text,
        'done': item.done
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      fetchData()
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }
  const deleteTodo = (id: number) => {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      fetchData()
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='App'>
      <h1 className='header'>remember</h1>
      <div className='interface-main'>
        <TodoInput addNewTodo={addNewTodo} />
        <TodosList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      </div>
    </div>
  );
}

export default App;
