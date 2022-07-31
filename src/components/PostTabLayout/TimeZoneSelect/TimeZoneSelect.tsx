import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { useActions, useTypedSelector } from 'src/store';

interface TimeZoneSelectProps {
  zones: string[] | null;
}

const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({zones}) => {
  const {timeZoneCurrent, timeZoneIsLoading, timeZoneListError} = useTypedSelector(state => state.post);
  const {setCurrentTimeZone} = useActions();

  const handleChange = (event: SelectChangeEvent) => setCurrentTimeZone(event.target.value);

  function renderLoader() {
    return timeZoneIsLoading
      ? <MenuItem disabled>LOADING...</MenuItem>
      : null;
  }

  function renderZonesItems() {
    return zones?.map((item) => (
      <MenuItem value={item} key={item}>{item}</MenuItem>
    ));
  }

  function renderErrorText() {
    return timeZoneListError
      ? <FormHelperText variant='filled'>{timeZoneListError}</FormHelperText>
      : null;
  }

  // TODO: create loader component or use loading button
  return (
    <FormControl variant='standard' sx={{ m: '0 8px', minWidth: 200 }} disabled={!!timeZoneListError} error={!!timeZoneListError}>
      <InputLabel id='select-timezone'>Точное время по</InputLabel>
      <Select
        variant='outlined'
        labelId='select-timezone'
        value={zones ? timeZoneCurrent : ''}
        onChange={handleChange}
        MenuProps={{style: {maxHeight: 400}}}
      >
        {renderLoader()}
        {renderZonesItems()}
      </Select>
      {renderErrorText()}
    </FormControl>
  );
};

export default TimeZoneSelect;
