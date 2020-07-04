import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Website } from '../../../../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 160,
    },
    list: {
      textAlign: 'center',
      fontSize: 24,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
  })
);

type Props = {
  websites: Website[];
  onChange: (website: 'all' | Website) => void;
};

export const Websites: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const name = e.target.value as string;
    if (name === 'all') {
      props.onChange(name);
      return;
    }

    props.onChange(props.websites.find((website) => website.name === name) || 'all');
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
