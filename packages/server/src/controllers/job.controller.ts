import { Request, Response } from 'express';
import Job from '../models/job.model.js';
import JobRepository from '../repositories/job.repository.js';

export default class JobController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      const job: Job = req.body;
      const repo = new JobRepository();
      const savedJob = await repo.save(job);

      res.status(201).send(savedJob);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving jobs.' + err,
      });
    }
  }

  async bulkCreate(req: Request, res: Response) {
    console.log('Req body: ', req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: 'Bulk create cannot be empty!',
      });
    }

    try {
      const job = req.body;
      const repo = new JobRepository();
      const savedJob = await repo.bulkCreate(job);

      res.status(201).send(savedJob);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving jobs.',
      });
    }
  }

  async findByName(req: Request, res: Response) {
    const jobName: string = req.params.name;

    try {
      const repo: JobRepository = new JobRepository();
      const job: Job | null = await repo.retrieveByName(jobName);

      res.status(201).send(job);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving jobs.' + err,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const repo: JobRepository = new JobRepository();
      const jobs: Job[] = await repo.retrieveAll();

      res.status(201).send(jobs);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving jobs.' + err,
      });
    }
  }

  async update(req: Request, res: Response) {
    if (!req.body.applicationText) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    const jobId: string = req.params.id;
    
    try {
      const repo: JobRepository = new JobRepository();
      const success: number[] = await repo.update(req.body, jobId);

      res.status(201).send(success);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while updating companies.' + err,
      });
    }
  }
}
