import React, { useState } from 'react';
import './index.scss';

interface Props {
  addTodo?: AddHandler;
  editTodo?: EditHandler;
  params?: any;
  isUpdate?: boolean,
  closeModal: CloseModal;
}

const Modal: React.FC<Props> = ({ addTodo, editTodo, params = false, closeModal }) => {
  console.log(params.text, 12920);
  const [text, setText] = useState(params ? params.text : '');
  const [label, setLabel] = useState(params ? params.label : '');

  const isUpdate = params;
  console.log(isUpdate);

  // if (params) {
  //   setText(params.text);
  //   setLabel(params.label); 
  // }
  const handler = () => {
    if (isUpdate) {
      editTodo && editTodo({ text, label, idx: params.idx });
    } else {
      addTodo && addTodo({ text, label });
    }
  }

  return (
    <div className="modal-wrap">
      <div className="modal-content">
        <div className="add-form">
          <div className="title">{ isUpdate ? '할 일 수정하기.' : '할 일 추가하기.'}</div>
          <div className="basic-row">
            <div className="basic-row__title">할 일</div>
            <input value={text} onChange={e => {
              setText(e.target.value);
            }} />
          </div>
          <div className="basic-row">
            <div className="basic-row__title">라벨</div>
            <input value={label} onChange={e => {
              setLabel(e.target.value);
            }} />
          </div>
          <div className="button-wrap">
            <button type="button" className="button-wrap__button" onClick={() => handler()}>등록</button>
            <button type="button" className="button-wrap__button" onClick={() => closeModal()}>취소</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Modal;