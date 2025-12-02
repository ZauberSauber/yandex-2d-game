import type { TRequestResult } from '@src/utils/api/api';

import { API } from '@src/utils';

import { TEAM_NAME } from './types';
import type {
  GetLeaderboardRequest,
  LeaderboardNewLeaderRequest,
  LeaderboardResponse,
} from './types';

export const leaderboardApi = {
  setLeaderboard: (data: LeaderboardNewLeaderRequest): Promise<TRequestResult<void>> =>
    API.post<LeaderboardNewLeaderRequest, void>('/leaderboard')(data),

  getLeaderboardTeam: (data: GetLeaderboardRequest): Promise<TRequestResult<LeaderboardResponse>> =>
    API.post<GetLeaderboardRequest, LeaderboardResponse>(`/leaderboard/${TEAM_NAME}`)(data),
};
