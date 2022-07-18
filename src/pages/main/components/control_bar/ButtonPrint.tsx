
import { hooks } from "@webmens-ru/ui_lib";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../app/store/hooks";
import { downloadFile } from "../../../../app/utils/print";
import { timeout } from "../../../../app/utils/timeout";

export function ButtonPrint() {
  const { ref, isShow, setShow } = hooks.useShowControl();
  const { mainSlice } = useAppSelector((state) => state);
  const [isLoadingPays, setIsLoadingPays] = useState(false);

  const getWordPays = async (url: string) => {
    setIsLoadingPays(true);
    await downloadFile(
      url,
      mainSlice.checkboxes,
      "docx",
    );
    setShow(false);
    setIsLoadingPays(false);
  };

  const {
    ref: modalRef,
    isShow: isShowModal,
    setShow: setIsShowModal,
  } = hooks.useShowControl();

  const [text, setText] = useState("");

  const getWordList = async () => {
    setIsShowModal(false);
    await downloadFile(
      "/route-sheet/print-docx",
      { id: mainSlice.checkboxes, text },
      "docx",
    );
  };

  const [isLoadingPA, setIsLoadingPA] = useState(false);

  const getWordPA = async () => {
    if (!mainSlice.checkboxes.length) return;

    setIsLoadingPA(true);
    const res = await axios({
      method: "post",
      url: "https://v3.app-bzmaster.ru/bitrix-power-attorney/print-docx",
      headers: {
        authorization: `Bearer ${window._ACCESS_TOKEN_}`,
      },
      data: mainSlice.checkboxes,
    });
    if (Array.isArray(res.data)) {
      let link = document.createElement("a");
      for (let i = 0; i < res.data.length; i++) {
        link.href = res.data[i];
        link.click();
        await timeout(1000);
      }
    } else {
      console.log(res);
    }
    setShow(false);
    setIsLoadingPA(false);
  };

  return (
    <>
      <Container ref={ref}>
        <button onClick={() => setShow(true)}>Печать</button>
        {isShow && (
          <div>
            {isLoadingPays ? (
              <button>Загрузка</button>
            ) : (
              <button onClick={() => getWordPays("/docx/docx")}>
                Согласование платежей
              </button>
            )}
            {isShowModal ? (
              <button>Загрузка</button>
            ) : (
              <button onClick={() => setIsShowModal(true)}>
                Маршрутный лист
              </button>
            )}
            {isLoadingPA ? (
              <button>Загрузка</button>
            ) : (
              <button onClick={() => getWordPA()}>Доверенность</button>
            )}
          </div>
        )}
      </Container>
      {isShowModal && (
        <ContainerModal ref={modalRef}>
          <h3>Описание маршрутного листа</h3>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            <button onClick={getWordList}>Применить</button>
            <button onClick={() => setIsShowModal(false)}>Отменить</button>
          </div>
        </ContainerModal>
      )}
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin-left: auto;
  height: 40px;
  background: none;
  & > button {
    position: relative;
    padding-left: 10px;
    padding-right: 30px;
    height: 100%;
    background: none;
    border: 1px solid #6d6d6d;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      background: #cfd4d8;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 45%;
      right: 15px;
      width: 6px;
      height: 2px;
      background: #000;
      border-radius: 10px;
      transform: rotate(45deg);
    }
    &::after {
      right: 12px;
      transform: rotate(135deg);
    }
  }
  & > div {
    position: absolute;
    right: 0;
    top: 40px;
    width: 300px;
    z-index: 10;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    & button {
      padding: 0 10px;
      width: 100%;
      height: 40px;
      background: #fff;
      text-align: left;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
`;

const ContainerModal = styled.div`
  position: absolute;
  top: 200px;
  left: calc(50vw - 225px);
  padding: 20px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }
  & > textarea {
    padding: 5px;
    width: 100%;
    resize: none;
  }
  & > div {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    & > button {
      width: 120px;
      height: 40px;
      font-weight: 600;
      text-transform: uppercase;
      &:hover: {
        opacity: 0.7;
      }
    }
    & > button:first-of-type {
      background: #3bc8f5;
      color: #fff;
    }
  }
`;
