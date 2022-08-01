import { TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useActions, useTypedSelector } from 'src/store';

const SignatureInput = () => {
  const {signValue, signError} = useTypedSelector(state => state.post);

  const [isValueValid, setIsValueValid] = useState(true);
  const [isValueTouched, setIsValueTouched] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const {setSignValue, setSignError} = useActions();

  const postSignatureChangeHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setSignValue(event.target.value);
    setIsValueTouched(true);
  };

  const checkValue = useCallback(() => {
    const isEmptyValue = signValue.trim() === '';
    const isLongerTanEnable = signValue.trim().length > 100;
    if (isEmptyValue) {
      setErrorText('Значение не может быть пустым');
    }
    if (isLongerTanEnable) setErrorText('Значение не должно превышать 100 символов');

    return (isValueTouched && !isEmptyValue && !isLongerTanEnable);
  }, [signValue]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setIsValueValid(checkValue());
      setSignValue(signValue);
      setDebounceTimeout(timeout);
    }, 20);

    return () => clearTimeout(timeout);
  }, [signValue]);

  useEffect(() => {
    const error = isValueTouched && !isValueValid;
    setSignError(error);
  }, [isValueValid]);

  return (
    <TextField
      error={signError}
      label='Подпись'
      variant='outlined'
      fullWidth
      multiline
      maxRows={1}
      value={signValue}
      onChange={postSignatureChangeHandler}
      helperText={signError && errorText}
    />
  );
};

export default SignatureInput;
