import styled from "styled-components";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  & > input[type="checkbox"] {
    align-self: self-start;
  }
`

export const FieldLabelContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`

export const FieldLabel = styled.label`
  font-size: 14px;
  color: #525c69;
`

export const FieldLabelSuffix = styled.span`
  opacity: .5;
  margin-left: 3px;
`

export const ValidateMessage = styled.span`
  padding: 10px;
  width: inherit;
  display: flex;
  background: rgb(250, 229, 232);
  color: rgb(208, 1, 27);
  font-weight: 400;
`