import React, { useState } from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Website, Job, Language, languageToColor } from '../domain';
import { Checkbox } from '../components';

type Props = {
  website?: Website;
  websitesWithUpdatedAt: { updated_at: Date; websites: Website[] }[];
};

export const JobsLineChartWithRecharts: React.FC<Props> = (props: Props) => {
  const [inactiveLanguages, setInactiveLanguages] = useState<Language[]>([]);

  const languages: Language[] = [];

  const data = props.websitesWithUpdatedAt.map(({ updated_at, websites }) => {
    const jobs: Job[] = websites.filter(website => !props.website || website.name === props.website?.name).reduce((result, current) => {
      return [...result, ...current.jobs];
    }, [] as Job[]);

    const record = { date: format(updated_at, 'yyyy-MM-dd') };
    jobs.forEach(job => {
      if (!languages.includes(job.language)) languages.push(job.language);
      if (inactiveLanguages.includes(job.language)) return;
      record[job.language] = (record[job.language] || 0) + job.count;
    });

    return record;
  }).sort((a, b) =>
    a.date > b.date ? 1 : -1
  );

  const [latest, secondLatest] = data.slice(-2);
  if (latest.date === secondLatest.date) data.splice(-2, 1);

  const handleCheckLanguage = (checked: boolean, language: Language) => {
    if (checked) {
      setInactiveLanguages(prev => prev.filter(l => l !== language));
    } else {
      setInactiveLanguages(prev => [...prev, language]);
    }
  };

  return (
    <>
      <ResponsiveContainer height={600}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip
            itemSorter={item => (item.value as number) * -1}
            offset={100}
          />
          {languages.map(language => (
            <Line
              key={language}
              type="monotone"
              dataKey={language}
              stroke={languageToColor(language)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {languages.map(language => (
        <Checkbox
          key={language}
          color={languageToColor(language)}
          labelPlacement='end'
          checked={!inactiveLanguages.includes(language)}
          label={language}
          onChange={(checked: boolean) => handleCheckLanguage(checked, language)}
        />
      ))}
    </>
  );
};
