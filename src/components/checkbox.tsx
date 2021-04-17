import React from 'react';
import { Checkbox as MuiCheckbox, Typography, FormControl, FormControlLabel } from '@material-ui/core';

type Props = {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
  color?: string;
  labelPlacement: 'start' | 'end';
};

export const Checkbox: React.VFC<Props> = (props: Props) => {
  const handleChange = (e: { target: { checked: boolean } }) => props.onChange(e.target.checked);

  return (
    <FormControl>
      <FormControlLabel
        labelPlacement={props.labelPlacement}
        label={(
          <Typography>{props.label}</Typography>
        )}
        control={(
          <MuiCheckbox
            color='primary'
            checked={props.checked}
            style={{ color: props.color }}
            onChange={handleChange}
          />
        )}
      />
    </FormControl>
  );
};
