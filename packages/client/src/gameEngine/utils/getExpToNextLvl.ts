import type { IExpMathConfig } from '../types';

type IGetExpToNextLvl = (value: { lvl: number; currentExp: number } & Partial<IExpMathConfig>) => {
  expToNextLvl: number;
  expToPercentages: number;
};

export const getExpToNextLvl: IGetExpToNextLvl = ({
  lvl,
  currentExp,
  multiplier = 50,
  pow = 2,
  sum = 100,
}) => {
  // Опыт_для_уровня = A * (Уровень ^ B) + C; A=50, B=2, C=100
  const expToNextLvl = multiplier * Math.pow(lvl, pow) + sum;
  const expToPercentages = Math.round((currentExp / expToNextLvl) * 100);

  return { expToNextLvl, expToPercentages };
};
