import connectDB from '#config/db.js';
import { APP_ORIGIN, NODE_ENV, PORT } from '#constants/env.js';
import { OK } from '#constants/http.js';
import authenticate from '#middlewares/authenticate.js';
import errorHandler from '#middlewares/errorHandler.js';
import authRoutes from '#routes/auth.routes.js';
import sessionRoutes from '#routes/session.routes.js';
import userRoutes from '#routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

/**
 *
 * Express middlewares config
 *
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: APP_ORIGIN,
  }),
);
app.use(cookieParser());

/**
 *
 * App Routes
 *
 */
// Health Route
app.get('/health', (req, res) => {
  res.status(OK).json({ status: 'healthy' });
  return;
});
// Auth Routes
app.use('/auth', authRoutes);
// Protected Routes
app.use('/user', authenticate, userRoutes);
app.use('/sessions', authenticate, sessionRoutes);

/**
 *
 * App Error Handler
 *
 */
app.use(errorHandler);

/**
 *
 * App initialization
 *
 */
console.log(`Connecting to DB...`);
await connectDB();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${NODE_ENV} environment.`);
});
