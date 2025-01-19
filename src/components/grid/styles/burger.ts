import styled from "styled-components";

interface IMenuContainerProps {
  top: number;
  left: number;
}

export const BurgerMenuContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > span {
    margin: 1px;
    width: 15px;
    height: 2px;
    background: #000;
    opacity: 0.3;
  }
`;

export const MenuContainer = styled.div<IMenuContainerProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: calc(8px + ${({ top }) => top}px);
  left: calc(48px + ${({ left }) => left}px);
  width: max-content;
  min-width: 100px;
  max-width: 200px;
  background: #fff;
  box-shadow: 0 7px 21px rgba(83, 92, 105, 0.3);
  z-index: 10;

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: #fff;
    box-shadow: -5px 10px 10px rgba(83, 92, 105, 0.1);
    transform: rotate(45deg);
    z-index: -1;
  }
`

export const MenuItem = styled.button`
  width: 100%;
  height: 36px;
  padding: 0 10px;
  color: #535c69;
  transition: all 200ms;
  &:hover {
    background: rgba(194, 197, 202, 0.15);
  }
`
