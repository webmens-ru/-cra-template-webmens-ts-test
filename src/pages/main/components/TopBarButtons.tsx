import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../app/store/hooks";
import { ButtonPrint } from "./control_bar/ButtonPrint";

export function TopBarButtons() {
  const {mainSlice} = useAppSelector(state => state)
  return (
    <Container>
      {/* {mainSlice.currentTab.params?.entity === "supply-register" && (
        <ButtonPrint />
      )} */}
    </Container>
  );
}

const Container = styled.div`
  margin-left: auto;
`;
