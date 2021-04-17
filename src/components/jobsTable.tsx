import React from 'react';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Launch as LaunchIcon } from '@material-ui/icons';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import classNames from 'classnames';
import { Website, Job, Language } from '../domain';
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
    diff: {
      fontSize: 12,
    },
    plus: {
      color: 'green',
    },
    minus: {
      color: 'red',
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
  website?: Website;
  jobs: Job[];
  beforeJobs: Job[];
};

export const JobsTable: React.VFC<Props> = (props: Props) => {
  const classes = useStyles();

  const records: { language: Language; count: number; searchUrl?: string; }[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.language === current.language);
    if (idx === -1) {
      result.push({ language: current.language, count: current.count, searchUrl: current.search_url });
    } else {
      result[idx].count += current.count;
    }

    return result;
  }, []);

  const beforeRecords: { language: Language; count: number; }[] = props.beforeJobs.reduce((result, current) => {
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
                {item.language}
                 {props.website && (
                   <Box>
                     <Box display='inline-block'>
                       <ExternalLink className={classes.websiteLink} href={item.searchUrl}>
                         {props.website.name}
                         <LaunchIcon style={{ fontSize: 12 }}/>
                       </ExternalLink>
                     </Box>
                   </Box>
                 )}
              </StyledTableCell>
              <StyledTableCell>
                {item.count.toLocaleString()}
                {(() => {
                  const beforeItem = beforeRecords.find(record => record.language === item.language);
                  if (!beforeItem) return null;

                  const diff = item.count - beforeItem.count;

                  return (
                    <>
                      &nbsp;
                        <Typography
                          className={classNames(classes.diff, { [classes.plus]: diff > 0, [classes.minus]: diff < 0 })}
                          component='span'
                        >
                      (
                          {diff === 0 && (<>&plusmn;</>)}
                          {diff > 0 && (<>+</>)}
                          {diff.toLocaleString()}
                      )
                        </Typography>
                    </>
                  );
                })()}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
