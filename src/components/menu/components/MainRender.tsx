import React, { useState } from "react";
import { useShowControl } from "../../../hooks";
import gearSvg from "../assets/grid-gear.svg";
import { useSetTab } from "../hooks/useSetTab";
import { useCustomContext } from "../store";
import { MenuContainer, MoreBtn, SettingBtn, TabsContainer } from "../styles/index";
import MenuTabs from "./MenuTabs";
import TopTabs from "./TopTabs";

export default function MainRender() {
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const { state, dispatch } = useCustomContext();
  const { setTab } = useSetTab({ dispatch, sliderOpenner: state.sliderOpenner });
  const { ref, isShow, setShow } = useShowControl();

  const updateTabs = () => {
    setIsDraggable(false);
    state.itemsMutation(state.items);
  };

  return (
    <TabsContainer menuStyle={state.menuStyle}>
      <div >
        <TopTabs
          arr={state.items
            .filter((item) => item.visible)
            .slice(0, state.countTopItems)}
          isDraggable={isDraggable}
          currentId={state.currentItem?.id || -1}
          setTab={setTab}
        />
        {state.menuStyle === "main" && (
          <MoreBtn
            current={isShow}
            children="Ещё"
            onClick={() => setShow(!isShow)}
          />
        )}
      </div>
      <MenuContainer ref={ref} isShow={isShow}>
        <MenuTabs
          abroadTabs={state.items
            .filter((item) => item.visible)
            .slice(state.countTopItems)}
          hiddenTabs={state.items.filter((item) => !item.visible)}
          isDraggable={isDraggable}
          setTab={setTab}
        />
        {!state.isEditable ? null : isDraggable ? (
          <SettingBtn onClick={() => updateTabs()}>
            Завершить настройку
          </SettingBtn>
        ) : (
          <SettingBtn onClick={() => setIsDraggable(true)}>
            Настроить меню
            <img src={gearSvg} alt="gear" />
          </SettingBtn>
        )}
        <SettingBtn>Вернуть меню по умолчанию</SettingBtn>
      </MenuContainer>
    </TabsContainer>
  );
}
