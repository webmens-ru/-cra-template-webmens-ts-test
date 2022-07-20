import React from "react";
import { Loader, Menu } from "@webmens-ru/ui_lib";
import { GridWrapper } from "./components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useMenuData } from "./hooks/useMenuData";
import { MainContainer } from "./mainStyle";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { useSetTabsMutation } from ".";

export function Main({ menuId = 1 }: { menuId?: number }) {
  const { tabs, setTab } = useMenuData(menuId);
  const [itemsMutation] = useSetTabsMutation();

  const { isCorrect } = useData();

  if (tabs.isLoading) return <Loader />;

  return (
    <>
      <Menu items={tabs.data} setItem={setTab} itemsMutation={itemsMutation} />
      {isCorrect ? (
        <>
          <TopBar />
          <GridWrapper />
        </>
      ) : (
        <MainContainer>
          <img src={webmensLogo} alt="webmens logo" />
        </MainContainer>
      )}
    </>
  );
}
