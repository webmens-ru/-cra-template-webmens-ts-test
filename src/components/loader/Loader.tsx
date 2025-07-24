import React, { StrictMode } from "react";
import styled, { keyframes } from "styled-components";
import logo from "./assets/webmens_200_200.png";

export interface LoaderProps {
  transparent?: boolean
}

export const Loader = React.memo(({
  transparent
}: LoaderProps) => {
  return (
    <StrictMode>
      <LoadingContainer className={transparent ? 'transparent' : ''}>
        <LoadingContent>
          <img src={logo} alt="Logo" />
          <Ring data-testid="loader-ring">
            <div></div>
            <div></div>
            <div></div>
          </Ring>
        </LoadingContent>
      </LoadingContainer>
    </StrictMode>
  );
});

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgb(255, 255, 255);
  z-index: 100;

  &.transparent {
    background: rgba(55, 55, 55, .5);
  }
`;

const LoadingContent = styled.div`
  position: relative;
  margin: auto;
  width: 100px;
  & img {
    width: 100%;
    height: auto;
  }
`;

const anim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  display: inline-block;
  position: absolute;
  top: -25px;
  left: -25px;
  width: 180px;
  height: 180px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 134px;
    height: 134px;
    margin: 8px;
    border: 4px solid #fff;
    border-radius: 50%;
    animation: ${anim} 0.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #dfdfdf transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.225s;
    }
    &:nth-child(2) {
      animation-delay: -0.15s;
    }
    &:nth-child(3) {
      animation-delay: -0.075s;
    }
  }
`;
