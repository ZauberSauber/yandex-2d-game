export enum ThemesId {
  Dark = 1,
  Light = 2,
}

export interface ITheme {
  id: ThemesId;
  value?: string | null;
  description?: string | null;
}
