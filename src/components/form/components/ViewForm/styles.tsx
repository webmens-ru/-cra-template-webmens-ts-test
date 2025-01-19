import styled from "styled-components";

type FieldTextProps = {
  hasValue: boolean;
}

export const ViewFieldText = styled.span<FieldTextProps>`
  opacity: ${({ hasValue }) => hasValue ? '.8' : '.5'};
  color: ${({ hasValue }) => hasValue ? '#000' : '#424956'};

  &:hover {
    opacity: 1;
  }
`

export const ViewFieldLink = styled.a<FieldTextProps>`
  opacity: ${({ hasValue }) => hasValue ? '.8' : '.5'};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export const ViewFieldList = styled.ul`
  list-style: initial;
  margin-left: 13px;

  li {
    line-height: 1.25rem;
  }
`

export const ViewRichText = styled.div`
  ul {
    list-style: initial;
    margin: 5px 0 5px 13px;
  }

  ol {
    list-style: decimal;
    margin: 5px 0 5px 15px;
  }

  li {
    line-height: 1.25rem;
  }
`
