import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Website, Language, languageToColor } from '../domain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caution: {
      fontSize: 12,
      marginTop: theme.spacing(2),
      opacity: 0.8,
      textAlign: 'center',
    },
  }),
);

type Props = {
  website?: Website;
  websitesWithUpdatedAt: { updated_at: Date; websites: Website[] }[];
};

// FIXME: 全体的に汚い
export const JobsLineChartWithHighcharts: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const series: Highcharts.SeriesLineOptions[] = [];
  const xAxis: Highcharts.XAxisOptions = {
    tickInterval: 8,
    categories: [],
  };
  const yAxis: Highcharts.YAxisOptions = {
    title: { text: '' },
  };

  const blanks: null[] = [];
  props.websitesWithUpdatedAt.sort((a, b) => a.updated_at > b.updated_at ? 1 : -1).forEach(item => {
    xAxis.categories.push(format(item.updated_at, 'yyyy-MM-dd'));
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
        series.push({ lineWidth: 2, color: languageToColor(record.language), name: record.language, data: [...blanks, record.count], type: 'line' });
      } else {
        series[idx].data.push(record.count);
      }
    });
    blanks.push(null);
  });

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      height: 600,
    },
    title: { text: '' },
    series,
    xAxis,
    yAxis,
  };

  return (
    <>
      {!props.website && (
        <Typography className={classes.caution}>※集計対象のサイトまたは言語を追加した時期には急激な変化が見られることがあります</Typography>
      )}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </>
  );
};