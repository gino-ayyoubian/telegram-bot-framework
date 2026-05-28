import { Router } from 'express';
import { pool } from '../../db/pool.js';


const router = Router();

// Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
  if (!result.rows[0]) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const user = result.rows[0];
  res.json({
    id: user.id,
    telegramId: user.telegram_id,
    fullName: user.full_name,
    username: user.username,
    role: user.role,
    status: user.status,
    createdAt: user.created_at
  });
});

// Update user profile
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, phone } = req.body;
  
  const result = await pool.query(
    `UPDATE users SET 
      full_name = COALESCE($2, full_name),
      phone = COALESCE($3, phone),
      updated_at = now()
     WHERE id = $1 RETURNING *`,
    [id, fullName ?? null, phone ?? null]
  );
  
  res.json(result.rows[0]);
});

// Get user's orders
router.get('/:id/orders', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [id]
  );
  res.json({ items: result.rows });
});

// Get user's tickets
router.get('/:id/tickets', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC',
    [id]
  );
  res.json({ items: result.rows });
});

export default router;