import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, TooltipProps, CartesianGrid, ResponsiveContainer } from 'recharts';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Job, languageToColor } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartContainer: {
      marginBottom: theme.spacing(2),
    },
  }),
);

type Props = {
  jobs: Job[];
  sort: boolean;
};

const CustomTooltip: React.VFC<TooltipProps> = (props: TooltipProps) => {
  const { payload } = props;
  if (!payload[0]) return null;
  const { name: language, count, color } = payload[0].payload;

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
      <span style={{ color: languageToColor(language) }}>
        ●
      </span>
      <span style={{ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif' }}>
        &nbsp;{language}:&nbsp;
      </span>
      <span style={{ fontWeight: 'bold' }}>
        {count.toLocaleString()}
      </span>
    </div>
  );
};

export const JobsBarChartWithRecharts: React.VFC<Props> = (props: Props) => {
  const classes = useStyles();

  const data: { name: string; count: number; color: string; }[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.name === current.language);
    if (idx === -1) {
      result.push({ name: current.language, count: current.count, color: languageToColor(current.language) });
    } else {
      result[idx].count += current.count;
    }

    return result;
  }, []).sort((a, b) => (
    a.name > b.name ? 1 : -1
  )).sort((a, b) => (
    !props.sort ? 0 : a.count < b.count ? 1 : -1
  ));

  return (
    <ResponsiveContainer className={classes.chartContainer} height={550}>
      <BarChart
        layout='vertical'
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis type='number' tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()}/>
        <YAxis type='category' tick={{ fontSize: 12 }} dataKey='name' width={90}/>
        <Tooltip content={<CustomTooltip/>}/>
        <Bar dataKey='count'>
          {data.map((record, index) => (
            <Cell key={index} fill={record.color}/>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
