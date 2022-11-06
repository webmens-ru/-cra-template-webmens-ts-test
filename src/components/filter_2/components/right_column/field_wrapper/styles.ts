import styled from "styled-components";
import draggableIcon from "../../../assets/svg/draggable.svg";

export const FieldContainer = styled.div`
  padding: 0 10px;
  margin: 7px 0 15px 0;

  &:hover .drag-handler, &:hover .remove-handler {
    visibility: visible;
    opacity: .5;
  }
`

export const FieldInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const FieldLabel = styled.div`
  margin: 0 0 5px 20px;
  font-size: 13px;
  opacity: .7;
  color: #a9adb2;
  cursor: default;
  user-select: none;
`

export const FieldDragHandle = styled.div.attrs({ className: "drag-handler" })`
  display: block;
  visibility: hidden;
  width: 10px;
  height: 15px;
  background: url(${draggableIcon}) no-repeat center;
  opacity: 0;
  transition: visibility 200ms ease, opacity 200ms ease;
  cursor: move;

  &:hover {
    opacity: 1 !important;
  }
`

export const FieldRemoveHandle = styled.div.attrs({ children: "✖", className: "remove-handler" })`
  visibility: hidden;
  opacity: 0;
  transition: visibility 200ms ease, opacity 200ms ease;
  cursor: pointer;

  &:hover {
    opacity: 1 !important;
  }
`
