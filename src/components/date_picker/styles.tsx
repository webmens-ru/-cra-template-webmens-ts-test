import styled from "styled-components";

type DatePickerContainerProps = {
    width?: string;
}

export const DatePickerContainer = styled.div`
  position: relative;
  width: ${({width}: DatePickerContainerProps) => width ? width : '100%'};
  background: '#fff';
`;
