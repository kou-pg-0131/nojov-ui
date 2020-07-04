import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { IndeterminateCheckBox as IndeterminateCheckBoxIcon, CheckBox as CheckBoxIcon } from '@material-ui/icons';
import { Job, languageToColor, languageToString } from '../../../../domain';
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
  const [checkedLanguages, setCheckedLanguages] = useState<any>({}); // eslint-disable-line @typescript-eslint/no-explicit-any
  const languages = props.jobs.map(job => job.language).filter((language, i, self) => self.indexOf(language) === i);

  useEffect(() => {
    setCheckedLanguages(Object.fromEntries(languages.map(language => [language, true])));
  }, [props.jobs]);

  const handleCheck = (e: { target: { value: string; checked: boolean; } }) => {
    setCheckedLanguages({ ...checkedLanguages, [e.target.value]: e.target.checked });
  };

  const getAllCheckState = (): 'all' | 'indeterminate' | 'none' => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switch (Object.entries(checkedLanguages).filter(([_, b]) => b).length) {
      case languages.length:
        return 'all';
      case 0:
        return 'none';
      default:
        return 'indeterminate';
    }
  };

  const handleClickAllCheck = () => {
    setCheckedLanguages(Object.fromEntries(languages.map(language => [language, getAllCheckState() === 'none'])));
  };

  const m = new Map<string, Job[]>();
  props.jobs.forEach(job => {
    const date = moment(job.date).format('YYYY-MM-DD');
    m.set(date, [...(m.get(date) || []), job]);
  });

  const data = (() => {
    const rows: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    m.forEach((jobs, date) => {
      const obj: any = { date }; // eslint-disable-line @typescript-eslint/no-explicit-any

      jobs.filter(job => !!checkedLanguages[job.language]).forEach(job => {
        obj[languageToString(job.language)] = job.count;
      });

      rows.push(obj);
    });

    return rows;
  })();

  return (
    <Box>
      <Box>
        <FormControl>
          <FormControlLabel
            labelPlacement='end'
            label={<Typography>全てチェック</Typography>}
            control={<Checkbox onClick={handleClickAllCheck} checked={getAllCheckState() !== 'none'} checkedIcon={getAllCheckState() === 'all' ? <CheckBoxIcon/> : <IndeterminateCheckBoxIcon/>}/>}
          />
        </FormControl>
      </Box>
      <Box>
        {languages.map(language =>
          <FormControl key={language}>
            <FormControlLabel
              labelPlacement='end'
              label={<Typography>{languageToString(language)}</Typography>}
              control={<Checkbox value={language} onChange={handleCheck} checked={!!checkedLanguages[language]} style={{ marginLeft: 4, padding: 4.5, color: languageToColor(language) }}/>}
            />
          </FormControl>
        )}
      </Box>
      <ResponsiveContainer height={550}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip wrapperStyle={{ zIndex: 999 }}/>

          {languages.map((language, i) =>
            <Line key={i} strokeWidth={2} type="monotone" dataKey={languageToString(language)} stroke={languageToColor(language)} />
          )}
        </Chart>
      </ResponsiveContainer>
    </Box>
  );
};
