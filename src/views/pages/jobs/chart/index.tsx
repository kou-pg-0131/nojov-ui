import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Job } from '../../../../domain/job';
import { Website } from '../../../../domain/website';
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

type Props = {
  website: 'all' | Website;
  jobs: Job[];
  sort: boolean;
};

export const Chart: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const map = new Map<Language, number>([]);
  props.jobs.filter(job => props.website === 'all' || job.website.name === props.website.name).forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = (() => {
    const rows = Array.from(map).map(([language, count]) => ({ name: language, count: count }));
    return props.sort ? rows.sort((a, b) => b.count - a.count) : rows;
  })();

  return (
    <Box className={classes.root}>
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
