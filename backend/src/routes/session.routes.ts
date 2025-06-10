import { deleteSessionHandler, getSessionHandler } from '#controllers/session.controller.js';
import { Router } from 'express';

const sessionRoutes = Router();

// prefix: /sessions
sessionRoutes.get('/', getSessionHandler);
sessionRoutes.delete('/:sessionId', deleteSessionHandler);

export default sessionRoutes;
