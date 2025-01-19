import React, { useState } from "react";
import {
  Buttons,
  EnableTime,
  TimeButton,
  TimeContainer,
  TimeInput,
  TimeSetting,
  useCustomContext,
} from "..";

export function Time() {
  const { state, dispatch } = useCustomContext();
  const [isShow, setIsShow] = useState(true);

  if (!isShow) {
    return (
      <EnableTime onClick={() => setIsShow(true)}>Установить время</EnableTime>
    );
  }

  const incrementHours = () => {
    if (typeof state.date.getHours() === "number") {
      if (state.date.getHours() === 23) {
        dispatch({ type: "set_hour", hour: 0 });
      } else {
        dispatch({ type: "set_hour", hour: state.date.getHours() + 1 });
      }
    } else {
      dispatch({ type: "set_hour", hour: 1 });
    }
  };

  const decrementHours = () => {
    if (typeof state.date.getHours() === "number") {
      if (state.date.getHours() === 0) {
        dispatch({ type: "set_hour", hour: 23 });
      } else {
        dispatch({ type: "set_hour", hour: state.date.getHours() - 1 });
      }
    } else {
      dispatch({ type: "set_hour", hour: 23 });
    }
  };

  const checkHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/\d/)) {
      const value = +e.target.value;
      if (value >= 0 && value <= 23) {
        dispatch({ type: "set_hour", hour: value });
      }
    }
    if (e.target.value === "") {
      dispatch({ type: "set_hour", hour: 0 });
    }
  };

  const checkMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/\d/)) {
      const value = +e.target.value;
      if (value >= 0 && value <= 59) {
        dispatch({ type: "set_minute", minute: value });
      }
    }
    if (e.target.value === "") {
      dispatch({ type: "set_minute", minute: 0 });
    }
  };

  const incrementMinutes = () => {
    if (typeof state.date.getMinutes() === "number") {
      if (state.date.getMinutes() === 59) {
        dispatch({ type: "set_minute", minute: 0 });
      } else {
        dispatch({ type: "set_minute", minute: state.date.getMinutes() + 1 });
      }
    } else {
      dispatch({ type: "set_minute", minute: 1 });
    }
  };

  const decrementMinutes = () => {
    if (typeof state.date.getMinutes() === "number") {
      if (state.date.getMinutes() === 0) {
        dispatch({ type: "set_minute", minute: 59 });
      } else {
        dispatch({ type: "set_minute", minute: state.date.getMinutes() - 1 });
      }
    } else {
      dispatch({ type: "set_minute", minute: 1 });
    }
  };

  const setTime = () => {
    dispatch({type: "submit"})
  };

  const close = () => {
    dispatch({type: "cancel"})
  };

  return (
    <TimeContainer>
      <TimeSetting>
        <p>Время</p>
        <TimeButton>
          <span onClick={incrementHours}></span>
          <span onClick={decrementHours}></span>
        </TimeButton>
        <TimeInput
          type="text"
          value={`0${state.date.getHours()}`.slice(-2)}
          onChange={checkHours}
        />
        <span>:</span>
        <TimeInput
          type="text"
          value={`0${state.date.getMinutes()}`.slice(-2)}
          onChange={checkMinutes}
        />
        <TimeButton>
          <span onClick={incrementMinutes}></span>
          <span onClick={decrementMinutes}></span>
        </TimeButton>
        <button onClick={() => setIsShow(false)}>x</button>
      </TimeSetting>
      <Buttons>
        <button onClick={setTime}>Выбрать</button>
        <button onClick={close}>Закрыть</button>
      </Buttons>
    </TimeContainer>
  );
}
