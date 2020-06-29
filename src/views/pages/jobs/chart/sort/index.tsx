import React from 'react';
import { Checkbox } from '@material-ui/core';

type Props = {
  onChange: (checked: boolean) => void;
};

export const Sort: React.FC<Props> = (props: Props) => {
  const handleChange = (e: { target: { checked: boolean } }) => props.onChange(e.target.checked);

  return (
    <Checkbox onChange={handleChange}/>
  );
};
