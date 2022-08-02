import styled from "styled-components";
import gridGear from "../assets/gridGear.svg";

export const ControlContainer = styled.div`
  height: 80px;
  padding: 10px;
  display: flex;
  align-items: center;
  background: rgb(238, 242, 244);
  font-family: "Open Sans", sans-serif;
  & > h3 {
    margin-right: 30px;
  }
  & > button {
    margin-right: 30px;
  }
`;

export const ControlTitle = styled.h3`
  margin: auto 10px;
  font-size: 26px;
  font-weight: 200;
  color: rgba(0, 0, 0, 0.8);
`;

export const ButtonAddContainer = styled.div`
  position: relative;
  margin-right: 40px;
  display: flex;
  height: 40px;
  background: #bbed21;
  cursor: pointer;
  transition: 200ms;
  & > button {
    position: relative;
    width: 160px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    &:hover {
      background: #d2f95f;
    }
    &::after {
      content: "";
      position: absolute;
      top: 10px;
      right: 0;
      width: 1px;
      height: 20px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  & > span {
    position: relative;
    width: 40px;
    &:hover {
      background: #d2f95f;
    }
    &::before {
      content: "";
      position: absolute;
      top: 18px;
      left: 17px;
      border-style: solid;
      border-width: 4px 4px 0 4px;
      border-color: rgba(0, 0, 0, 0.6) transparent transparent transparent;
    }
  }
`;

export const DropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: -150px;
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  z-index: 5;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 40px;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    background: inherit;
  }
  & > div {
    position: relative;
    height: 30px;
    padding: 10px;
    z-index: 1;
    &:hover {
      background: #eee;
    }
    & > div {
      display: none;
      top: 0px;
      right: -90%;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
      &::before {
        top: 5px;
        left: -10px;
      }
    }
    &:hover > div {
      display: flex;
    }
  }
`;

export const ButtonGearContainer = styled.button` 
  position: relative;
  margin-left: 10px;
  margin-right: 40px;
  width: 40px;
  height: 40px;
  background: url(${gridGear}) no-repeat center/50%;
  border: 1px solid #6d6d6d;
  & > div {
    position: absolute;
    top: 10px;
    left: -150px;
    width: 150px;
    background: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    z-index: 10;
    & > p {
      padding: 5px;
      width: 100%;
      height: 30px;
      &:hover {
        background: rgba(194, 197, 202, 0.15);
      }
    }
  }
`;
