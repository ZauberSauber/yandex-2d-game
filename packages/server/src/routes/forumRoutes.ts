import { Router } from 'express';

import {
  createComment,
  createTopic,
  getTopicById,
  getTopics,
} from '../controllers/forumController.js';

const router = Router();

router.get('/topics', getTopics);
router.put('/topics', createTopic);
router.get('/topics/:id', getTopicById);
router.put('/comment/:id', createComment);

export default router;
