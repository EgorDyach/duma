import styled from 'styled-components';
import { withIndentStyles } from '@hocs/withIndentStyles';
import { Indent } from '@type/common';

export interface FlexProps {
  direction?: string;
  wrap?: string;
  align?: string;
  justify?: string;
  gap?: string;
  flex?: string;
  grow?: string;
  shrink?: string;
  top?: Indent;
  left?: Indent;
  basis?: string;
}

const FlexRaw = styled.div<FlexProps>(
  ({ direction, wrap, align, justify, gap, flex, grow, shrink, basis }) => `
  display: flex;
  ${direction ? `flex-direction: ${direction};` : ''}
  ${wrap ? `flex-wrap: ${wrap};` : ''}
  ${align ? `align-items: ${align};` : ''}
  ${justify ? `justify-content: ${justify};` : ''}
  ${gap ? `gap: ${gap};` : ''}
  ${flex ? `flex: ${flex};` : ''}
  ${grow ? `flex-grow: ${grow};` : ''}
  ${shrink ? `flex-shrink: ${shrink};` : ''}
  
  & > * {
    ${basis && `flex-basis: calc(${basis} - ${gap || '0px'}/2)`}
  }
 
`,
);

const Flex = withIndentStyles(FlexRaw);

export default Flex;
