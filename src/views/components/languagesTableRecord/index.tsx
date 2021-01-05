import React from 'react';
import { Box, Link, TableRow, TableCell } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Launch as LaunchIcon } from '@material-ui/icons';
import { Language, languageToString, Website } from '../../../domain';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '0 auto',
      maxWidth: 500,
    },
    dataRow: {
      '&:hover': {
        background: grey[300],
      },
    },
  })
);

const StyledTableCell = withStyles(()=>
  createStyles({
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

type Props = {
  index: number;
  name: Language;
  count: number;
  searchUrl?: string;
  website: Website | 'all';
};

export const LanguagesTableRecord: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.dataRow}>
      <StyledTableCell align='center'>{props.index + 1}</StyledTableCell>
      <StyledTableCell align='center'>
        {languageToString(props.name)}
        {props.website !== 'all' && !!props.searchUrl && (
          <Box>
            <Box display='inline-block'>
              <Link style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} href={props.searchUrl} target='_blank' rel='noopener'>
                {props.website.name}
                <LaunchIcon style={{ fontSize: 12 }}/>
              </Link>
            </Box>
          </Box>
        )}
      </StyledTableCell>
      <StyledTableCell align='center'>{props.count.toLocaleString()}</StyledTableCell>
    </TableRow>
  );
};
