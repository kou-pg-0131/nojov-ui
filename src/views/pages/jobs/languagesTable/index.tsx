import React from 'react';
import { Box, Link, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Launch as LaunchIcon } from '@material-ui/icons';
import { Language, languageToString, Website } from '../../../../domain';

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
    head: {
      backgroundColor: '#333',
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

type Props = {
  languages: { name: Language; count: number; searchUrl?: string }[];
  website: Website | 'all';
};

export const LanguagesTable: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>順位</StyledTableCell>
            <StyledTableCell align='center'>言語</StyledTableCell>
            <StyledTableCell align='center'>求人数</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.languages.sort((a, b) => b.count - a.count).map((language, i) =>
            <TableRow key={i} className={classes.dataRow}>
              <StyledTableCell align='center'>{i + 1}</StyledTableCell>
              <StyledTableCell align='center'>
                {languageToString(language.name)}
                {props.website !== 'all' && !!language.searchUrl && (
                  <Box>
                    <Box display='inline-block'>
                      <Link style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} href={language.searchUrl} target='_blank' rel='noopener'>
                        {props.website.name}
                        <LaunchIcon style={{ fontSize: 12 }}/>
                      </Link>
                    </Box>
                  </Box>
                )}
              </StyledTableCell>
              <StyledTableCell align='center'>{language.count.toLocaleString()}</StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
