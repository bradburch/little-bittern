import Company from "../models/company.model.js";
import Job from "../models/job.model.js";

const companies: Map<string, number> = new Map();

function convertToJob(row: any[], companyId: number) {
  return { title: row[1], url: row[9], applied: true, companyId: companyId };
}

async function retrieveCompanyId(row: any[]): Promise<number> {
  const company: string = String(row[0]).trim();

  if (!companies.has(company)) {
    const [c, _] = await Company.findOrCreate({ where: { name: company } });

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

export async function bulkCreateJobs(applied: any[][]): Promise<Job[]> {
  const jobs = await parseJobs(applied);

  return await Job.bulkCreate(jobs);
}
