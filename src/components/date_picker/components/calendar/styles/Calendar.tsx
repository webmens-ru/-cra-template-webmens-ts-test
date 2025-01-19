import styled from "styled-components";

type CalendarContainerProps = {
  isShow?: boolean;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
};

export const CalendarContainer = styled.div`
  position: absolute;
  top: ${({ top }: CalendarContainerProps) => top || "auto"};
  left: ${({ left }: CalendarContainerProps) => left || "auto"};
  right: ${({ right }: CalendarContainerProps) => right || "auto"};
  bottom: ${({ bottom }: CalendarContainerProps) => bottom || "auto"};
  z-index: 1000;
  padding: 5px;
  width: 220px;
  height: auto;
  background: #ffffff;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.9);
  transition: all 300ms;
  transform: ${({ isShow }) => (isShow ? "translateY(0%)" : "translateY(10%)")};
  visibility: ${({ isShow }) => (isShow ? "visible" : "hidden")};
  &,
  & * {
    color: #535c69;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
  }
`;

export const HeaderContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BtnPrevContainer = styled.button`
  position: relative;
  width: 25px;
  height: 70%;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background: #eeeeee;
  }
  &::before {
    content: "";
    position: absolute;
    left: 35%;
    top: 35%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 5px 4px 0;
    border-color: transparent #000000 transparent transparent;
    opacity: 0.15;
  }
`;

export const BtnNextContainer = styled(BtnPrevContainer)`
  &::before {
    left: 40%;
    transform: rotate(180deg);
  }
`;

export const MonthContainer = styled.div`
  position: relative;
  padding: 5px;
  width: 95px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: #eee;
  }
  &::after {
    content: "";
    position: absolute;
    top: 45%;
    right: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #000000 transparent transparent transparent;
    opacity: 0.15;
  }
  & > p {
    padding-right: 15px;
    width: 100%;
    line-height: 21px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
  }
  & > div {
    position: absolute;
    top: ${({ isShow }: { isShow: boolean }) => (isShow ? "-1px" : "10px")};
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #eee;
    z-index: 1;
    transition: top 300ms, opacity 300ms, scale 0ms;
    opacity: ${({ isShow }) => (isShow ? "1" : "0")};
    transform: ${({ isShow }: { isShow: boolean }) =>
      isShow ? "scale(1)" : "scale(0)"};
    & > p {
      padding: 1px 4px;
      font-size: 14px;
      &:first-of-type {
        padding: 5px 4px;
        font-size: 16px;
        border-bottom: 1px solid #eee;
      }
    }
  }
`;

export const YearContainer = styled(MonthContainer)`
  width: 60px;
  & > div {
    max-height: 200px;
    overflow: auto;
  }
`;

export const DaysOfWeekContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 15px;
  background: #eee;
  & p {
    font-size: 10px;
    color: #a9a9a9;
    user-select: none;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > p {
    padding: 3px;
    width: 30px;
    height: 25px;
    border-bottom: 1px solid #eee;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #dadada;
    }
  }
  & > p:nth-of-type(7n),
  & > p:nth-of-type(7n - 1) {
    color: red;
  }
`;

export const DayInCurrentMonth = styled.p`
  background: ${({ bg }: { bg: string }) => bg};
`;

export const DayInOtherMonth = styled(DayInCurrentMonth)`
  opacity: 0.3;
`;

export const TimeContainer = styled.div`
  padding: 5px;
  width: 100%;
`;

export const TimeSetting = styled.div`
  margin: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: #ccc;
  & p {
    width: 35px;
    font-size: 12px;
  }
  & span {
    margin: 0 3px;
    font-size: 20px;
  }
  & button {
    margin: 0;
    margin-left: 15px;
    width: 20px;
    height: 20px;
    color: #ccc;
    &:hover {
      background: #ececec;
    }
  }
`;

export const TimeInput = styled.input`
  width: 30px;
  height: 23px;
  background: none;
  border: 1px solid #ccc;
  color: #000;
  text-align: center;
  outline: none;
`;

export const TimeButton = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:first-of-type {
    margin-left: auto;
  }
  &:last-of-type {
    margin-right: auto;
  }
  & span {
    position: relative;
    width: 11px;
    height: 11px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    &::before {
      content: "";
      position: absolute;
      top: 25%;
      left: 25%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 3px 4px 3px;
      border-color: transparent transparent #ccc transparent;
    }
    &:last-of-type::before {
      top: 30%;
      transform: rotate(180deg);
    }
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  & button {
    width: 70px;
    height: 23px;
    background: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    &:hover {
      background: #ececec;
    }
    &:first-of-type {
      margin-left: auto;
      margin-right: 10px;
    }
    &:last-of-type {
      margin-right: auto;
    }
  }
`;

export const EnableTime = styled.button`
  width: 100%;
  height: 20px;
  background: none;
  font-size: 10px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
