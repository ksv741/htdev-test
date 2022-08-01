import { Grid } from '@mui/material';
import CreatePostButton from 'components/PostTabLayout/CreatePostButton/CreatePostButton';
import SignatureInput from 'components/PostTabLayout/SignatureInput/SignatureInput';
import TextInput from 'components/PostTabLayout/TextInput/TextInput';
import TimeZoneSelect from 'components/PostTabLayout/TimeZoneSelect/TimeZoneSelect';
import React from 'react';
import { useTypedSelector } from 'src/store';

const CreatePostPage: React.FC = () => {
  const {timeZoneList} = useTypedSelector(state => state.post);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextInput/>
      </Grid>
      <Grid container item xs={12} sx={{alignItems: 'flex-start'}}>
        <Grid item xs={6}>
          <SignatureInput/>
        </Grid>
        <Grid item xs={6}>
          <TimeZoneSelect zones={timeZoneList}/>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CreatePostButton/>
      </Grid>
    </Grid>
  );
};

export default CreatePostPage;
