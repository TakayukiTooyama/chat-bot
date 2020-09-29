import React from 'react';
import { Answer } from './index';

const AnswersList = ({ answers, select }) => {
  return (
    <>
      <div className="c-grid__answer">
        {answers.map((value, index) => (
          <Answer
            content={value.content}
            nextId={value.nextId}
            key={index.toString()}
            select={select}
          />
        ))}
      </div>
    </>
  );
};

export default AnswersList;
