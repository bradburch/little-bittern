import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import companyRoutes from './routes/company.route.js';
import Database from './db/index.js';
import jobRoutes from './routes/job.route.js';

const app: Express = express();
const port = process.env.PORT || 8080;

const db = new Database();
await db.sequelize?.sync();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Server Started');
});

app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
