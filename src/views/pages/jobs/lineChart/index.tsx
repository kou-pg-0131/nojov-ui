import React, { useState, useEffect } from 'react';

// material-ui
import { Box } from '@material-ui/core';

// recharts
import {
  LineChart as Chart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
} from 'recharts';

// components
import { Checkboxes } from './checkboxes';

// other
import { Job, Language, languageToColor, languageToString } from '../../../../domain';
import moment from 'moment';

type Props = {
  jobs: Job[];
};

// component
export const LineChart: React.FC<Props> = (props: Props) => {
  // states
  const [checkedLanguages, setCheckedLanguages] = useState<Map<Language, boolean>>(new Map([]));
  const [languages, setLanguages] = useState<Language[]>([]);

  // did mount
  useEffect(() => {
    const languages = props.jobs.map(job => job.language).filter((language, i, self) => self.indexOf(language) === i);

    setLanguages(languages);
    setCheckedLanguages(new Map(languages.map(language => [language, checkedLanguages.has(language) ? !!checkedLanguages.get(language) : true])));
  }, [props.jobs]); // eslint-disable-line react-hooks/exhaustive-deps

  // events
  const handleCheck = (languages: Map<Language, boolean>): void => {
    setCheckedLanguages(languages);
  };

  const data = (() => {
    const m = new Map<string, Job[]>();

    props.jobs.forEach(job => {
      const date = moment(job.date).utc().format('YYYY-MM-DD');
      m.set(date, [...(m.get(date) || []), job]);
    });

    return Array.from(m.entries()).map(([date, jobs]) => (
      {
        date,
        ...jobs.filter(job => !!checkedLanguages.get(job.language)).reduce((job, current) => (
          { ...job, [languageToString(current.language)]: (job[languageToString(current.language)] || 0) + current.count }
        ), {} as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    ));
  })();

  return (
    <Box>
      <Box>
        {/* checkboxes */}
        <Checkboxes onCheck={handleCheck} languages={checkedLanguages}/>
      </Box>

      {/* chart */}
      <ResponsiveContainer height={550}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip itemSorter={(item) => -item.value as number} wrapperStyle={{ zIndex: 999 }}/>

          {languages.map((language, i) =>
            <Line key={i} strokeWidth={2} type="monotone" dataKey={languageToString(language)} stroke={languageToColor(language)}/>
          )}
        </Chart>
      </ResponsiveContainer>
    </Box>
  );
};
