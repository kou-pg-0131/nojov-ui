import React from 'react';
import { Checkbox as MuiCheckbox, Typography, FormControl, FormControlLabel } from '@material-ui/core';

type Props = {
  label: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<Props> = (props: Props) => {
  const handleChange = (e: { target: { checked: boolean } }) => props.onChange(e.target.checked);

  return (
    <FormControl>
      <FormControlLabel
        labelPlacement='start'
        label={<Typography>{props.label}</Typography>}
        control={<MuiCheckbox onChange={handleChange}/>}
      />
    </FormControl>
  );
};
