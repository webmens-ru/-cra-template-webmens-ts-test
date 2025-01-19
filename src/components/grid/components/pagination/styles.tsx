import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
`

export const PaginationItem = styled.span<{ active?: boolean, noBorder?: boolean }>`
  padding: 0 6px;
  font-family: 'Open Sans';
  font-size: 11px;
  border-right: ${({ noBorder }) => noBorder ? "none" : "1px solid #cdcdcd"};
  color: ${({ active }) => active ? "#5c6470" : "#2067b0"};
  cursor: ${({ active }) => active ? "default" : "pointer"};
  text-transform: uppercase;
  user-select: none;


  &:last-of-type {
    border-right: none;
  }
`
