import styled from "styled-components";
import Icons from "./icons";

type IconContainerProps = {
  iconWidth: string;
  iconName: keyof typeof Icons;
}

export const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ iconWidth }) => iconWidth};
  transition: all 220ms ease;

  & > i {
    position: relative;
    display: block;
    padding-top: 100%;
    width: 100%;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #a6aab0;
    mask-size: ${({ iconWidth }) => iconWidth};
    mask-image: ${ ({ iconName }) => `url(${Icons[iconName]})` };
    transition: all 220ms ease;
  }
`