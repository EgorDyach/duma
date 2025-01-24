export const boxShadow = {
  focused: '0 0 0 1px rgba(255, 255, 255, 1), 0 0 0 3px rgba(103, 146, 244, 1)',
};

export type ContentColors = keyof typeof content;

export const content = {
  primary: '#641AEE',
  secondary: '#555F6D',
  tertiary: '#7E8C9A',
  error: '#C53434',
  white: '#FFFFFF',
  link: '#3062D4',
  hoveredLink: '#1E50C0',
  activeLink: '#1E50C0',
  focusedLink: '#113997',
  danger: '#D90D00',
};

export const border = {
  default: '#EAEDF0',
  secondary: '#CFD6DD',
  transparent: 'transparent',
  hoveredSelect: '#6792F4',
  error: '#F26464',
};

export type BackgroundColors = keyof typeof background;

export const background = {
  primary: '#FFF',
  secondary: '#F5F7F9',
  orange: '#FFE8D1',
  blue: '#3062D4',
  backdrop: '#19273ABD',
  gray: '#555F6D',
  grayHover: '#10284817',
};

// TODO move/remove?!
export const button = {
  primaryBg: '#C9C9C9',
  primaryBgHover: '#1e50c0',
  primaryBgActive: '#113997',
  secondary: '#4A545E',
  secondaryHover: '#9EA8B3',
  secondaryTextHover: '#3A424A',
  secondaryTextActive: '#272E35',
  secondaryActive: '#7E8C9A',
  bonusButtonBg: '#F59638',
  bonusButtonBgActive: '#B4610E',
  bonusButtonBgFocused: '#A05C1C',
  bonusButtonBgHover: '#E0852B',
};

export const tag = {
  normal: '#F0F3F5',
  hover: '#EAEDF0',
  active: '#CFD6DD',
};

export const tabs = {
  defaultActive: '#3062D4',
  defaultDisabled: '#00000040',
  defaultHover: '#3062d4bf',
  defaultActiveDisabled: '#3062d440',
  ghostActive: '#3A424A',
  ghostBg: '#022F520F',
  ghostDisabled: '#4a545e80',
};

export const bonuses = {
  credit: '#1D7C4D',
};

export const lessons = {
  dropdownBg: '#F5F8FF',
};
