import http from '../http-common.js';
import Ashby from './ashby.js';
import Greenhouse from './greenhouse.js';
import Lever from './lever.js';

async function getUrl(url: URL): Promise<any> {
  try {
    const response = (await http.get(url.toString())).data;

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
      if (job.url.includes('wellfound') || job.url.includes('indeed')) continue;
      const url = new URL(job.url.split('?')[0].replace('/application', ''));

      const data = await getUrl(url);
      let ats;
      switch (url.hostname) {
        case 'job-boards.greenhouse.io':
          ats = new Greenhouse(data);
          break;
        case 'jobs.ashbyhq.com':
          ats = new Ashby(data);
          break;
        case 'jobs.lever.co':
          ats = new Lever(data);
          break;
      }

      if (ats) {
        const updateMap = ats.parseApplication();
        const jobBoard = ats.getCompanyJobBoard();

        if (!updateMap.has('applicationText')) continue;
        const updateJson: string = JSON.stringify(
          Object.fromEntries(updateMap),
        );

        if (updateJson.length > 0) {
          updates.push(http.put(`/jobs/${job.id}`, updateJson));
        }

        if (jobBoard) {
          const updateJson: string = JSON.stringify({ url: jobBoard.href });
          updates.push(http.put(`/companies/${job.companyId}`, updateJson));
        }
      }
    } catch (err) {}
  }

  Promise.all(updates);
}

fetchdb();
