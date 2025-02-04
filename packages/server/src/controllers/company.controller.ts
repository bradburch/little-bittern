import { Request, Response } from 'express';
import Company from '../models/company.model.js';
import CompanyRepository from '../repositories/company.repository.js';

export default class CompanyController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      const company: Company = req.body;
      const repo = new CompanyRepository();
      const savedCompany = await repo.save(company);

      res.status(201).send(savedCompany);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving companies.' + err,
      });
    }
  }

  async findByName(req: Request, res: Response) {
    const companyName: string = req.params.company;

    try {
      const repo: CompanyRepository = new CompanyRepository();
      const company: Company | null = await repo.retrieveByName(companyName);

      res.status(201).send(company);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving companies.' + err,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const repo: CompanyRepository = new CompanyRepository();
      const companies: Company[] = await repo.retrieveAll();

      res.status(201).send(companies);
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving companies.' + err,
      });
    }
  }
}
