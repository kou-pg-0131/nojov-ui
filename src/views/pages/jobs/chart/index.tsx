import React, { useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Job } from '../../../../domain/job';
import { Website } from '../../../../domain/website';
import { Language } from '../../../../domain/language';
import { Websites } from './websites';
import { Sort } from './sort';
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

  const [sort, setSort] = useState<boolean>(false);
  const [website, setWebsite] = useState<'all' | Website>('all');

  const handleChangeSort = (sort: boolean) => setSort(sort);
  const handleChangeWebsite = (website: 'all' | Website) => setWebsite(website);

  const websites: Website[] = props.jobs.map(job => job.website).filter((website, i, self) =>
    self.findIndex((w) => website.name === w.name) === i
  );

  const map = new Map<Language, number>([]);
  props.jobs.filter(job => website === 'all' || job.website.name === website.name).forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = (() => {
    const rows = Array.from(map).map(([language, count]) => ({ name: language, count: count }));
    return sort ? rows.sort((a, b) => b.count - a.count) : rows;
  })();

  return (
    <Box style={{ opacity: props.fetched ? 1 : 0.5, pointerEvents: props.fetched ? 'auto' : 'none' }} className={classes.root}>
      {props.fetched ? null : <Box className={classes.circle}><CircularProgress/></Box>}
      <Websites websites={websites} onChange={handleChangeWebsite}/>
      <Sort onChange={handleChangeSort}/>
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
