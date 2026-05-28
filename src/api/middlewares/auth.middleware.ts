import { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return res.status(401).json({ message: 'API key required' });
  }
  
  if (apiKey !== env.ADMIN_API_KEY) {
    return res.status(403).json({ message: 'Invalid API key' });
  }
  
  // Set minimal user context for RBAC
  (req as any).user = { role: 'admin' };
  next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (apiKey && apiKey === env.ADMIN_API_KEY) {
    (req as any).user = { role: 'admin' };
  }
  next();
}