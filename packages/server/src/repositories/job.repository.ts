import { Op } from 'sequelize';
import Job from '../models/job.model.js';

interface IJobRepository {
  save(job: Job): Promise<Job>;
  bulkCreate(jobs: any): Promise<Job[]>;
  retrieveAll(): Promise<Job[]>;
  update(job: Job, id: string): Promise<number[]>;
}

export default class JobRepository implements IJobRepository {
  public async save(job: Job): Promise<Job> {
    try {
      return await Job.create({
        name: job.title,
      });
    } catch (err) {
      throw new Error(`Failed to create job ${job.title}`);
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
      throw new Error(`Bulk create failed due to ${err}`);
    }
  }

  public async update(job: Job, id: string): Promise<number[]> {
    try {
      return await Job.update(
        {
          applicationText: job.applicationText,
          title: job.title,
          location: job.location,
        },
        {
          where: { id: id },
        },
      );
    } catch (err) {
      throw new Error(`Job update with id: ${id} failed.`);
    }
  }

  public async retrieveByCompany(companyId: string): Promise<Job[]> {
    try {
      return await Job.findAll({
        where: {
          companyId: companyId,
        },
      });
    } catch (err) {
      throw new Error(`Could not find jobs for company with id: ${companyId}`);
    }
  }
}
