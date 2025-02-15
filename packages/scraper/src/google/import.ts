import http from '../http-common';
import JobListing from '../util/jobListing';
import getAppliedJobs from './sheets';

const companies: Map<string, number> = new Map();

function convertToJob(row: any[], companyId: number) {
  // return new JobListing(row[1], companyId, '', row[9]);
  return { title: row[1], url: row[9], applied: true, companyId: companyId };
}

async function retrieveCompanyId(row: any[]): Promise<number> {
  const company: string = String(row[0]).trim();

  if (!companies.has(company)) {
    const c = (await http.post(`/companies/${company}`)).data;
    companies.set(company, c.id!);
  }

  return companies.get(company)!;
}

async function parseJobs(applied: any[][]): Promise<any[]> {
  const promises = applied.map(async (job) => {
    const companyId = await retrieveCompanyId(job);

    return convertToJob(job, companyId);
  });

  return await Promise.all(promises);
}

export async function bulkCreateJobs(applied: any[][]) {
  const jobs = await parseJobs(applied);

  return await http.post('jobs/bulk', jobs);
}

async function main() {
  const appliedJobs = await getAppliedJobs();
  console.log('records', appliedJobs);
  const bulk = bulkCreateJobs(appliedJobs);
}

main();
