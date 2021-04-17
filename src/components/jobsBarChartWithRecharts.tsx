import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, TooltipProps, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Job, languageToColor } from '../domain';

type Props = {
  jobs: Job[];
  sort: boolean;
};

const CustomTooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { payload } = props;
  if (!payload[0]) return null;
  const { name: language, '求人数': count, color } = payload[0].payload;

  return (
    <div style={{
      fontSize: 12,
      boxShadow: '2px 2px 2px 0 rgba(180, 180, 180, 0.8)',
      color: '#333333',
      backgroundColor: 'rgba(254, 254, 254, 0.9)',
      border: `1px solid ${color}`,
      borderRadius: '2px',
      padding: '4px 8px',
    }}>
      <span style={{ color: languageToColor(language) }}>●</span><span style={{ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}> {language}</span>: <span style={{ fontWeight: 'bold' }}>{count.toLocaleString()}</span>
    </div>
  );
};

export const JobsBarChartWithRecharts: React.FC<Props> = (props: Props) => {
  const data: { name: string; '求人数': number; color: string; }[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.name === current.language);
    if (idx === -1) {
      result.push({ name: current.language, '求人数': current.count, color: languageToColor(current.language) });
    } else {
      result[idx]['求人数'] += current.count;
    }

    return result;
  }, []).sort((a, b) =>
    a.name > b.name ? 1 : -1
  ).sort((a, b) =>
    !props.sort ? 0 : a['求人数'] < b['求人数'] ? 1 : -1
  );

  return (
    <ResponsiveContainer height={550}>
      <BarChart
        layout='vertical'
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis type='number' tick={{ fontSize: 11 }} tickFormatter={(v) => v.toLocaleString()}/>
        <YAxis type='category' tick={{ fontSize: 11 }} dataKey='name' width={90}/>
        <Tooltip content={<CustomTooltip/>}/>
        <Bar dataKey={'求人数'}>
          {data.map((record, index) =>
            <Cell key={index} fill={record.color}/>
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
