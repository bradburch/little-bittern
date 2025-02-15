import { url } from 'inspector';
import http from '../http-common.js';
import Ashby from './ats/ashby.js';
import Greenhouse from './ats/greenhouse.js';
import Lever from './ats/lever.js';
import JobListing from '../util/jobListing.js';

async function getUrl(url: URL): Promise<any> {
  try {
    const response = (await http.get(url.href)).data;

    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchdb() {
  const jobs = (await http.get('/jobs/')).data;
  const updates = [];

  for (var job of jobs) {
    try {
      if (
        job.url.includes('wellfound') ||
        job.url.includes('indeed') ||
        job.url.includes('linkedin')
      )
        continue;
      const url = new URL(job.url.split('?')[0].replace('/application', ''));

      const data = await getUrl(url);
      const hostnameClassify = (hostname: string) => {
        if (url.hostname.includes(hostname)) {
          return url.hostname;
        }
      };

      let ats;

      switch (url.hostname) {
        case hostnameClassify('job-boards.greenhouse.io'):
          ats = new Greenhouse(data);
          break;
        case hostnameClassify('jobs.ashbyhq.com'):
          ats = new Ashby(data);
          break;
        case hostnameClassify('jobs.lever.co'):
          ats = new Lever(data);
          break;
      }

      if (ats) {
        const listing: JobListing | undefined = ats.parseApplication();
        if (!listing) continue;

        updates.push(http.put(`/jobs/${job.id}`, listing));

        const jobBoard = ats.getCompanyJobBoard();
        if (jobBoard) {
          const updateJson: string = JSON.stringify({ url: jobBoard.href });
          updates.push(http.put(`/companies/${job.companyId}`, updateJson));
        }
      }
    } catch (err) {}
  }

  // Promise.all(updates);
}

async function scrapeJobs() {
  const companies = (await http.get('/companies/')).data;
  const totalJobs: JobListing[] = [];

  for (var company of companies) {
    try {
      const compUrl = new URL(company.url);
      if (!compUrl.hostname.includes('greenhouse')) continue;
      console.log(compUrl.href);
      const data = (await http.get(compUrl.href)).data;
      const ats = new Greenhouse(data);
      const jobs: JobListing[] = ats.getAvailableJobs(company.id);

      console.log(jobs);
      totalJobs.push(...jobs);
    } catch (err) {}
  }

  return await http.post('jobs/bulk', totalJobs);
}
// scrapeJobs();
fetchdb();
