import Flex from '@components/Flex';
import { Text } from '@components/Typography';
import { withIndentStyles } from '@hocs/withIndentStyles';
import { content } from '@lib/theme/colors';
import styled from 'styled-components';

export const StyledInput = withIndentStyles(styled.input`
  color: #333;
  padding: 12px 15px;
  border-radius: 6px;
  background-color: rgba(240, 240, 247, 1);
  border: 1px solid rgba(210, 210, 210, 1);
  outline: none;
  font-size: 16px;
  width: 100%;
  &::placeholder {
    color: #aaa;
  }
  &:disabled {
    color: #999;
  }
`);

export const StyledLabel = styled(Text)`
  color: balck;
  font-size: 18px;
`;

export const ErrorText = styled(Text)`
  color: ${content.danger};
  font-size: 10px;
`;

export const labelWrapper = { marginTop: 5, marginBottom: 5 };

export const InputWrapper = styled(Flex)`
  position: absolute;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${content.tertiary};
  border-radius: 10px;
  z-index: -1;
`;

export const SuffixWrapper = styled(Flex)`
  position: absolute;
  right: 15px;
  left: auto;
`;
