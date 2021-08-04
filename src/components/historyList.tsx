import React, { useState } from 'react';


export const HistoryList: React.FC = (history:any) => {
  return (
    <ul>
      {history.map((todo:any) => (
        <div>{todo}</div>
      ))}
      <div>히스토리 지우기</div>
    </ul>
  );
};