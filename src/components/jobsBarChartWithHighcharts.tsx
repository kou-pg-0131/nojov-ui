import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Job, languageToColor } from '../domain';

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

  const series: Highcharts.SeriesBarOptions[] = props.jobs.reduce((result, current) => {
    const idx = result.findIndex(record => record.name === current.language);
    if (idx === -1) {
      result.push({ stacking: 'normal', color: languageToColor(current.language), name: current.language, data: [[current.language, current.count]], type: 'bar' });
    } else {
      result[idx].data[0][1] = result[idx].data[0][1] + current.count;
    }
    return result;
  }, [] as Highcharts.SeriesBarOptions[]);

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 600,
    },
    title: { text: '' },
    series,
    xAxis,
    yAxis,
    legend: { enabled: false },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};
