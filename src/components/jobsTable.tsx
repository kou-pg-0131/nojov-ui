import React from 'react';
import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Launch as LaunchIcon } from '@material-ui/icons';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Website, Job, Language, languageToString } from '../domain';
import { ExternalLink } from '.';

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
    websiteLink: {
      alignItems: 'center',
      display: 'flex',
      fontSize: 12,
      textAlign: 'center',
      textDecoration: 'none',
    },
  })
);

const StyledTableCell = withStyles(()=>
  createStyles({
    root: {
      textAlign: 'center',
    },
    head: {
      backgroundColor: '#333',
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
)(TableCell);

type Props = {
  jobs: Job[];
};

export const JobsTable: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const records: { language: Language; count: number; }[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.language === current.language);
    if (idx === -1) {
      result.push({ language: current.language, count: current.count });
    } else {
      result[idx].count += current.count;
    }

    return result;
  }, []);

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
          {records.sort((a, b) => b.count - a.count).map((item, i) => (
            <TableRow key={item.language}>
              <StyledTableCell>
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>
                {languageToString(item.language)}
                {/* {item.website && ( */}
                {/*       <Box> */}
                {/*         <Box display='inline-block'> */}
                {/*           <ExternalLink className={classes.websiteLink} href={item.website.href}> */}
                {/*             {item.website.name} */}
                {/*             <LaunchIcon style={{ fontSize: 12 }}/> */}
                {/*           </ExternalLink> */}
                {/*         </Box> */}
                {/*       </Box> */}
                {/*     )} */}
              </StyledTableCell>
              <StyledTableCell>
                {item.count.toLocaleString()}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
