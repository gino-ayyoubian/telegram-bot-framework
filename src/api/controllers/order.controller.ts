import { Router } from 'express';
import { pool } from '../../db/pool.js';

const router = Router();

// Get all orders (with filters)
router.get('/', async (req, res) => {
  const { status, userId, limit = 50, offset = 0 } = req.query;
  
  let query = 'SELECT o.*, u.full_name as user_name FROM orders o JOIN users u ON o.user_id = u.id WHERE 1=1';
  const params: any[] = [];
  let paramIndex = 1;
  
  if (status) {
    query += ` AND o.status = $${paramIndex++}`;
    params.push(status);
  }
  if (userId) {
    query += ` AND o.user_id = $${paramIndex++}`;
    params.push(userId);
  }
  
  query += ` ORDER BY o.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(Number(limit), Number(offset));
  
  const result = await pool.query(query, params);
  res.json({ items: result.rows });
});

// Get single order
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  
  if (!result.rows[0]) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(result.rows[0]);
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const result = await pool.query(
    `UPDATE orders SET status = $2, updated_at = now() WHERE id = $1 RETURNING *`,
    [id, status]
  );
  
  res.json(result.rows[0]);
});

// Get order payments
router.get('/:id/payments', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC',
    [id]
  );
  res.json({ items: result.rows });
});

export default router;