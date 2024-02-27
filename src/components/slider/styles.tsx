import styled from "styled-components";
import { DEFAULT_ZINDEX, SliderContentType } from ".";
import { procentWidthToPx } from "./utils";

export const SliderContainer = styled.div<{ width: string, timeout: number, zIndex: number }>`
  display: none;
  position: fixed;
  inset: 0;
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: none;
  
  .backdrop {
    position: absolute;
    inset: 0;
    z-index: 2000;
    pointer-events: auto;
    opacity: 0;
    transition: all ${({ timeout }) => `${timeout / 2}ms`} linear;
    opacity: ${({ zIndex }) => zIndex > DEFAULT_ZINDEX ? "0" : "1"} !important;
  }

  .content-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 0px;
    z-index: ${({ zIndex }) => zIndex};
    box-shadow: -5px 0 10px rgba(0,0,0,0.2);
    transition: all ${({ timeout }) => `${timeout}ms`} ease;
  }

  &.enter, &.enter-active, &.enter-done, &.exit, &.exit-active {
    display: block;

    .close-block {
      display: flex;
    }
  }

  &.enter-active, &.enter-done {
    .backdrop {
      background: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }

    .content-wrapper {
      max-width: ${({ width }) => width};
    }

    .close-block {
      right: ${({ width }) => procentWidthToPx(width, -16)};
    }
  }

  &.exit-active, &.exit-done {
    .content-wrapper {
      right: -150px;
      max-width: 0px;
    }
  }
`

export const SliderCloseBlock = styled.div.attrs({ className: "close-block" }) <{ timeout: number }>`
  position: absolute;
  display: none;
  align-items: center;
  top: 10px;
  right: 0;
  padding: 5px 10px 5px 5px;
  border-top-left-radius: 19px;
  border-bottom-left-radius: 19px;
  color: #fff;
  background: #2ebfef;
  transition: all ${({ timeout }) => `${timeout}ms`} ease;
  cursor: pointer;
  pointer-events: auto;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    margin: 5px;
    border: 2px solid transparent;
    border-radius: 50%;
    margin-right: 5px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3e%3cpath fill='%23FFF' fill-rule='evenodd' d='M11.381 1.746L7.138 5.988l4.248 4.249-1.151 1.152L5.986 7.14l-4.242 4.244-1.147-1.146L4.84 5.994.592 1.747 1.744.595l4.248 4.247L10.235.6z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    opacity: .85;
  }

  &::after {
    content: '';
    display: none;
    position: absolute;
    left: 4px;
    width: 24px;
    height: 24px;
    border: 1px solid rgb(153, 223, 232);
    border-radius: 50%;
  }

  &:hover::after {
    display: block;
  } 
`

export const IframePostForm = styled.form`
  height: 100%;
  width: 100%;
`

export const SliderContent = styled.div<{ type: SliderContentType }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  pointer-events: auto;
  overflow: ${({ type }) => type === "iframe" ? "hidden" : "auto"};
`

export const SliderIframeContainer = styled.iframe`
  width: 100%;
  height: calc(100% - 1px);
  border: none;
`
