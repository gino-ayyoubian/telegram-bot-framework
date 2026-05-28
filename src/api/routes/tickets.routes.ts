import { Router } from 'express';
import { requireRole } from '../middlewares/rbac.middleware.js';

const router = Router();

router.get('/', requireRole('agent', 'admin', 'superadmin'), async (req, res) => {
  res.json({ items: [] });
});

router.patch('/:id/status', requireRole('agent', 'admin', 'superadmin'), async (req, res) => {
  res.json({ success: true });
});

router.post('/:id/reply', requireRole('agent', 'admin', 'superadmin'), async (req, res) => {
  res.json({ success: true });
});

export default router;