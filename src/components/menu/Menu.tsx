import React, { StrictMode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CountTabs from "./components/CountTabs";
import MainRender from "./components/MainRender";
import PseudoRender from "./components/PseudoRender";
import { ContextProvider } from "./store";
import { IMenuProps } from "./types";

/**
 * @param items - items array
 * @param setItem - onTabClick;
 * @param itemsMutation - callback to save changes;
 * @param isEditable - default false;
 * @param initialMenuId - id of current tab;
 */

export function Menu(props: IMenuProps) {
  return (
    <StrictMode>
      <DndProvider backend={HTML5Backend}>
        <ContextProvider {...props}>
          <PseudoRender />
          <CountTabs />
          <MainRender />
        </ContextProvider>
      </DndProvider>
    </StrictMode>
  );
}
