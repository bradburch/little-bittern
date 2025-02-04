import { Op } from 'sequelize';
import Job from '../models/job.model.js';

interface IJobRepository {
  save(job: Job): Promise<Job>;
  bulkCreate(jobs: any): Promise<Job[]>;
  retrieveAll(): Promise<Job[]>;

//   retrieveByName(companyName: string): Promise<Company | null>;
  // update(company: Company): Promise<number>;
  // delete(companyId: number): Promise<number>;
  // deleteAll(): Promise<number>;
}

export default class JobRepository implements IJobRepository {
  public async save(job: Job): Promise<Job> {
    try {
      return await Job.create({
        name: job.title,
      });
    } catch (err) {
      throw new Error('Failed to create job!');
    }
  }

  public async retrieveAll(): Promise<Job[]> {
    try {
      return await Job.findAll();
    } catch (err) {
      throw new Error('Could not find any jobs');
    }
  }

  public async retrieveByName(job: string): Promise<Job | null> {
    try {
      return await Job.findOne({
        where: {
          name: job,
        },
      });
    } catch (err) {
      throw new Error(`Could not find ${job}`);
    }
  }

  public async bulkCreate(jobs: any[]): Promise<Job[]> {
    try {
      return await Job.bulkCreate(jobs);
    } catch (err) {
      throw new Error(`Bulk create failed due to`);
    }
  }
}
