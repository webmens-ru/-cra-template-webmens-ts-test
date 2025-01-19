import styled from 'styled-components';
import spriteSvg from "../../assets/svg/sprite-interface.min.svg";

export const MenuItemContainer = styled.div`
  display: grid;
  grid-template: 100% / 20px 158px 20px 20px;

  &:last-of-type input {
    border-bottom: 1px solid #e7eaec;
  }
`

export const MenuItemDragHandle = styled.div`
  margin: auto 3px;
  width: 15px;
  height: 15px;
  background: url(${spriteSvg}) no-repeat 0 -201px;
  cursor: move;
`

export const MenuItemInput = styled.input.attrs({ type: "text" })<{current: boolean}>`
  grid-column: 2;
  width: 100%;
  padding: 10px 5px;
  border-top: 1px solid #e7eaec;
  color: ${({ current }) => current ? "#0fa7d7" : "#535c69"};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  list-style: none;
  transition: color 200ms ease;
  cursor: ${({ current }) => current ? "default" : "pointer"};

  &:hover {
    color: ${({ current }) => current ? "#0fa7d7" : "#000"};
  }
`

export const MenuItemRenameHandle = styled.div`
  margin: auto 3px;
  width: 15px;
  height: 15px;
  background: url(${spriteSvg}) no-repeat 0 3px/80%;
`

export const MenuItemDeleteHandle = styled.div`
  margin: auto 3px;
  width: 15px;
  height: 15px;
  background: url(${spriteSvg}) no-repeat 0 -12px/80%;
`
