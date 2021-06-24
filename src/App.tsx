import React, { useState }  from 'react';
import { Item } from './components/Item';
import { AddTodoForm } from './components/AddTodoForm';
import './App.css';

const initialTodos: Todo[] = [
  {
    text: 'TypeScript',
    complete: false,
  },
  {
    text: 'JavaScript',
    complete: false,
  },
  {
    text: 'NodeJS',
    complete: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  };
  const removeTodo: RemoveTodo = (idx: number) => {
    const filtered = todos.filter((v, i) => idx !== i);
    setTodos(filtered);
  }

  return (
    <div className="App">
      <h1>투두리스트 .</h1>
      <ul>
        {todos.map((todo, idx) => (
          <Item key={todo.text} todo={todo} toggleTodo={toggleTodo} idx={idx} removeTodo={removeTodo} />
        ))}
      </ul>
       <AddTodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
