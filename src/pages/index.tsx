import React from 'react';
import { useWebsites } from '../contexts';
import { Layout } from '../layout';
import { Loading, JobsTable, JobsBarChart } from '../components';
import { Job } from '../domain';

const Home: React.FC = () => {
  // const [website, setWebsite] = useState<'all' | Website>('all');
  // const [sort, setSort] = useState<boolean>(false);
  const { websites, updatedAt } = useWebsites();

  const jobs: Job[] = websites?.reduce((result, current) => {
    return [...result, ...current.jobs];
  }, []);

  // const handleChangeWebsite = (website: 'all' | Website): void => setWebsite(website);
  //
  // const websites: Website[] = jobs ? JobsAggregater.getWebsites(jobs) : [];
  //
  // const handleChangeSort = (checked: boolean) => {
  //   setSort(checked);
  // };
  //
  // const filteredJobs: Job[] = (() => {
  //   if (!jobs) return [];
  //   if (website === 'all') return jobs;
  //   return JobsAggregater.filterByWebsite(jobs, website);
  // })();
  //
  // const barChartItems = JobsAggregater.sum(filteredJobs).map(job => (
  //   { language: job.language, count: job.count, color: languageToColor(job.language) }
  // ));
  //
  // const tableItems = (() => {
  //   if (website === 'all') return JobsAggregater.sum(filteredJobs);
  //
  //   return filteredJobs.map(job => ({
  //     language: job.language,
  //     count: job.count,
  //     website: { name: job.website.name, href: job.search_url },
  //   }));
  // })();

  return (
    <Layout>
      {!websites && <Loading/>}
      {websites && jobs && (
        <>
          {/*}<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>*/}
        {/*}<WebsitesSelect onChange={handleChangeWebsite} websites={websites}/>*/}
        {/*}<Checkbox label='求人数の多い順に並び替え' onChange={handleChangeSort}/>*/}
        {/*}<small>*/}
        {/*}最終更新日時: {updatedAt && <time dateTime={updatedAt.toISOString()}>{format(updatedAt, 'yyyy/MM/dd HH:mm')}</time>}*/}
        {/*}</small>*/}
        {/*}</Box>*/}
{/*}*/}
        <JobsBarChart
          jobs={jobs}
        />
{/*}*/}
          <JobsTable
            jobs={jobs}
          />
        </>
      )}
    </Layout>
  );
};

export default Home;
