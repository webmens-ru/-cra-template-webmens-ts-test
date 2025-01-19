import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: #333;
  opacity: .5;
  z-index: 100;
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-height: 90vh;
  max-width: 90vw;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .2);
  box-shadow: 0 7px 21px rgba(83, 92, 105, 0.12), 0 -1px 6px 0 rgba(83, 92, 105, 0.06);
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  opacity: 1;
  z-index: 110;
`

export const ModalInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
  padding: 10px;
`

export const HeaderModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f2f2f2;
`

export const HeaderCancelButton = styled.span`
  height: 32px;
  transform: rotate(-45deg);
  color: rgb(82, 92, 105);
  font-size: 24px;
  opacity: .5;
  transition: all 220ms ease;
  cursor: pointer;

  &:after {
    content: "+";
  }

  &:hover {
    opacity: 1;
  }
`

export const BodyModalContainer = styled.div`
  overflow: auto;
  background: #eef2f4;
`

export const FooterModalContainer = styled.div`
  margin-top: 10px;
  padding-bottom: 5px;
  overflow-x: auto;
`
