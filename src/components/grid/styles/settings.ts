import styled from "styled-components";

export const ColumnsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 12px;
  row-gap: 5px;
  width: 100%;
  padding: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ColumnsListItem = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  min-height: 34px;
  width: 100%;
  padding: 5px;
  background: ${({ selected }) => selected ? "#b3eafc" : "#fff"};
  transition: 220ms;
  cursor: pointer;

  &:hover {
    background: #b3eafc;
  }
`

export const ColumnsListItemTitle = styled.span`
  color: rgb(82, 92, 105);
  padding-left: 7px;
`

export const FooterInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'actions' 'buttons' 'togglers';
`

export const ActionsContainer = styled.div`
  grid-area: 'actions';
  display: flex;
  justify-content: start;
`

export const ButtonsContainer = styled.div`
  grid-area: 'buttons';
  display: flex;
  justify-content: center;
  gap: 10px;
`

export const TogglersContainer = styled.div`
  grid-area: 'togglers';
  display: flex;
  justify-content: end;
`
