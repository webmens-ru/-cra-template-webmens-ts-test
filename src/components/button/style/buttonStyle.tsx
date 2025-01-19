import styled from "styled-components";
import { Direction, Variant } from "..";

interface IContainer {
  palette: {
    static?: string;
    hover?: string;
    fontColor?: string;
    fontColorHover?: string;
    borderColor?: string;
  };
  disabled?: boolean;
  variant?: Variant;
  dropdownDirection?: Direction;
  dropdownWidth?: string;
  svg?: string;
}

export const Container = styled.div<IContainer>`
  position: relative;
  height: 39px;
  width: ${({ variant }) => (variant === "square" ? "39px" : "max-content")};
  display: flex;
  align-items: center;
  background: ${({ palette }) => palette.static};
  opacity: ${({ disabled }) => disabled ? ".5" : "1"};
  border-radius: ${({ variant }) => (variant === "circle" ? "50px" : "3px")};
  transition: all 220ms ease;
  & * {
    font-size: 12px;
    font-weight: 700;
    color: ${({ palette }) => palette.fontColor};
    font-family: "Open Sans", sans-serif;
  }
  & > button {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background: none;
    border: 1px solid ${({ palette }) => palette.borderColor};
    border-radius: inherit;
    text-transform: uppercase;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    user-select: none;
    white-space: nowrap;
    transition: 220ms all ease;
    & img {
      position: relative;
      left: -10px;
      width: 24px;
      height: 24px;
    }
    &:hover {
      background: ${({ palette }) => palette.hover};
      color: ${({ palette }) => palette.fontColorHover || palette.fontColor};
    }
  }
  & p {
    margin: 0 10px;
  }
`;

export const WhiteTriangle = styled.div`
  position: relative;
  height: 100%;
  width: 40px;
  background: ${({ palette }: IContainer) => palette.static};
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: ${({ palette }) => palette.hover};
  }
  &:before {
    position: absolute;
    top: 4px;
    left: 0px;
    content: "";
    width: 1px;
    height: 30px;
    background: #7a7a7a;
  }
  &:after {
    position: absolute;
    top: 18px;
    left: 16px;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 4px 4px;
    border-color: transparent transparent #fff transparent;
    transform: rotate(180deg);
  }
`;

export const BlackTriangle = styled(WhiteTriangle)`
  &:after {
    border-color: transparent transparent rgb(0, 0, 0) transparent;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 40px;
  left: ${({ dropdownDirection }) =>
    dropdownDirection === "left" ? "auto" : "0"};
  right: ${({ dropdownDirection }) =>
    dropdownDirection === "right" ? "auto" : "0"};
  width: ${({ variant, dropdownWidth }: IContainer) =>
    variant === "default"&&!dropdownWidth ? "calc(100% - 40px)" : dropdownWidth};
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 7px 21px rgba(83, 92, 105, 0.12),
    0 -1px 6px 0 rgba(83, 92, 105, 0.06);
  z-index: 100;
  & > span {
    margin: 0;
    padding: 5px 15px;
    min-width: inherit;
    color: #535c69;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      background: rgba(194, 197, 202, 0.3);
    }
  }
`;

export const SquareBtn = styled.div`
  width: 40px;
  height: 100%;
  background: url(${({ svg }: IContainer) => svg}) no-repeat center;
  background-color: ${({ palette }) => palette.static};
  border: 1px solid #c6cdd3;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${({ palette }) => palette.hover};
  }
`;

export const BlackArrow = styled.span`
  position: relative;
  top: -2px;
  right: -5px;
  margin: 0 2px;
  width: 6px;
  height: 6px;
  border: 2px solid #535b69;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  cursor: pointer;
`;

export const SimpleWhiteTriangle = styled.div`
  position: relative;
  height: 100%;
  width: 20px;
  background: none;
  cursor: pointer;
  &:after {
    position: absolute;
    top: 18px;
    left: 16px;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 4px 4px;
    border-color: transparent transparent #fff transparent;
    transform: rotate(180deg);
  }
`;
