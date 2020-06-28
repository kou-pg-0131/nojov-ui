import React from 'react';
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

export const Chart: React.FC = () => {
  const data = [
    { name: 'foo', count: 150 },
    { name: 'bar', count: 300 },
    { name: 'hoge', count: 450 },
    { name: 'piyo', count: 600 },
  ];

  return (
    <ResponsiveContainer height={450}>
      <BarChart
        layout='vertical'
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis type='number' />
        <YAxis type='category' dataKey='name' width={90} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey='count'/>
      </BarChart>
    </ResponsiveContainer>
  );
};
