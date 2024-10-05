import { css } from "styled-components";
import { Interpolation, RuleSet, Styles } from "styled-components/dist/types";

const devices = {
  small: "600px",
  medium: "760px",
  large: "1000px",
  xlarge: "1200px",
};
export type Devices = keyof typeof devices;

type Media = Record<
  Devices,
  (
    styles: Styles<object>,
    ...interpolations: Interpolation<object>[]
  ) => RuleSet<object>
>;

const deviceKeys = Object.keys(devices) as Devices[];

export const media: Media = deviceKeys.reduce(
  (media, breakpoint) => {
    media[breakpoint] = (
      styles: Styles<object>,
      ...interpolations: Interpolation<object>[]
    ) => css`
      @media (max-width: ${devices[breakpoint]}) {
        ${css(styles, ...interpolations)};
      }
    `;
    return media;
  },
  <Media>{},
);
