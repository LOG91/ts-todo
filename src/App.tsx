import React, { useState }  from 'react';
import { Item } from './components/Item';
import { AddTodoForm } from './components/AddTodoForm';
import { HistoryList} from './components/historyList'
import Modal from './components/modal';
import './App.css';

function App() {
  const init:any = localStorage.getItem('todos') || '[]';
  const localHistory:any = localStorage.getItem('history') || '[]';
  const [todos, setTodos] = useState(JSON.parse(init));
  const [history, setHistory] = useState(JSON.parse(localHistory));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
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

  const addTodoHandler:AddHandler = (params: { text: string, label: string }) => {
    const newTodo = { ...params, complete: false };
    addHistory({ text: params.text, type: 'add' });
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    
    setTodos([...todos, { text: params.text, label: params.label, complete: false }]);
    setModalOpen(false);
  }

  const editTodoHandler: EditHandler = (params: { text: string, label: string, idx: number}) => {
    const mapped = todos.map((v: any, i: any) => {
      if (i === params.idx) {
        v.text = params.text;
        v.label = params.label;
      }
      return v;
    });

    setTodos(mapped);
    localStorage.setItem('todos', JSON.stringify(mapped));
    setModalOpen(false);
  }

  const addTodo: AddTodo = () => {
    setModalOpen(true);
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

  const editTodo: EditTodo = (idx: number) => {
    const find = todos.find((v:any, i:number) => idx === i);
    setSelectedItem({ ...find, idx });
    setModalOpen(true);
    // setTodos()
  }

  const deleteHistory = () => {
    setHistory([]);
    localStorage.setItem('history', JSON.stringify([]));
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="App">
      <h1>투두리스트 .</h1>
      <ul>
        {todos.map((todo:any, idx:any) => (
          <Item
            key={todo.text}
            todo={todo}
            toggleTodo={toggleTodo}
            idx={idx}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
       <AddTodoForm addTodo={addTodo} />
       <h3>히스토리 .</h3>
       <ul>
         {history.map((item:any) => {
           return (<li>{item}</li>)
         })}
       </ul>
       <button type="button" onClick={deleteHistory}>히스토리 비우기</button>
       { modalOpen && <Modal editTodo={editTodoHandler} addTodo={addTodoHandler} params={selectedItem} closeModal={closeModal} /> }
    </div>
  );
}

export default App;
