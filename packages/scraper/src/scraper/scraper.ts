import http from '../http-common.js';
import Greenhouse from './greenhouse.js';

async function getUrl(url: URL): Promise<any> {
  try {
    const response = (await http.get(url.toString())).data;

    return response;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}

async function fetchdb() {
  const jobs = (await http.get('/jobs/')).data;

  for (var job of jobs) {
    try {
      const url = new URL(job.url);
      if (url.hostname === 'job-boards.greenhouse.io') {
        const data = await getUrl(url);
        const c = new Greenhouse(data);
        const updateMap = c.parseResponse();
        const updateJson: string = JSON.stringify(Object.fromEntries(updateMap));


        if (updateJson.length > 0) {
          const update = await http.put(`/jobs/${job.id}`, updateJson);
        }
      }
    } catch (err) {}
  }
}

fetchdb();
