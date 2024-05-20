import express, { Application } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/modules/product/product.route';
const app: Application = express()

// parsers
app.use(express.json());
app.use(cors());

// routing 
app.use('/api/products', ProductRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app;