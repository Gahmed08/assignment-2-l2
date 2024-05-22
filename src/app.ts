import express, { Application, Request, Response, request } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/modules/products/product.route';
import { OrderRoute } from './app/modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRoute);
app.use('/api', OrderRoute);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Router not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
