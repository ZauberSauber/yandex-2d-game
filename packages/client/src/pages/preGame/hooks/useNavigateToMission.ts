import { useNavigate } from 'react-router';

import { PATHS } from '@src/routes/constants';

import { PLAYER_INFO } from '../constants';

export const useNavigateToMission = () => {
  const navigate = useNavigate();
  return () => navigate(PATHS.GAME, { state: PLAYER_INFO });
};
