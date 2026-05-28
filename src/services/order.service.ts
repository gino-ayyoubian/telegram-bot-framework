import { pool } from '../db/pool.js';

export interface Order {
  id: string;
  user_id: string;
  service_id: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
}

export class OrderService {
  async create(userId: string, serviceId: string, amount: number): Promise<Order> {
    const res = await pool.query(
      `INSERT INTO orders (user_id, service_id, amount, status) VALUES ($1, $2, $3, 'pending') RETURNING *`,
      [userId, serviceId, amount]
    );
    return res.rows[0];
  }

  async findByUser(userId: string): Promise<Order[]> {
    const res = await pool.query(`SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
    return res.rows;
  }

  async updateStatus(orderId: string, status: string): Promise<Order> {
    const res = await pool.query(
      `UPDATE orders SET status = $2, updated_at = now() WHERE id = $1 RETURNING *`,
      [orderId, status]
    );
    return res.rows[0];
  }
}

export const orderService = new OrderService();