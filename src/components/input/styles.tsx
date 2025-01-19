import styled from "styled-components";

type InputContainerProps = {
  readonly?: boolean;
  focus?: boolean;
  width?: string;
}

export const InputContainer = styled.div`
  font-family: 'Open Sans';
  display: flex;
  border: 1px solid transparent;
  border-radius: 4px;
  height: 40px;
  font-size: 14px;
  width: ${({ width }: InputContainerProps) => width ? width : '100%'};
  transition: all 220ms linear;

  background: ${({ readonly }: InputContainerProps) => readonly ? '#f4f4f4' : '#fff'};
  cursor: ${({ readonly, focus }: InputContainerProps) => readonly ? 'not-allowed' : focus ? 'text' : 'default'};
  border-color: ${({ readonly, focus }: InputContainerProps) => readonly ? '#c6cdd3' : focus ? '#66afe9' : 'rgba(83, 92, 105, 0.2)'};

  &:hover {
    border-color: #66afe9;
    cursor: text;
  }

  & > input {
    width: 100%;
    position: relative;
    background: inherit;
    cursor: inherit;
    padding: 0 11px;
    color: #535c69;
    outline: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
`

export const PrefixIconContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 0 8px;
  height: 60%;
  border-right: 1px solid rgba(221,224,232,.54);

  &:hover {
    cursor: default;
  }
`

export const PostfixIconContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding-right: 8px;
`