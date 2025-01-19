import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  font-family: "Open Sans";
  font-size: 14px;
  max-width: 100%;
  margin: 0 5px 10px 5px;
`

export const ToolbarBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  max-height: 34px;
  margin-right: 10px;
  border-radius: 16px;
  background: rgba(82,92,105,.08);
  color: #525c69;
  max-width: 100%;
  overflow: hidden;
`

export const BlockItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
  padding: 7px 5px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 220ms ease;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    padding-left: 15px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    padding-right: 15px;
  }
`

export const BlockTitle = styled(BlockItemContainer)`
  cursor: default;
`

export const MetricFilterContainer = styled(BlockItemContainer)`
  &:hover {
    background: rgba(82,92,105,.15);
  }
`

export const MetricLinkContainer = styled(BlockItemContainer)`
  position: relative;
  padding: 0 !important;
  margin: 7px 5px;

  &:first-child {
    margin-left: 15px;
  }

  &:last-child {
    margin-right: 15px;
  }

  & > span {
    position: relative;
    opacity: .8;
    transition: opacity 200ms;

    &:hover, &:hover:after {
      opacity: 1;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      height: 2px;
      opacity: 0;
      background: rgba(82, 92, 105, 0.4);
      transition: opacity 200ms;
    }
  }
`

export const SeparatorContainer = styled.div`
  background: rgb(82, 92, 105);
  opacity: .3;
  width: 1px;
  height: 50%;
`
