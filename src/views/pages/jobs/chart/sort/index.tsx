import React from 'react';
import { Checkbox, Typography, FormControl, FormControlLabel } from '@material-ui/core';

type Props = {
  onChange: (checked: boolean) => void;
};

export const Sort: React.FC<Props> = (props: Props) => {
  const handleChange = (e: { target: { checked: boolean } }) => props.onChange(e.target.checked);

  return (
    <FormControl>
      <FormControlLabel
        labelPlacement='start'
        label={<Typography>求人数の多い順に並び替え</Typography>}
        control={<Checkbox onChange={handleChange}/>}
      />
    </FormControl>
  );
};
