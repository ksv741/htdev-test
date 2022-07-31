import SendIcon from '@mui/icons-material/Send';
import { Button, FormHelperText, Grid, TextField } from '@mui/material';
import TimeZoneSelect from 'components/TimeZoneSelect/TimeZoneSelect';
import React from 'react';
import { useTypedSelector } from 'src/store';

const CreatePostPage: React.FC = () => {
  const [postText, setPostText] = React.useState('');
  const [postSignature, setPostSignature] = React.useState('');
  const timeZoneList = useTypedSelector(state => state.post.timeZoneList);

  const postTextChangeHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const postSignatureChangeHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setPostSignature(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label='Запись'
          variant='outlined'
          fullWidth
          multiline
          maxRows={4}
          value={postText}
          onChange={postTextChangeHandler}
        />
      </Grid>

      <Grid container item xs={12} sx={{alignItems: 'flex-start'}}>
        <Grid item xs={6}>
          <TextField
            label='Подпись'
            variant='outlined'
            fullWidth
            multiline
            maxRows={4}
            value={postSignature}
            onChange={postSignatureChangeHandler}
          />
          <FormHelperText/>
        </Grid>
        <Grid item xs={6}>
          <TimeZoneSelect zones={timeZoneList}/>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button variant='contained' endIcon={<SendIcon />}>Send</Button>
      </Grid>

    </Grid>

  );
};

export default CreatePostPage;
