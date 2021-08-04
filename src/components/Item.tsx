import React from 'react';
import './item.scss';

interface Props {
  removeTodo: RemoveTodo;
  todo: Todo;
  toggleTodo: ToggleTodo;
  idx: Number;
  editTodo: EditTodo;
}

export const Item: React.FC<Props> = ({ todo, toggleTodo, idx, removeTodo, editTodo }) => {
  return (
    <li className="item" onClick={(e) => {
      editTodo(Number(idx))}
    }>
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
      <div className="item__label">{todo.label}</div>
      <button className="button" onClick={() => removeTodo(Number(idx))}>삭제</button>
    </li>
  );
};