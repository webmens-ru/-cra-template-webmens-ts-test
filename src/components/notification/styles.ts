import styled from 'styled-components';

export const NotificationContainer = styled.div`
  display: flex;
  width: 400px;
  max-width: 400px;
  margin-bottom: 12px;
  background: #000;
  opacity: .8;
  border-radius: 26px;
  font-family: "Open Sans";
  font-size: 13px;

  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: .8;
    transition: opacity 250ms ease-in;
  }

  &.exit {
    opacity: .8;
  }

  &.exit-active {
    opacity: 0;
    transition: opacity 250ms ease-in;
  }
`

export const NotificationContent = styled.div`
  flex: 1;
  padding: 14px 16px 14px 20px;
  color: #fff;
`

export const NotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: auto;
  padding: 5px 0 5px 10px;
  font-size: 28px;
`

export const NotificationCloseBtn = styled.div`
  position: relative;
  width: 33px;
  height: auto;
  opacity: .2;
  cursor: pointer;
  transition: opacity 200ms ease;

  &:hover {
    opacity: .7;
  }

  &::before, &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    background: #fff;
    content: "";
    transform: translate(-50%,-50%) rotate(45deg);
  }

  &::before {
    width: 8px;
    height: 2px;
  }

  &::after {
    width: 2px;
    height: 8px;
  }
`
