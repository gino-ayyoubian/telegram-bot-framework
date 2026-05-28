import { Router } from 'express';
import { requireRole } from '../middlewares/rbac.middleware.js';

const router = Router();

router.get('/', requireRole('admin', 'superadmin'), async (req, res) => {
  res.json({ items: [] });
});

router.post('/:id/block', requireRole('admin', 'superadmin'), async (req, res) => {
  res.json({ success: true });
});

export default router;