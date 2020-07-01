import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { Job } from '../../../../domain/job';
import { languageToColor, languageToString } from '../../../../domain/language';
import {
  LineChart as Chart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
} from 'recharts';
import moment from 'moment';

type Props = {
  jobs: Job[];
};

export const LineChart: React.FC<Props> = (props: Props) => {
  const [checkedLanguages, setCheckedLanguages] = useState<any>({});
  const languages = props.jobs.map(job => job.language).filter((language, i, self) => self.indexOf(language) === i);

  useEffect(() => {
    setCheckedLanguages({ ...Object.fromEntries(languages.map(language => [language, true])), ...checkedLanguages })
  }, [props.jobs]);

  const handleCheck = (e: { target: { value: string; checked: boolean; } }) => {
    setCheckedLanguages({ ...checkedLanguages, [e.target.value]: e.target.checked });
  };

  const m = new Map<string, Job[]>();
  props.jobs.forEach(job => {
    const date = moment(job.date).format('YYYY-MM-DD');
    m.set(date, m.has(date) ? [...m.get(date)!, job] : [job])
  });

  const data = (() => {
    const rows: any[] = [];

    m.forEach((jobs, date) => {
      const obj: any = { date };

      jobs.filter(job => !!checkedLanguages[job.language]).forEach(job => {
        obj[languageToString(job.language)] = job.count;
      });

      rows.push(obj);
    });

    return rows;
  })();

  return (
    <Box>
      {languages.map(language =>
        <FormControl>
          <FormControlLabel
            labelPlacement='end'
            label={<Typography>{languageToString(language)}</Typography>}
            control={<Checkbox value={language} onChange={handleCheck} checked={!!checkedLanguages[language]} style={{ color: languageToColor(language) }}/>}
          />
        </FormControl>
      )}
      <ResponsiveContainer height={550}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {languages.map((language, i) =>
            <Line key={i} strokeWidth={2} type="monotone" dataKey={languageToString(language)} stroke={languageToColor(language)} />
          )}
        </Chart>
      </ResponsiveContainer>
    </Box>
  );
}
