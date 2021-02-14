import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

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
  })
)(TableCell);

type Props = {
  children: React.ReactNode;
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
          {props.children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
