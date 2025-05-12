import { Router } from 'express';
import paymentController from '../controllers/paymentController.js';

const router = Router();

export default () => {
  router.post('/', paymentController.processPayment);

  return router;
}