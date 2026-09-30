import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getPricingTiers,
  getTestimonials
} from '../controllers/productController.js';

const router = express.Router();

router.get('/meta/categories', getCategories);
router.get('/meta/pricing-tiers', getPricingTiers);
router.get('/meta/testimonials', getTestimonials);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
