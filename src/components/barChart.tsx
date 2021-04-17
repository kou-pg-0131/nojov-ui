import React from 'react';
import { BarChart as Chart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

type Record = {
  name: string;
  color: string;
  value: number;
};

type Props = {
  sort?: boolean;
  data: Record[];
  valueName: string;
};

export const BarChart: React.VFC<Props> = (props: Props) => {
  const data = (() => {
    const records = props.data.map(record => {
      return { name: record.name, color: record.color, [props.valueName]: record.value };
    });

    if (!props.sort) return records;
    return records.sort((a, b) => (b[props.valueName] as number) - (a[props.valueName] as number));
  })();

  return (
    <ResponsiveContainer height={550}>
      <Chart
        layout='vertical'
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis type='number'/>
        <YAxis type='category' dataKey='name' width={90}/>
        <Tooltip/>
        <Bar dataKey={props.valueName}>
          {data.map((record, index) => (
            <Cell key={index} fill={record.color}/>
          ))}
        </Bar>
      </Chart>
    </ResponsiveContainer>
  );
};
