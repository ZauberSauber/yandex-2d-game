import colors from "./colors.module.scss";

type Colors = {
  colorNeonBlue: string;
  colorNeonPink: string;
  colorNeonPurple: string;
  colorNeonCyan: string;
  colorDarkBg: string;
}

export const StyleColors = colors as unknown as Colors;
