import express from 'express';
import { subscribeVip, getSubscribers } from '../controllers/vipController.js';

const router = express.Router();

router.route('/subscribe')
  .post(subscribeVip);

router.route('/subscribers')
  .get(getSubscribers);

export default router;
