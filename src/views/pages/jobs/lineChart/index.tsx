import React from 'react';
import {
  LineChart as Chart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Line,
} from 'recharts';

export const LineChart: React.FC = () => {
  const data = [
    {
      "date": "2020-01-02",
      "Ruby": 4000,
      "Python": 2400,
      "count": 2400
    },
    {
      "date": "2020-01-03",
      "Ruby": 3000,
      "Python": 1398,
      "count": 2210
    },
    {
      "date": "2020-01-04",
      "Ruby": 2000,
      "Python": 9800,
      "count": 2290
    },
  ]
  return (
    <ResponsiveContainer height={550}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Ruby" stroke="#8884d8" />
        <Line type="monotone" dataKey="Python" stroke="#82ca9d" />
      </Chart>
    </ResponsiveContainer>
  );
}
