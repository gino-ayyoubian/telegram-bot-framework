import express from 'express';
import userRoutes from './routes/users.routes';
import orderRoutes from './routes/orders.routes';
import ticketRoutes from './routes/tickets.routes';
import adminRoutes from './routes/admin.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { rbacMiddleware } from './middlewares/rbac.middleware';

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/tickets', authMiddleware, ticketRoutes);
app.use('/api/admin', authMiddleware, rbacMiddleware('admin'), adminRoutes);

export default app;
