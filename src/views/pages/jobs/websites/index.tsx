import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Website } from '../../../../domain/website';

type Props = {
  websites: Website[];
  onChange: (website: 'all' | Website) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minWidth: 160,
    },
    list: {
      textAlign: 'center',
    },
  })
);

export const Websites: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

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
    <FormControl className={classes.root}>
      <InputLabel>求人サイト</InputLabel>
      <Select defaultValue='all' onChange={handleChange} className={classes.list}>
        <MenuItem value='all'>全て</MenuItem>
        {props.websites.map((website, i) =>
          <MenuItem key={i} value={website.name}>{website.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
