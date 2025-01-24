import { Indent } from '@type/common';

export type RadiusSizes = keyof typeof radius;

export const radius = {
  medium: '4px',
  large: '8px',
  xmedium: '10px',
  xLarge: '12px',
  circle: '50%',
};

export const indent: Record<Indent, string> = {
  none: '0',
  xsmall: '4px',
  small: '8px',
  xmedium: '14px',
  medium: '16px',
  large: '24px',
  xlarge: '32px',
  xxlarge: '40px',
  vlarge: '48px',
};

export type FontSize =
  | 'small'
  | 'default'
  | 'big'
  | 'title'
  | 'subheader'
  | 'header'
  | 'heroMedium'
  | 'heroLarge';
