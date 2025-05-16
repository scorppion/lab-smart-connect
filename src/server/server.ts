import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/error';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});