import { DataTypes } from 'sequelize';
import type { QueryInterface } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('themes', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    value: { type: DataTypes.JSONB, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('themes');
};
