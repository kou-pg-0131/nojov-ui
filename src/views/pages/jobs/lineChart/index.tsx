import React from 'react';
import { Job } from '../../../../domain/job';
import { languageToColor } from '../../../../domain/language';
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
import moment from 'moment';

type Props = {
  jobs: Job[];
};

export const LineChart: React.FC<Props> = (props: Props) => {
  const languages = props.jobs.map(job => job.language).filter((language, i, self) => self.indexOf(language) === i);

  const m = new Map<string, Job[]>();
  props.jobs.forEach(job => {
    const date = moment(job.date).format('YYYY-MM-DD');
    m.set(date, m.has(date) ? [...m.get(date)!, job] : [job])
  });

  const data: any[] = [];
  m.forEach((jobs, date) => {
    const obj: any = { date };

    jobs.forEach(job => {
      obj[job.language] = job.count;
    });

    data.push(obj);
  });

  return (
    <ResponsiveContainer height={550}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        {languages.map((language, i) =>
          <Line key={i} type="monotone" dataKey={language} stroke={languageToColor(language)} />
        )}
      </Chart>
    </ResponsiveContainer>
  );
}
