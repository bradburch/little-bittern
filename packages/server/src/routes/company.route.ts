import { Router } from 'express';
import CompanyController from '../controllers/company.controller.js';

class CompanyRoutes {
  router: Router = Router();
  controller = new CompanyController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/create/:name', this.controller.create);
    this.router.get('/all', this.controller.findAll);
    this.router.get('/:company', this.controller.findByName);
  }
}

export default new CompanyRoutes().router;
