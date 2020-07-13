import React from 'react';

// material-ui
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// other
import { Website } from '../../../../domain';

// styles
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

// component
export const WebsitesSelect: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  // events
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    props.onChange(props.websites.find((website) => website.name === e.target.value as string) || 'all');
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel>求人サイト</InputLabel>

      {/* select box */}
      <Select defaultValue='all' onChange={handleChange} className={classes.list}>

        {/* items */}
        <MenuItem value='all'>全て</MenuItem>
        {props.websites.map((website, i) =>
          <MenuItem key={i} value={website.name}>{website.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
