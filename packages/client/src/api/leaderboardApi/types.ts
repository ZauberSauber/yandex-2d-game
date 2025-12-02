export const TEAM_NAME = 'DisplayFlexers';
export const RATING_FIELD_NAME = 'DisplayFlexersLevel';
export const LIMIT_ON_PAGE = 10;

export enum ConstantsLeaderboard {
  teamName = TEAM_NAME,
  raitingFieldName = RATING_FIELD_NAME,
}

export type DataLeaderBoard = {
  displayName: string;
  [ConstantsLeaderboard.raitingFieldName]: number;
};

export type LeaderboardNewLeaderRequest = {
  data: DataLeaderBoard;
  ratingFieldName: ConstantsLeaderboard.raitingFieldName;
  teamName: ConstantsLeaderboard.teamName;
};

export type LeaderboardResponse = Array<{
  data: DataLeaderBoard;
}>;

export type GetLeaderboardRequest = {
  ratingFieldName: ConstantsLeaderboard.raitingFieldName;
  cursor: number;
  limit: number;
};

export type DataTypeTable = DataLeaderBoard & {
  key: number;
};
