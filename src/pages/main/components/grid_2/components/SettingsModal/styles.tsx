import styled from "styled-components";

export const SettingsModalBackdrop = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: #333;
  opacity: .5;
  z-index: 100;
`

export const SettingsModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-height: 90vh;
  max-width: 90vw;
  background: #fff;
  font-family: "Open Sans";
  font-size: 14px;
  opacity: 1;
  z-index: 110;
`

export const SettingsModalInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
  padding: 10px;
`

export const HeaderModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f2f2f2;
`

export const HeaderCancelButton = styled.span`
  transform: rotate(-45deg);
  color: rgb(82, 92, 105);
  font-size: 24px;
  opacity: .5;
  transition: all 220ms ease;
  cursor: pointer;

  &:after {
    content: "+";
  }

  &:hover {
    opacity: 1;
  }
`

export const BodyModalContainer = styled.div`
  overflow: auto;
`

export const FooterModalContainer = styled.div`
`

export const ColumnsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 12px;
  row-gap: 5px;
  width: 100%;
`

export const ColumnsListItem = styled.div<{ selected: boolean }>`
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
