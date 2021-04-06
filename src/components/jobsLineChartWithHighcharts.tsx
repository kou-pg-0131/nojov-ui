import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import { Website, Language, languageToColor } from '../domain';

type Props = {
  website?: Website;
  websitesWithUpdatedAt: { updated_at: Date; websites: Website[] }[];
};

// FIXME: 全体的に汚い
export const JobsLineChartWithHighcharts: React.FC<Props> = (props: Props) => {
  const series: Highcharts.SeriesLineOptions[] = [];
  const xAxis: Highcharts.XAxisOptions = {
    categories: [],
  };
  const yAxis: Highcharts.YAxisOptions = {
    title: { text: '' },
  };

  const blanks: null[] = [];
  props.websitesWithUpdatedAt.sort((a, b) => a.updated_at > b.updated_at ? 1 : -1).forEach((item, i) => {
    xAxis.categories.push(i % 2 === 0 ? '' : format(item.updated_at, 'yyyy-MM-dd'));
    const records: { language: Language; count: number; }[] = [];
    item.websites.forEach(website => {
      if (props.website?.name && props.website.name !== website.name) return;
      website.jobs.forEach(job => {
        const idx = records.findIndex(elm => elm.language === job.language);
        if (idx === -1) {
          records.push({ language: job.language, count: job.count });
        } else {
          records[idx].count += job.count;
        }
      });
    });
    records.forEach(record => {
      const idx = series.findIndex(elm => elm.name === record.language);
      if (idx === -1) {
        series.push({ color: languageToColor(record.language), name: record.language, data: [...blanks, record.count], type: 'line' });
      } else {
        series[idx].data.push(record.count);
      }
    });
    blanks.push(null);
  });

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      height: 550,
    },
    title: { text: '' },
    series,
    xAxis,
    yAxis,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};
