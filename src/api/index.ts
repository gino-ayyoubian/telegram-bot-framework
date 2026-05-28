import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware.js';
import usersRoutes from './routes/users.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import ticketsRoutes from './routes/tickets.routes.js';
import adminRoutes from './routes/admin.routes.js';
import userController from './controllers/user.controller.js';
import orderController from './controllers/order.controller.js';
import ticketController from './controllers/ticket.controller.js';

const app = express();

app.use(express.json());


// Public API (with optional auth)
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/tickets', ticketsRoutes);

// Protected API (requires API key)
app.use('/admin', authMiddleware, adminRoutes);

// Resource-specific controllers
app.use('/users', userController);
app.use('/orders', orderController);
app.use('/tickets', ticketController);

export default app;