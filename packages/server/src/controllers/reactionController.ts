import type { Request, Response } from 'express';
import { Reaction, Topic, Comment } from '../models/index.js';

interface AuthRequest extends Request {
  userId?: number;
  userLogin?: string;
}

export const addReaction = async (req: AuthRequest, res: Response) => {
  try {
    const { emoji, topicId, commentId } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!emoji) {
      return res.status(400).json({ error: 'Emoji is required' });
    }

    if (!topicId && !commentId) {
      return res.status(400).json({ error: 'Either topicId or commentId is required' });
    }

    if (topicId && commentId) {
      return res.status(400).json({ error: 'Cannot react to both topic and comment' });
    }

    if (topicId) {
      const topic = await Topic.findByPk(topicId);
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
    }

    if (commentId) {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
    }

    const whereClause: Record<string, unknown> = {
      userId,
      emoji,
    };

    if (topicId) {
      whereClause.topicId = topicId;
      whereClause.commentId = null;
    } else if (commentId) {
      whereClause.commentId = commentId;
      whereClause.topicId = null;
    }

    const existingReaction = await Reaction.findOne({ where: whereClause as never });

    if (existingReaction) {
      await existingReaction.destroy();
      return res.json({ message: 'Reaction removed', reaction: null });
    }

    const newReaction = await Reaction.create({
      emoji,
      userId: userId as number,
      ...(topicId ? { topicId } : {}),
      ...(commentId ? { commentId } : {}),
    });

    return res.json({ message: 'Reaction added', reaction: newReaction });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTopicReactions = async (req: Request, res: Response) => {
  try {
    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({ error: 'Topic ID is required' });
    }

    const reactions = await Reaction.findAll({
      where: {
        topicId: parseInt(topicId),
      },
      attributes: ['emoji', 'userId'],
    });

    const groupedReactions = reactions.reduce((acc: Record<string, number[]>, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = [];
      }
      acc[reaction.emoji].push(reaction.userId);
      return acc;
    }, {});

    const result = Object.entries(groupedReactions).map(([emoji, userIds]) => ({
      emoji,
      count: userIds.length,
      userIds,
    }));

    return res.json({ reactions: result });
  } catch (error) {
    console.error('Error getting topic reactions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCommentReactions = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID is required' });
    }

    const reactions = await Reaction.findAll({
      where: {
        commentId: parseInt(commentId),
      },
      attributes: ['emoji', 'userId'],
    });

    const groupedReactions = reactions.reduce((acc: Record<string, number[]>, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = [];
      }
      acc[reaction.emoji].push(reaction.userId);
      return acc;
    }, {});

    const result = Object.entries(groupedReactions).map(([emoji, userIds]) => ({
      emoji,
      count: userIds.length,
      userIds,
    }));

    return res.json({ reactions: result });
  } catch (error) {
    console.error('Error getting comment reactions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

