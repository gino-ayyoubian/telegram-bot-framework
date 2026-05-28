import { Router } from 'express';
import { pool } from '../../db/pool.js';

const router = Router();

// Get all tickets (with filters)
router.get('/', async (req, res) => {
  const { status, priority, assignedTo, limit = 50, offset = 0 } = req.query;
  
  let query = `SELECT t.*, u.full_name as user_name, a.full_name as assigned_name 
               FROM tickets t 
               JOIN users u ON t.user_id = u.id
               LEFT JOIN users a ON t.assigned_to = a.id
               WHERE 1=1`;
  const params: any[] = [];
  let paramIndex = 1;
  
  if (status) {
    query += ` AND t.status = $${paramIndex++}`;
    params.push(status);
  }
  if (priority) {
    query += ` AND t.priority = $${paramIndex++}`;
    params.push(priority);
  }
  if (assignedTo) {
    query += ` AND t.assigned_to = $${paramIndex++}`;
    params.push(assignedTo);
  }
  
  query += ` ORDER BY t.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(Number(limit), Number(offset));
  
  const result = await pool.query(query, params);
  res.json({ items: result.rows });
});

// Get single ticket with messages
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const ticketResult = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
  if (!ticketResult.rows[0]) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  
  const messagesResult = await pool.query(
    'SELECT * FROM ticket_messages WHERE ticket_id = $1 ORDER BY created_at',
    [id]
  );
  
  res.json({
    ...ticketResult.rows[0],
    messages: messagesResult.rows
  });
});

// Update ticket status/priority/assignment
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, priority, assignedTo } = req.body;
  
  const updates: string[] = [];
  const params: any[] = [id];
  let paramIndex = 1;
  
  if (status) {
    updates.push(`status = $${++paramIndex}`);
    params.push(status);
  }
  if (priority) {
    updates.push(`priority = $${++paramIndex}`);
    params.push(priority);
  }
  if (assignedTo !== undefined) {
    updates.push(`assigned_to = $${++paramIndex}`);
    params.push(assignedTo);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }
  
  const query = `UPDATE tickets SET ${updates.join(', ')}, updated_at = now() WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, params);
  
  res.json(result.rows[0]);
});

// Add reply to ticket
router.post('/:id/reply', async (req, res) => {
  const { id } = req.params;
  const { message, senderUserId, senderRole = 'agent' } = req.body;
  
  const result = await pool.query(
    `INSERT INTO ticket_messages (ticket_id, sender_user_id, sender_role, message) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, senderUserId, senderRole, message]
  );
  
  // Update ticket timestamp
  await pool.query('UPDATE tickets SET updated_at = now() WHERE id = $1', [id]);
  
  res.json(result.rows[0]);
});

export default router;