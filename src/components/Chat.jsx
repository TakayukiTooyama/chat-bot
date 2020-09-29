import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Adomin from '../assets/img/profile.jpg';
import Customer from '../assets/img/kawauso.png';

// const useStyles = makeStyles((theme) => ({
//   inline: {
//     display: 'inline',
//   },
// }));

const Chat = ({ text, type }) => {
  const isQuestion = type === 'question';
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  // const classes = useStyles();
  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="taka" src={Adomin} />
        ) : (
          <Avatar alt="akane" src={Customer} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{text}</div>
    </ListItem>
  );
};

export default Chat;
