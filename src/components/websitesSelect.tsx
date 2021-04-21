import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Website } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 180,
      marginBottom: theme.spacing(1),
    },
    list: {
      textAlign: 'center',
      fontSize: 24,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
  }),
);

type Props = {
  selected: Website;
  websites: Website[];
  onChange: (website?: Website) => void;
};

export const WebsitesSelect: React.VFC<Props> = (props: Props) => {
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    props.onChange(props.websites.find((website) => website.name === e.target.value as string) || undefined);
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel>求人サイト</InputLabel>

      <Select value={props.selected?.name || 'all'} onChange={handleChange} className={classes.list}>
        <MenuItem value='all'>全て</MenuItem>
        {props.websites.sort((a, b) => a.name > b.name ? 1 : -1).map((website, i) => (
          <MenuItem key={i} value={website.name}>{website.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
