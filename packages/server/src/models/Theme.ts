import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database.js';

export enum ThemesId {
  Dark = 1,
  Light = 2,
}

export interface ITheme {
  id: ThemesId;
  value?: string | null; // Доп. параметры темы для хранения в бд
  description?: string | null;
}

class Theme extends Model<ITheme> implements ITheme {
  id!: ThemesId;

  value?: string;

  description?: string;
}

Theme.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    value: { type: DataTypes.JSONB, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'themes' }
);

Theme.addHook('afterSync', async () => {
  const count = await Theme.count();
  if (count === 0) {
    await Theme.bulkCreate([
      { id: ThemesId.Dark, value: null, description: 'Тёмная тема' },
      { id: ThemesId.Light, value: null, description: 'Светлая тема' },
    ]);
  }
});

export default Theme;
