import React from 'react';
import './item.css';

interface Props {
  removeTodo: RemoveTodo;
  todo: Todo;
  toggleTodo: ToggleTodo;
  idx: Number;
}

export const Item: React.FC<Props> = ({ todo, toggleTodo, idx, removeTodo }) => {
  return (
    <li className="item">
      <label
        style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onClick={() => {
            toggleTodo(todo);
          }}
        /> {todo.text}
      </label>
      <button className="button" onClick={() => removeTodo(Number(idx))}>삭제</button>
    </li>
  );
};