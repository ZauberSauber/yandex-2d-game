import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import Topic from './Topic.js';
import Comment from './Comment.js';
import { sequelize } from '../../db';

interface ReactionAttributes {
  id: number;
  emoji: string;
  userId: number;
  topicId?: number;
  commentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReactionCreationAttributes
  extends Optional<ReactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Reaction
  extends Model<ReactionAttributes, ReactionCreationAttributes>
  implements ReactionAttributes
{
  public id!: number;

  public emoji!: string;

  public userId!: number;

  public topicId?: number;

  public commentId?: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'topic_id',
      references: {
        model: Topic,
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'comment_id',
      references: {
        model: Comment,
        key: 'id',
      },
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
    tableName: 'reactions',
    timestamps: true,
    indexes: [
      {
        fields: ['user_id', 'topic_id', 'emoji'],
        name: 'reactions_user_topic_emoji_idx',
      },
      {
        fields: ['user_id', 'comment_id', 'emoji'],
        name: 'reactions_user_comment_emoji_idx',
      },
    ],
  }
);

Reaction.belongsTo(Topic, { foreignKey: 'topicId' });
Reaction.belongsTo(Comment, { foreignKey: 'commentId' });

export default Reaction;
