import React, { useEffect } from "react";
import { Button } from "@webmens-ru/ui_lib";
import styled from "styled-components";
import { TColumnItem, TRowID, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid";
import { useLazyGetButtonAddQuery, useLazyGetDynamicButtonItemsQuery, useSendDataOnButtonClickMutation } from "../pages/main/mainApi";
import { axiosInst } from "../app/api/baseQuery";

interface TopBarButtonsProps {
  involvedState: any;
  excelTitle?: string;
  entity?: string;
}

export function TopBarButtons({ involvedState, excelTitle, entity }: TopBarButtonsProps) {
  const [getItems, items] = useLazyGetDynamicButtonItemsQuery();
  const [getButtonAdd, buttonAdd] = useLazyGetButtonAddQuery();
  const [sendData] = useSendDataOnButtonClickMutation();
  const { grid, checkboxes, schema } = involvedState

  useEffect(() => {
    if (entity) {
      getItems(entity);
      getButtonAdd(entity);
    }
  }, [getItems, getButtonAdd, entity]);

  const itemClickHandler = (item: any) => {
    const body = grid.grid!.filter((item: TRowItem) => {
      const id = typeof item.id === "object" ? item.id.title : item.id
      return checkboxes.includes(id as TRowID)
    })

    if (body)
      sendData({ url: item.handler, body });
  };

  const handleGearClick = async (item: any) => {

    const gridData = checkboxes.length === 0 || checkboxes.length === grid.grid?.length
      ? grid.grid
      : grid.grid?.filter((item: TRowItem) => checkboxes.some((check: TRowID) => check === item.id || check === (item.id as any).title))

    const response = await axiosInst.post('/admin/excel/get-excel', {
      schema: schema.filter((item: TColumnItem) => item.visible),
      grid: gridData || [],
      footer: gridData?.length === grid.grid?.length ? grid.footer : []
    }, {
      responseType: "blob"
    })

    const link = document.createElement("a")
    const title = excelTitle || "Excel"
    link.href = URL.createObjectURL(new Blob([response.data]))
    link.download = `${title} ${new Date().toLocaleString().slice(0, 10)}.xlsx`
    link.click()
  }

  const buttonAddOnClick = async () => {
    console.log(buttonAdd.data, 'buttonAdd.data')
    if (process.env.NODE_ENV === "production") {
      console.log();

      switch (buttonAdd.data?.params.type) {
        case "openPath":
          BX24.openPath(buttonAdd.data?.params.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(buttonAdd.data?.params, function () {
            if (buttonAdd.data?.params.updateOnCloseSlider) {
              // dispatch(setTimeSliderOpened(Date.now()))
              // TODO: Сделать функцию в хуке useData по вызову обновления
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
