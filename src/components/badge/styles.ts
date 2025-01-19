import styled from "styled-components";
import { IBadgeTypes } from './types';

interface IBadgeContainerProps {
  type: IBadgeTypes
}

type BadgeColors = {
  [key in IBadgeTypes]: string;
};

const colors: BadgeColors = {
  primary: "#4fc3f7",
  danger: "#e04b5b",
  success: "#9acb05",
  info: "#e5e7e9",
  warning: "#f2b637"
}

export const BadgeContainer = styled.div<IBadgeContainerProps>`
  display: flex;
  justify-content: center;
  z-index: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  color: #fff;
  background: ${({type}) => colors[type]};
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
`

export const BadgeCount = styled.span`
  
`
