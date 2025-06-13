import styled from 'styled-components';

export const ScheduleCardRow = styled.tr`
  border: 0.5px #8d8d8d solid;
  border-right: none;
  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border-bottom: none;
  }
`;

export const ScheduleCardCell = styled.td`
  padding: 9px 10px;
  height: 60px;
  border: inherit;
  width: fit-content;
  min-width: 0;
`;
