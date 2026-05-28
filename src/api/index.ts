import express from 'express';
import usersRoutes from './routes/users.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import ticketsRoutes from './routes/tickets.routes.js';

const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/tickets', ticketsRoutes);

export default app;