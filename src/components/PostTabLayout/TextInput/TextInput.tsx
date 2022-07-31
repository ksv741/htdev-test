import { TextField } from '@mui/material';
import React from 'react';
import { useActions, useTypedSelector } from 'src/store';

const TextInput = () => {
  const {textValue} = useTypedSelector(state => state.post);
  const {setTextValue} = useActions();

  const postTextChangeHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <TextField
      label='Запись'
      variant='outlined'
      fullWidth
      multiline
      rows={4}
      value={textValue}
      onChange={postTextChangeHandler}
    />
  );
};

export default TextInput;
