/** @format */

import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './textInput';

const FormDialog = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const initName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const initEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const initDescription = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === '') {
        isBlank = true;
      }
    }
    return isBlank;
  };

  const handleSubmit = () => {
    const isBlank = validateRequiredInput(name, email, description);
    const isValidEmail = validateEmailFormat(email);

    if (isBlank) {
      alert('必須入力欄が空白です。');
      return false;
    } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。');
      return false;
    } else {
      const payload = {
        text:
          'お問い合わせがありました\n' +
          'お名前:' +
          name +
          '\n' +
          'Enail' +
          email +
          '\n' +
          'お問い合わせ内容\n' +
          description,
      };
      const url =
        'https://hooks.slack.com/services/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';

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).then(() => {
        alert('送信完了しました。追ってご連絡します。');
        setName('');
        setEmail('');
        setDescription('');
        return handleClose();
      });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={'お名前(必須)'}
          multiline={false}
          rows={1}
          value={name}
          type={'text'}
          onChange={initName}
        />
        <TextInput
          label={'メールアドレス(必須)'}
          multiline={false}
          rows={1}
          value={email}
          type={'email'}
          onChange={initEmail}
        />
        <TextInput
          label={'お問い合わせ内容(必須)'}
          multiline={false}
          rows={1}
          value={description}
          type={'text'}
          onChange={initDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
