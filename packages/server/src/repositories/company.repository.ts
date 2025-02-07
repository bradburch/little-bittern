import { Op } from 'sequelize';
import Company from '../models/company.model.js';

interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  retrieveAll(): Promise<Company[]>;
  retrieveByName(companyName: string): Promise<Company | null>;
}

export default class CompanyRepository implements ICompanyRepository {
  public async save(company: Company): Promise<Company> {
    try {
      return await Company.create({
        name: company.name,
      });
    } catch (err) {
      throw new Error('Failed to create Company!');
    }
  }

  public async retrieveAll(): Promise<Company[]> {
    try {
      return await Company.findAll();
    } catch (err) {
      throw new Error('Could not find any companies');
    }
  }

  public async retrieveByName(companyName: string): Promise<Company | null> {
    try {
      return await Company.findOne({
        where: {
          name: companyName,
        },
      });
    } catch (err) {
      throw new Error(`Could not find ${companyName}`);
    }
  }
}
