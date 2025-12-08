import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import Topic from './Topic.js';
import { sequelize } from '../../db';

interface CommentAttributes {
  id: number;
  content: string;
  authorId: number;
  authorLogin: string;
  topicId: number;
  parentCommentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes
  extends Optional<CommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;

  public content!: string;

  public authorId!: number;

  public authorLogin!: string;

  public topicId!: number;

  public parentCommentId?: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id',
    },
    authorLogin: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'author_login',
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'topic_id',
      references: {
        model: Topic,
        key: 'id',
      },
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'parent_comment_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
  }
);

Comment.belongsTo(Topic, { foreignKey: 'topicId' });
Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parent' });

export default Comment;
