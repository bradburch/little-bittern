import { Router } from 'express';
import CompanyController from '../controllers/company.controller.js';

class CompanyRoutes {
  router: Router = Router();
  controller = new CompanyController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/:name', this.controller.create);
    this.router.get('/all', this.controller.findAll);
    this.router.get('/:name', this.controller.findByName);
  }
}

export default new CompanyRoutes().router;
