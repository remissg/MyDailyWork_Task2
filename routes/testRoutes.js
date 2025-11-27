import express from 'express';
import { testPostController } from '../controllers/testController.js';

// router object
const router = express.Router();

// test route
router.post('/test-post', testPostController)

// export router
export default router;