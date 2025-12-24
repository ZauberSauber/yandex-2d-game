import { Sequelize } from 'sequelize';
import type { Request, Response } from 'express';

import { Comment, Topic } from '../models/index.js';

export const getTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({
      order: [['createdAt', 'DESC']],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentCount']],
      },
      include: [
        {
          model: Comment,
          attributes: [], // не возвращать комментарии, только подсчитать
          required: false,
          as: 'Comments',
        },
      ],
      group: ['Topic.id'],
    });

    res.status(200).json(topics);
  } catch (error) {
    console.error('Ошибка при получении топиков:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении топиков' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Не передан id топика' });
    return;
  }

  try {
    const topic = await Topic.findOne({
      where: { id },
    });

    if (!topic) {
      res.status(404).json({ error: 'Топик не найден' });
      return;
    }

    const comments = await Comment.findAll({
      where: { topicId: id },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Comment,
          as: 'replies',
          separate: true,
        },
      ],
    });

    await topic.increment('views');

    const response = {
      ...topic.toJSON(),
      replies: comments,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Ошибка при получении топика:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении топика' });
  }
};

export const createTopic = async (req: Request, res: Response) => {
  const { title, content, authorId, authorLogin, category } = req.body;

  if (!title || !content || !authorId || !authorLogin) {
    res.status(400).json({ error: 'Поля title, content, authorId и authorLogin обязательны' });
    return;
  }

  try {
    const newTopic = await Topic.create({
      title,
      content,
      authorId,
      authorLogin,
      category,
    });
    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Ошибка при создании топика:', error);
    res.status(500).json({ error: 'Ошибка сервера при создании топика' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { content, topicId, authorId, authorLogin } = req.body;

  try {
    const newComment = await Comment.create({
      content,
      authorId,
      authorLogin,
      topicId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Ошибка при создании комментария:', error);
    res.status(500).json({ error: 'Ошибка сервера при создании комментария' });
  }
};
