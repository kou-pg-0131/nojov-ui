import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { Website } from '../../../../../domain/website';

type Props = {
  websites: Website[];
  onChange: (website: 'all' | Website) => void;
};

export const Websites: React.FC<Props> = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const name = e.target.value as string;
    if (name === 'all') {
      props.onChange(name);
      return;
    }

    const selected = props.websites.find((website) => website.name === name)!;
    props.onChange(selected);
  };

  return (
    <Select defaultValue='all' onChange={handleChange}>
      <MenuItem value='all'>全て</MenuItem>
      {props.websites.map((website, i) =>
        <MenuItem key={i} value={website.name}>{website.name}</MenuItem>
      )}
    </Select>
  );
};
