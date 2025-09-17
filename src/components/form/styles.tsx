import styled, { createGlobalStyle } from "styled-components";
import { FormMode, FormViewType } from "./types";

export type FormContainerProps = {
  mode: FormMode;
  viewType: FormViewType;
  width?: string;
  height?: string;
}

export const GlobalStyleForm = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export const FormContainer = styled.div<FormContainerProps>`
  font-family: 'Open Sans', sans-serif;
  background: ${({mode}) => mode === "edit" ? '#ffffff' : '#f9fafb'};
  width: ${({width}) => width || "100%"};
  // height: ${({height}) => height || "100vh"};
  padding: 10px;
  font-size: 14px;
  //margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 10px;

  //overflow: hidden;
`

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8ecee;
`

export const FormTitle = styled.span`
  font-weight: 600;
  font-size: 11px;
  color: #525c69;
  text-transform: uppercase;
`

export const FormModeToggler = styled.span`
  color: #333;
  font-size: 13px;
  border-bottom: 1px dashed transparent;
  text-transform: lowercase;
  transition: all 150ms ease-in;
  cursor: pointer;

  &:hover {
    color: #6a6f75;
    border-color: #6a6f75;
  }
`

export const FormInnerContainer = styled.div<FormContainerProps>`
  font-family: 'Open Sans', sans-serif;
  padding: 15px 10px;
  height: 100%;
  background: ${({mode, viewType}) => mode === "edit" && viewType === "full" ? '#FFFFFF' : viewType === "full" ? '#f9fafb' : "transparent"};
  //overflow-y: auto;
  //flex: 1;
`

export const FormButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding: 15px 10px;

  background: #fff;
  box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);
  border-top: 1px solid #e8ecee;
  z-index: 200;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export const BlockContainer = styled.div`
  background: #F9FAFB;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
`

export const BlockInnerContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 15px 10px 0px 10px;
  height: 100%;
  background: #f9fafb;
  overflow-y: auto;
`
