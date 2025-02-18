import http from '../http-common.js';
import Ashby from './ats/ashby.js';
import Greenhouse from './ats/greenhouse.js';
import Lever from './ats/lever.js';
import JobListing from '../util/jobListing.js';

function cleanUrl(url: string): URL {
  return new URL(url.split('?')[0].replace('/application', ''));
}

function retrieveATS(url: URL, data: any): any {
  const hostnameClassify = (hostname: string) => {
    if (url.hostname.includes(hostname)) {
      return url.hostname;
    }
  };

  switch (url.hostname) {
    case hostnameClassify('job-boards.greenhouse.io'):
      return new Greenhouse(data);
    case hostnameClassify('jobs.ashbyhq.com'):
      return new Ashby(data);
    case hostnameClassify('jobs.lever.co'):
      return new Lever(data);
    default:
      return undefined;
  }
}

async function updateJob(jobId: string, listing: JobListing): Promise<any> {
  return await http.put(`/jobs/${jobId}`, listing);
}

async function bulkCreateJobs(jobs: JobListing[]): Promise<any> {
  return await http.post('jobs/bulk', jobs);
}

async function getApplicationDescriptions() {
  const jobs = (await http.get('/jobs/')).data;
  const updates: Promise<any>[] = [];

  for (var job of jobs) {
    try {
      if (
        job.url.includes('wellfound') ||
        job.url.includes('indeed') ||
        job.url.includes('linkedin')
      )
        continue;

      const url = cleanUrl(job.url);
      const data = (await http.get(url.href)).data;
      const ats = retrieveATS(url, data);

      if (!ats) continue;

      const listing: JobListing | undefined = ats.parseApplication();

      if (!listing) continue;

      updates.push(updateJob(job.id, listing));
    } catch (err) {
      console.log(err);
    }
  }

  Promise.all(updates);
}

async function scrapeJobs() {
  const companies = (await http.get('/companies/')).data;
  const totalJobs: JobListing[] = [];

  for (var company of companies) {
    try {
      const compUrl = new URL(company.url);
      const data = (await http.get(compUrl.href)).data;

      const ats = retrieveATS(compUrl, (await http.get(compUrl.href)).data);

      const jobs: JobListing[] = ats.getAvailableJobs(company.id);

      totalJobs.push(...jobs);
    } catch (err) {}
  }

  await bulkCreateJobs(totalJobs);
}

scrapeJobs();
getApplicationDescriptions();
