import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Checkbox } from '../../../components';
import { Language, languageToString, languageToColor, Job } from '../../../../domain';
import moment from 'moment';
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
    header: {
      textAlign: 'right',
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
};

export const Chart: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [sort, setSort] = useState<boolean>(false);
  const handleChangeSort = (checked: boolean): void => setSort(checked);

  const map = new Map<Language, number>([]);
  props.jobs.forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = (() => {
    const rows = Array.from(map).map(([language, count]) => ({ name: languageToString(language), '求人数': count, color: languageToColor(language) }));
    return sort ? rows.sort((a, b) => b['求人数'] - a['求人数']) : rows;
  })();

  const updatedAt = props.jobs.slice().sort((a, b) => a.date < b.date ? 1 : -1)[0]?.date;

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Checkbox label='求人数の多い順に並び替え' onChange={handleChangeSort}/>
        <Box>
          <small>
            最終更新日時: <time dateTime={updatedAt}>{moment(updatedAt).format('YYYY/MM/DD HH:mm')}</time>
          </small>
        </Box>
      </Box>
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
