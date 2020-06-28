import React from 'react';
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
  jobs: Job[];
};

export const Chart: React.FC<Props> = (props: Props) => {
  const map = new Map<Language, number>([
    ['ruby', 0],
    ['python', 0],
  ]);

  props.jobs.forEach(job => {
    map.set(job.language, (map.get(job.language) || 0) + job.count);
  });

  const data = Array.from(map).map(([language, count]) => (
    { name: language, count: count }
  ));

  return (
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
  );
};
