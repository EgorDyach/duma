import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const StyledHeaderCell = styled.th`
  color: #fff;
  background-color: #641aee;
  padding: 10px;
  &:first-of-type {
    border-top-left-radius: 10px;
  }
  &:last-of-type {
    border-top-right-radius: 10px;
  }
`;

export const StyledCell = styled.td`
  padding: 10px;
  text-align: center;
`;

export const StyledRow = styled.tr`
  background-color: #f5eefe;
  &:nth-of-type(even) {
    background-color: #eadafe;
  }
`;
