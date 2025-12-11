import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database.js';
import Theme from './Theme.js';
import type { ThemesId } from './Theme.js';

export interface IUser {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  theme_id?: ThemesId | null;
  avatar?: string;
  phone?: string;
  email: string;
}

class User extends Model<IUser> implements IUser {
  id!: number;

  login!: string;

  first_name!: string;

  second_name!: string;

  display_name?: string;

  avatar?: string;

  phone?: string;

  email!: string;

  theme_id?: ThemesId;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    login: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    second_name: { type: DataTypes.STRING },
    display_name: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    theme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'theme_id',
      references: { model: Theme, key: 'id' },
    },
  },
  { sequelize, tableName: 'users' }
);

User.belongsTo(Theme, { foreignKey: 'theme_id' });

export default User;
