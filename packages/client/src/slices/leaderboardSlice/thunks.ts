import { createAsyncThunk } from '@reduxjs/toolkit';
import type { DataLeaderBoard, DataTypeTable } from '@src/api/leaderboardApi/types';

import { leaderboardApi } from '@src/api/leaderboardApi';
import { ConstantsLeaderboard, LIMIT_ON_PAGE, TEAM_NAME } from '@src/api/leaderboardApi/types';

export const setLeaderboardThunk = createAsyncThunk(
  '/leaderboard',
  async (data: DataLeaderBoard, { rejectWithValue }) => {
    const result = await leaderboardApi.setLeaderboard({
      data,
      ratingFieldName: ConstantsLeaderboard.raitingFieldName,
      teamName: ConstantsLeaderboard.teamName,
    });

    if (result.error || !result.data) {
      return rejectWithValue('Не удалось отправить результаты игры на сервер');
    }
    return result.data;
  }
);

export const getLeaderboardTeamThunk = createAsyncThunk(
  `/leaderboard/${TEAM_NAME}`,
  async (cursor: number, { rejectWithValue }) => {
    const result = await leaderboardApi.getLeaderboardTeam({
      cursor: cursor,
      limit: LIMIT_ON_PAGE,
      ratingFieldName: ConstantsLeaderboard.raitingFieldName,
    });

    if (result.error || !result.data) {
      return rejectWithValue('Не удалось получить данные о турнирной таблице');
    }

    const dataForTable: DataTypeTable[] = result.data.map(({ data }, index) => ({
      key: index + 1,
      displayName: data.displayName,
      DisplayFlexersLevel: data[ConstantsLeaderboard.raitingFieldName],
    }));

    return dataForTable;
  }
);
