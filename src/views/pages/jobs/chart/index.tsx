import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Job } from '../../../../domain/job';
import { Website } from '../../../../domain/website';
import { Language, languageToString, languageToColor } from '../../../../domain/language';
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
  jobs: Job[];
  sort: boolean;
};

export const Chart: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const map = new Map<Language, number>([]);
  props.jobs.forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = (() => {
    const rows = Array.from(map).map(([language, count]) => ({ name: languageToString(language), '求人数': count, color: languageToColor(language) }));
    return props.sort ? rows.sort((a, b) => b['求人数'] - a['求人数']) : rows;
  })();

  return (
    <Box className={classes.root}>
      <ResponsiveContainer height={550}>
        <BarChart
          layout='vertical'
          data={data}
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis type='number'/>
          <YAxis type='category' dataKey='name' width={90}/>
          <Tooltip/>
          <Bar dataKey='求人数'>
            {data.map((entry, index) =>
              <Cell key={index} fill={entry.color} />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
