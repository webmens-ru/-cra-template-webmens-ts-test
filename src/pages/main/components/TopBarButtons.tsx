import React, { useEffect } from "react";
import { Button } from "@webmens-ru/ui_lib";
import styled from "styled-components";
import { useAppSelector } from "../../../app/store/hooks";
import { useLazyGetDynamicButtonItemsQuery, useSendDataOnButtonClickMutation } from "../mainApi";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { axiosInst } from "../../../app/api/baseQuery";

export function TopBarButtons() {
  const { mainSlice } = useAppSelector((state) => state);
  const [getItems, items] = useLazyGetDynamicButtonItemsQuery();
  const [sendData] = useSendDataOnButtonClickMutation();

  useEffect(() => {
    if (mainSlice.currentTab?.params?.entity) {
      getItems(mainSlice.currentTab?.params?.entity);
    }
  }, [getItems, mainSlice.currentTab?.params?.entity]);

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

  return (
    <Container>
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
