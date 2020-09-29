/** @format */

import React, { useState, useEffect, useCallback } from 'react';

import { AnswersList, Chats } from './components/index';
import './assets/styles/styles.css';
import FormDialog from './components/Form/formDialog';
import { db } from './firebase/index';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    });
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };

  const selectAnswer = (selectAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'contact':
        handleClickOpen();
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:
        //新しい要素をどんどん追加していく便利！
        addChats({
          text: selectAnswer,
          type: 'answer',
        });

        setTimeout(
          () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
          500
        );
        break;
    }
  };

  const addChats = (chat) => {
    setChats((prevChats) => {
      return [...prevChats, chat];
    });
  };

  useEffect(() => {
    (async () => {
      const initDataset = {};

      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            initDataset[id] = data;
          });
        });
      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollArea = document.querySelector('#scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default App;
