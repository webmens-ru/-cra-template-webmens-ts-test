import React, { useCallback, useEffect } from "react";
import { Button } from "@webmens-ru/ui_lib";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useLazyGetDynamicButtonItemsQuery, useSendDataOnButtonClickMutation, useLazyGetButtonAddQuery } from "../mainApi";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { axiosInst } from "../../../app/api/baseQuery";
import { setTimeSliderOpened } from "../mainSlice";
import MainForm from "../../mainForm/mainForm";

export function TopBarButtons() {
  const { mainSlice } = useAppSelector((state) => state);
  const [getItems, items] = useLazyGetDynamicButtonItemsQuery();
  const [getButtonAdd, buttonAdd] = useLazyGetButtonAddQuery();
  const [sendData] = useSendDataOnButtonClickMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mainSlice.currentTab?.params?.entity) {
      getItems(mainSlice.currentTab?.params?.entity);
      getButtonAdd(mainSlice.currentTab?.params?.entity);
    }
  }, [getItems, getButtonAdd, mainSlice.currentTab?.params?.entity]);

  const itemClickHandler = async (item: any) => {
    const { grid, checkboxes } = mainSlice
    const body = grid.grid!.filter((item) => {
      const id = typeof item.id === "object" ? item.id.title : item.id
      return checkboxes.includes(id as TRowID)
    })

    if (grid)
      sendData({ url: item.handler, body });
  };

  const handleGearClick = async (item: any) => {
    const { grid, checkboxes } = mainSlice

    const gridData = checkboxes.length === 0 || checkboxes.length === grid.grid?.length
      ? grid.grid
      : grid.grid?.filter(item => checkboxes.some(check => check === item.id || check === (item.id as any).title))

    const response = await axiosInst.post('/admin/excel/get-excel', {
      schema: mainSlice.schema.filter(item => item.visible),
      grid: gridData || [],
      footer: grid.footer || []
    }, {
      responseType: "blob"
    })
    
    const link = document.createElement("a")
    link.href = URL.createObjectURL(new Blob([response.data]))
    link.download = `${mainSlice.currentTab.title} ${new Date().toLocaleString().slice(0, 10)}.xlsx`
    link.click()
  }

  const buttonAddOnClick = () => {
    console.log(buttonAdd.data, 'buttonAdd.data')
    if (process.env.NODE_ENV === "production") {
      console.log();
      
      switch (buttonAdd.data?.params.type) {
        case "openPath":
          BX24.openPath(buttonAdd.data?.params.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(buttonAdd.data?.params, function() {
            if (buttonAdd.data?.params.updateOnCloseSlider) {
              dispatch(setTimeSliderOpened(Date.now()))
            }
          });
          break;
        case "openLink":
          window.open(buttonAdd.data?.params.link);
          break;
        default:
          break;
      }
    } else if (buttonAdd.data?.params.type === "openLink") {
      window.open(buttonAdd.data?.params.link);
    } else {
      console.log(buttonAdd.data?.params);
      return <MainForm />
    }
  };

  return (
    <Container>
      {!!buttonAdd.data && (
      <Button
        color="success"
        svgBefore="black-plus"
        buttonProps={{ onClick: buttonAddOnClick }}
      >
        {buttonAdd.data?.title}
      </Button>
      )}
      <Button
        variant="square"
        color="light"
        svgBefore="setting"
        items={[
          { label: "Выгрузка в Excel", value: "excel" }
        ]}
        dropdownDirection="left"
        itemsProps={{ onClick: handleGearClick }}
      />
      {!!items.data?.length && (
        <Button
          variant="dropdown"
          color="light"
          items={items.data}
          itemsProps={{ onClick: itemClickHandler }}
          dropdownDirection="left"
        >
          Действия
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;
