import React, { useState }  from 'react';
import { Item } from './components/Item';
import { AddTodoForm } from './components/AddTodoForm';
import { HistoryList} from './components/historyList'
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
  const init:any = localStorage.getItem('todos') || '[]';
  const localHistory:any = localStorage.getItem('history') || '[]';
  const [todos, setTodos] = useState(JSON.parse(init));
  const [history, setHistory] = useState(JSON.parse(localHistory));
  const id = 'braveosk';

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    console.log(selectedTodo);
    if (selectedTodo.complete) {
      addHistory({  type: 'checkOut', text: selectedTodo.text });
    } else {
      addHistory({  type: 'checkIn', text: selectedTodo.text });
    }
    const newTodos = todos.map((todo: { complete: any; text?: string; }) => {
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

  const addTodoHandler:AddHandler = (text: string) => {
    const newTodo = { text, complete: false };
    addTodo(newTodo);
    addHistory({ text, type: 'add' });
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  }

  const addTodo: AddTodo = (todoObj: object) => {
    setTodos([...todos, todoObj]);
  };
  const addHistory: AddHistory = (obj: { type: string, text: string }) => {
    let msg =''
    if (obj.type === 'add')  {
      msg = `할 일 ${obj.text}를 추가했습니다.`;
    } else if (obj.type === 'checkIn') {
      msg  = `할 일 ${obj.text}를 완료했습니다.`;
    } else if (obj.type ===  'remove') {
      msg = `할 일 ${obj.text}를 삭제했습니다.`;
    } else if (obj.type ===  'checkOut') {
      msg  = `할 일 ${obj.text} 체크를 해제했습니다.`;
    }
    setHistory([...history, msg]);
    localStorage.setItem('history', JSON.stringify([...history, msg]));
  }
  const removeTodo: RemoveTodo = (idx: number) => {
    const filtered = todos.filter((v:any, i:any) => idx !== i);
    const found  = todos.find((v:any, i:any) => idx === i);
    setTodos(filtered);
    localStorage.setItem('todos', JSON.stringify(filtered));
    addHistory({ text: found.text, type: 'remove' });
  }

  return (
    <div className="App">
      <h1>투두리스트 .</h1>
      <ul>
        {todos.map((todo:any, idx:any) => (
          <Item key={todo.text} todo={todo} toggleTodo={toggleTodo} idx={idx} removeTodo={removeTodo} />
        ))}
      </ul>
       <AddTodoForm addTodo={addTodoHandler} />
       <h3>히스토리 .</h3>
       <ul>
         {history.map((item:any) => {
           return (<li>{item}</li>)
         })}
       </ul>
    </div>
  );
}

export default App;
