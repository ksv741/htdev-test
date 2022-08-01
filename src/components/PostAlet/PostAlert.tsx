import { Alert, Snackbar } from '@mui/material';
import { AlertColor } from '@mui/material/Alert/Alert';
import React, { useEffect, useState } from 'react';
import { useActions, useTypedSelector } from 'src/store';

const PostAlert = () => {
  const [alertState, setAlertState] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState<AlertColor>('success');

  const {setCreatePostError, setTimeZoneListError, removePostMessage: rpm} = useActions();
  const {timeZoneListError, createPostError, posts, removePostMessage} = useTypedSelector(state => state.post);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);

    createPostError && setCreatePostError('');
    timeZoneListError && setTimeZoneListError('');
    removePostMessage && rpm('');
  };

  const setAlert = (state: boolean, text: string, type: AlertColor) => {
    setAlertState(state);
    setAlertText(text);
    setAlertType(type);
  };

  useEffect(() => {
    setAlert(true, timeZoneListError || createPostError, 'error');
  }, [timeZoneListError, createPostError]);

  useEffect(() => {
    setAlert(true, 'Пост создан', 'success');
  }, [posts.length]);

  // Position this useEffect hook is important, because it reset unnecessary alert
  useEffect(() => {
    setAlertState(false);
  }, []);

  useEffect(() => {
    removePostMessage && setAlert(true, removePostMessage, 'success');
  }, [removePostMessage]);

  return (
    <Snackbar open={alertState} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default PostAlert;
