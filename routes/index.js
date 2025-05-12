import { Router } from 'express';
import products from './products.js';
import payment from './payment.js';
import orders from './orders.js';

const router = Router();

export default () => {
  router.use('/products', products())
  router.use('/payment', payment())
  router.use('/orders', orders())

  return router;
}