import { Router } from 'express';

import { addReaction, getCommentReactions,getTopicReactions } from '../controllers/reactionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/reactions', authMiddleware, addReaction);
router.get('/topics/:topicId/reactions', getTopicReactions);
router.get('/comments/:commentId/reactions', getCommentReactions);

export default router;

