import express from 'express';
import { testPostController } from '../controllers/testController.js';
import userAuth from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// test route
router.post('/test-post', userAuth, testPostController)

// export router
export default router;