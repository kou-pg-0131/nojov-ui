import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Job, Language, languageToColor } from '../domain';

type Props = {
  jobs: Job[];
  sort: boolean;
};

export const JobsBarChartWithHighcharts: React.FC<Props> = (props: Props) => {
  const xAxis: Highcharts.XAxisOptions = {
    type: 'category',
  };
  const yAxis: Highcharts.YAxisOptions = {
    title: { text: '' },
  };

  const records: { language: Language; count: number; }[] = [];
  props.jobs.forEach(job => {
    const idx = records.findIndex(record => record.language === job.language);
    if (idx === -1) {
      records.push({ language: job.language, count: job.count });
    } else {
      records[idx].count += job.count;
    }
  });

  const series: Highcharts.SeriesBarOptions[] = records.sort((a, b) => !props.sort ? 0 : b.count - a.count).map(record => ({
    type: 'bar',
    name: record.language,
    color: languageToColor(record.language),
    data: [[record.language, record.count]],
    stacking: 'normal',
    pointWidth: 24,
  } as Highcharts.SeriesBarOptions));

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 600,
    },
    title: { text: '' },
    tooltip: {
      enabled: false,
    },
    series,
    xAxis,
    yAxis,
    plotOptions: { bar: { dataLabels: {
      enabled: true,
      formatter: function(): string { return this.y.toLocaleString(); },
    } } },
    legend: { enabled: false },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};
