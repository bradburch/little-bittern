import { Router } from 'express';
import JobController from '../controllers/job.controller.js';

class JobRoutes {
  router: Router = Router();
  controller = new JobController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/create/bulk', this.controller.bulkCreate)
    this.router.post('/create/:name', this.controller.create);
    this.router.get('/all', this.controller.findAll);
    
  }
}

export default new JobRoutes().router;
