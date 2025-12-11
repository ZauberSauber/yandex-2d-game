import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

import sequelize from '../config/database.js';

interface TopicAttributes {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorLogin: string;
  category?: string;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TopicCreationAttributes
  extends Optional<TopicAttributes, 'id' | 'views' | 'createdAt' | 'updatedAt'> {}

class Topic extends Model<TopicAttributes, TopicCreationAttributes> implements TopicAttributes {
  public id!: number;

  public title!: string;

  public content!: string;

  public authorId!: number;

  public authorLogin!: string;

  public category?: string;

  public views!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'topics',
    timestamps: true,
  }
);

export default Topic;
