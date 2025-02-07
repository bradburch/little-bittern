import http from '../http-common';
import getAppliedJobs from './sheets';

const companies: Map<string, number> = new Map();

function convertToJob(row: any[], companyId: number) {
  return { title: row[1], url: row[9], applied: true, companyId: companyId };
}

async function retrieveCompanyId(row: any[]): Promise<number> {
  const company: string = String(row[0]).trim();

  if (!companies.has(company)) {
    const c = (await http.post(`/companies/${company}`)).data;
    console.log('Hello!', c);

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
  console.log('jobs', jobs);

  return await http.post('jobs/bulk', jobs);
}

async function main() {
  const records = await getAppliedJobs();
  console.log('records', records);
  const bulk = bulkCreateJobs(records);
}

main();
