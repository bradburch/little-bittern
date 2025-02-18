import { Router } from 'express';
import JobController from '../controllers/job.controller.js';

class JobRoutes {
  router: Router = Router();
  controller = new JobController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/bulk', this.controller.bulkCreate);
    this.router.post('/', this.controller.create);
    this.router.put('/:id', this.controller.update);
    this.router.get('/', this.controller.findAll);
    this.router.get('/company/:companyId', this.controller.findJobsByCompany);
  }
}

export default new JobRoutes().router;
