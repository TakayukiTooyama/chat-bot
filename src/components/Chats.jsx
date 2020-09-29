import React from 'react';
import { Chat } from './index';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() =>
  createStyles({
    chat: {
      height: 400,
      padding: '0',
      overflow: 'auto',
    },
  })
);

const Chats = ({ chats }) => {
  const classes = useStyles();

  return (
    <List className={classes.chat} id={'scroll-area'}>
      {chats.map((chat, index) => {
        return (
          <Chat text={chat.text} type={chat.type} key={index.toString()} />
        );
      })}
    </List>
  );
};

export default Chats;
