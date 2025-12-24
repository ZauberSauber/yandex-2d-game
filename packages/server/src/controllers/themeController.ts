import type { Request, Response } from 'express';

import { Theme, User } from '../models/index.js';
import { ThemesId } from '../models/Theme.js';
import type { ITheme } from '../models/Theme.js';
import type { IUser } from '../models/User';

export const getTheme = async (req: Request<IUser>, res: Response<ITheme | { reason: string }>) => {
  try {
    const user = req.body;

    if (!user.id) {
      res.status(400).send({ reason: 'User is required' });
      return;
    }

    const [foundUser] = await User.findOrCreate({
      where: { id: user.id },
      defaults: { ...user, theme_id: ThemesId.Dark },
    });

    const theme = await Theme.findOne({ where: { id: foundUser.theme_id } });
    if (!!theme) {
      res.status(200).json(theme);
    } else {
      res.status(400).send({ reason: 'Not found' });
    }
  } catch (error) {
    console.error('theme/get', error);
    res.status(401).send({ reason: `${error}` });
    return;
  }
};

export const saveTheme = async (
  req: Request<{ theme: ITheme; user: IUser }>,
  res: Response<{ reason: string }>
) => {
  const theme = req.body.theme as ITheme;
  const user = req.body.user as IUser;

  if (!user.id) {
    res.status(400).send({ reason: 'User is required' });
    return;
  }
  if (theme.id < 0) {
    res.status(400).send({ reason: 'Theme is required' });
    return;
  }

  try {
    const [foundUser, created] = await User.findOrCreate({
      where: { id: user.id },
      defaults: { ...user, theme_id: theme.id },
    });

    if (!created) {
      await User.update({ theme_id: theme.id }, { where: { id: user.id } });
    }

    if (!!foundUser) {
      res.status(200).send();
    } else {
      res.status(400).send({ reason: 'Not found' });
    }
  } catch (error) {
    console.error('theme/save', error);
    res.status(401).send({ reason: `${error}` });
    return;
  }
};
