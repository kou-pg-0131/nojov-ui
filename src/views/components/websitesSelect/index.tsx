import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Website } from '../../../domain';

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

export const WebsitesSelect: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    props.onChange(props.websites.find((website) => website.name === e.target.value as string) || 'all');
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel>求人サイト</InputLabel>

      <MuiSelect defaultValue='all' onChange={handleChange} className={classes.list}>

        <MenuItem value='all'>全て</MenuItem>
        {props.websites.map((website, i) =>
          <MenuItem key={i} value={website.name}>{website.name}</MenuItem>
        )}
      </MuiSelect>
    </FormControl>
  );
};
