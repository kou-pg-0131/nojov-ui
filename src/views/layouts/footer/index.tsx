import React from 'react';

// material-ui
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// react-router
import { Link } from 'react-router-dom';

// styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#333',
      boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
      bottom: 0,
      color: '#fff',
      height: 80,
      left: 0,
      paddingTop: 18,
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    },
    copyright: {
      fontSize: 14,
    },
    privacyPolicyLink: {
      color: '#fff',
      fontSize: 12,
    },
  })
);

// component
export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component='footer' className={classes.root}>
      {/* copyright */}
      <Box>
        <Typography component='small' className={classes.copyright}>&copy; 2020 koki sato</Typography>
      </Box>

      {/* privacy policy */}
      <Box>
        <Link to='/privacy-policy' className={classes.privacyPolicyLink}>プライバシーポリシー</Link>
      </Box>
    </Box>
  );
};
