import { FontSize } from "@type/common";

interface FontData {
  name: string;
  fileName: string;
  weight?: number;
  style: string;
}

export const getFont = (
  { name, fileName, style, weight }: FontData,
  pathPrefix = "",
) => {
  return `@font-face {
    font-family: '${name}';
    src: 
      url(${pathPrefix + fileName}.woff2) format('woff2'),
      url(${pathPrefix + fileName}.woff) format('woff');
    font-weight: ${weight};
    font-style: ${style};
}`;
};

export const fonts: FontData[] = [
  {
    name: "Montserrat",
    fileName: "Montserrat",
    style: "normal",
  },
];

export const fontWeightsDict: Record<FontSize, number> = {
  small: 400,
  default: 400,
  // TODO linar check weight
  big: 400,
  title: 600,
  subheader: 600,
  header: 600,
  heroMedium: 600,
  heroLarge: 600,
};

export const lineHeightDict = {
  small: "20px",
  default: "24px",
  big: "18px",
  subtitle: "28px",
  title: "32px",
  subheader: "36px",
  header: "44px",
  heroMedium: "56px",
  heroLarge: "64px",
};

export const fontDict: Record<FontSize, string> = {
  small: "12px",
  default: "14px",
  big: "16px",
  title: "18px",
  subheader: "24px",
  header: "32px",
  heroMedium: "40px",
  heroLarge: "48px",
};

export const getFontSizes = (size: FontSize) => {
  return `
    font-size: ${fontDict[size]};
    line-height: ${lineHeightDict[size]};
    font-weight: ${fontWeightsDict[size]};
  `;
};
