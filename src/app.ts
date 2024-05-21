import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/modules/product/product.route';
import { OrderRouter } from './app/modules/order/order.route';
const app: Application = express()

// parsers
app.use(express.json());
app.use(cors());

// routing 
app.use('/api/products', ProductRouter);

app.use('/api/orders', OrderRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Not found route
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

export default app;