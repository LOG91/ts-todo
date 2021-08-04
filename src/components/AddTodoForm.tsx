import React, { useState } from 'react';
import './form.css';

interface Props {
  addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  return (
    <form className="form">
      <button
        type="submit"
        className="form-button"
        onClick={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        할일 추가
      </button>
    </form>
  );
};