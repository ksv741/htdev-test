import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useActions, useTypedSelector } from 'src/store';

const CreatePostButton = () => {
  const {
    textValue: text,
    signValue: sign,
    timeZoneCurrent: tz,
    timeZoneListError,
    signError,
    timeZoneIsLoading,
    createPostLoading,
  } = useTypedSelector(state => state.post);
  const [isFormValid, setIsFormValid] = useState(true);
  const [canCreate, setCanCreate] = useState(false);
  const {createPost} = useActions();

  useEffect(() => {
    if (!signError && !timeZoneListError && !!text.trim() && !timeZoneIsLoading) setIsFormValid(true);
    else setIsFormValid(false);
  }, [text, signError, timeZoneListError]);

  useEffect(() => {
    setCanCreate(!!text && !signError && !!tz && isFormValid && !createPostLoading && !timeZoneIsLoading);
  }, [isFormValid, createPostLoading]);

  const createPostHandler = () => {
    createPost({
      text,
      sign,
      tz,
    });
  };

  return (
    <LoadingButton
      loading={createPostLoading}
      loadingPosition='end'
      endIcon={<SendIcon />}
      variant='contained'
      disabled={!canCreate}
      onClick={createPostHandler}
    >
      Создать
    </LoadingButton>
  );
};

export default CreatePostButton;
