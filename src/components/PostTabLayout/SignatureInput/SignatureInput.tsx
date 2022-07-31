import { TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useActions, useTypedSelector } from 'src/store';

const SignatureInput = () => {
  const {signValue, signError} = useTypedSelector(state => state.post);

  const [isValueValid, setIsValueValid] = useState(true);
  const [isValueTouched, setIsValueTouched] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const {setSignValue, setSignError} = useActions();

  const postSignatureChangeHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // TODO create hook with debounce
    setSignValue(event.target.value);
  };

  const checkValue = useCallback(() => {
    return signValue.trim().length <= 15;
  }, [signValue]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setIsValueTouched(true);
      setIsValueValid(checkValue());
      setSignValue(signValue);
      setDebounceTimeout(timeout);
    }, 200);

    return () => clearTimeout(timeout);
  }, [signValue]);

  useEffect(() => {
    const error = isValueTouched && !isValueValid;
    setSignError(error);
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
      helperText={signError && 'Значение не должно превышать 100 символов'}
    />
  );
};

export default SignatureInput;
