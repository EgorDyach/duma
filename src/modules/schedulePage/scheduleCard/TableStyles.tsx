import styled from 'styled-components';

export const ScheduleCardRow = styled.tr`
  &:nth-of-type(0) {
    border-top-right-radius: 10px !important;
  }
  &:last-of-type {
    border-bottom-right-radius: 10px;
  }
`;

export const ScheduleCardCell = styled.td`
  padding: 9px 10px;
  height: 60px;
  border: 0.5px #8d8d8d solid;
  width: fit-content;
  min-width: 0;
`;
