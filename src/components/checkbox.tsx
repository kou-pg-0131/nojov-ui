import React from 'react';
import { Checkbox as MuiCheckbox, FormControl, FormControlLabel } from '@material-ui/core';

type Props = {
  label: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
};

export const Checkbox: React.VFC<Props> = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.currentTarget.checked);

  return (
    <FormControl>
      <FormControlLabel
        labelPlacement='start'
        label={props.label}
        control={(
          <MuiCheckbox
            color='primary'
            checked={props.checked}
            onChange={handleChange}
          />
        )}
      />
    </FormControl>
  );
};
