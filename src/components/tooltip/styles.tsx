import styled from "styled-components";

export const TooltipContainer = styled.span`
  position: relative;
  display: inline-block;
`

export const TooltipBubble = styled.div`
  position: absolute;
  border: 1px solid #333;
  background-color: #161616;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  font-size: 12px;
  width: 120px;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
  }

  &.top {
    margin-bottom: 8px;

    &::before {
      left: 50%;
      border-bottom-color: #333;
      margin-left: -8px;
      margin-top: 8px;
    }
  }

  &.right {
    left: 100%;
    margin-left: 8px;

    &::before {
      top: 50%;
      border-left-color: #333;
      margin-top: -8px;
    }
  }

  &.bottom {
    top: 100%;
    margin-top: 8px;

    &::before {
      left: 50%;
      border-top-color: #333;
      margin-left: -8px;
      margin-top: -8px;
    }
  }

  &.left {
    right: 100%;
    margin-right: 8px;

    &::before {
      top: 50%;
      border-right-color: #333;
      margin-top: -8px;
    }
  }
`

export const TooltipMessage = styled.span`
  color: #fff;
`
