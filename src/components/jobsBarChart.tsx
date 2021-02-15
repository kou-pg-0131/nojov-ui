import React from 'react';
import { BarChart } from '.';
import { Language, languageToString } from '../domain';

type Props = {
  sort: boolean;
  items: { language: Language; count: number; color: string; }[];
};

export const JobsBarChart: React.FC<Props> = (props: Props) => {
  const data = props.items.map(item => (
    {
      name: languageToString(item.language),
      value: item.count,
      color: item.color,
    }
  ));

  return (
    <BarChart
      data={data}
      sort={props.sort}
      valueName='求人数'
    />
  );
};
