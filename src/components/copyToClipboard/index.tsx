import React from "react";
import styled from "styled-components";
import linkChain from "./link_icon-icons.com_70055.svg";

export default function CopyToClipboard({append}: {append: TPlacementOptions}) {
  let str: string = ''
  if (process.env.NODE_ENV === "production") {
    str = '?' + Object.keys(append).map((item => `${item}=${append[item]}`)).join('&')
  }
  return (
    <Btn>
      <span>{window._APP_URL_ + str}</span>
    </Btn>
  );
}

const Btn = styled.button`
  position: relative;
  top: 2px;
  margin-left: 10px;
  margin-right: 10px;
  width: 17px;
  height: 17px;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  background: url(${linkChain}) no-repeat 40% 50%/70%;
  & span {
    position: absolute;
    top: -10px;
    padding: 5px 15px;
    display: none;
    background: rgb(245 245 245);
    border: 1px solid #bfbfbf;
    border-radius: 20px;
    white-space: nowrap;
    z-index: 100;
    cursor: text;
    user-select: text;
  }
  &:hover span {
    display: block;
  }
`;
