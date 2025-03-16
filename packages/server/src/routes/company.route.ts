import { Router } from 'express';
import CompanyController from '../controllers/company.controller.js';

class CompanyRoutes {
  router: Router = Router();
  controller = new CompanyController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/upload', this.controller.uploadFile);

    this.router.post('/create/:name', this.controller.create);
    this.router.put('/:id', this.controller.update);
    this.router.get('/', this.controller.findAll);
    this.router.get('/:name', this.controller.findByName);

  }
}

export default new CompanyRoutes().router;
