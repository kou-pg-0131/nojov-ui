import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Job, languageToString, languageToColor } from '../domain';

type Props = {
  jobs: Job[];
};

export const JobsBarChart: React.FC<Props> = (props: Props) => {
  const data: { name: string; '求人数': number; color: string; }[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.name === languageToString(current.language));
    if (idx === -1) {
      result.push({ name: languageToString(current.language), '求人数': current.count, color: languageToColor(current.language) });
    } else {
      result[idx]['求人数'] += current.count;
    }

    return result;
  }, []);

  return (
    <ResponsiveContainer height={550}>
      <BarChart
        layout='vertical'
        data={data.sort((a, b) => a.name > b.name ? 1 : -1)}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis type='number'/>
        <YAxis type='category' dataKey='name' width={90}/>
        <Tooltip/>
        <Bar dataKey={'求人数'}>
          {data.map((record, index) =>
            <Cell key={index} fill={record.color}/>
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
