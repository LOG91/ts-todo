import React, { useState } from 'react';


export const HistoryList: React.FC = (history:any) => {
  return (
    <ul>
      {history.map((todo:any) => (
        <div>{todo}</div>
      ))}
    </ul>
  );
};