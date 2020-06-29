import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Job } from '../../../../domain/job';
import { Language } from '../../../../domain/language';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

type Props = {
  fetched: boolean;
  jobs: Job[];
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    circle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
    },
  })
);

export const Chart: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const map = new Map<Language, number>([]);

  props.jobs.forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = Array.from(map).map(([language, count]) => (
    { name: language, count: count }
  ));

  return (
    <Box style={{ opacity: props.fetched ? 1 : 0.5 }} className={classes.root}>
      {props.fetched ? null : <Box className={classes.circle}><CircularProgress/></Box>}
      <ResponsiveContainer height={450}>
        <BarChart
          layout='vertical'
          data={data}
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis type='number'/>
          <YAxis type='category' dataKey='name' width={90}/>
          <Tooltip/>
          <Bar dataKey='count'/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
