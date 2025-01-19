import styled from "styled-components";

type FieldAddProps = {
  canAdd: boolean;  
}

type FieldRemoveProps = {
  canRemove: boolean;
}

export const MultifieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const MultifieldItemContainer = styled.div`
  display: flex;
  gap: 7px;
`
export const FieldDrag = styled.span`
  display: flex;
  align-items: center;
  cursor: n-resize;
`

export const FieldRemove = styled.span<FieldRemoveProps>`
  display: flex;
  align-items: center;
  cursor: ${({canRemove}) => canRemove ? 'pointer' : 'not-allowed'};

  & .wm-icon:hover {
    background: darkred;
  }
`

export const FieldAdd = styled.span<FieldAddProps>`
  width: fit-content;
  color: #80868e;
  border-bottom: 1px dotted #cbced2;
  margin-bottom: 5px;
  cursor: ${({canAdd}) => canAdd ? 'pointer' : 'not-allowed'};
  transition: all 220ms ease;

  &:hover {
    color: #3e3e3e;
    border-bottom-color: #80868e;
  }
`

export const ComboContainer = styled.div`
  display: flex;
  width: 100%;

  & > :nth-child(2) {
    margin-left: 12px;
    flex-shrink: 2.5;
  }
`
