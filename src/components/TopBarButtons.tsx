import { Button, useNotification } from "@webmens-ru/ui_lib";
import { TRawColumnItem, TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { useEffect } from "react";
import styled from "styled-components";
import { axiosInst } from "../app/api/baseQuery";
import usePopupHandler from "../app/hooks/usePopupHandler";
import { PopupActionParams } from "../app/model/popup-action";
import { getPrintFrame } from "../app/utils/print";
import { IGridState } from "../pages/main";
import {
    useLazyGetButtonAddQuery,
    useLazyGetDynamicButtonItemsQuery,
    useLazyGetHelpButtonQuery,
    useSendDataOnButtonClickMutation
} from "../pages/main/mainApi";
import PopupAction from "./PopupAction";
import useSlider from "./slider/hooks/useSlider";

interface ITopBarButtonsProps {
  involvedState: {
    schema: TRawColumnItem[]
    grid: IGridState;
    checkboxes: TRowID[]
    parentId?: string | number;
  };
  excelTitle?: string;
  entity?: string;
  parentId?: string | number;
  onCloseSlider?: () => void;
  onClosePopup?: () => void;
}

interface IActionItem {
  id: number;
  entityCode: string;
  label: string;
  handler: string;
  params: PopupActionParams | null;
}

export function TopBarButtons({ involvedState, excelTitle, entity, parentId: propParentId, onCloseSlider, onClosePopup }: ITopBarButtonsProps) {
  const [getItems, items] = useLazyGetDynamicButtonItemsQuery();
  const [getButtonAdd, buttonAdd] = useLazyGetButtonAddQuery();
  const [sendData] = useSendDataOnButtonClickMutation();
  const [getHelpButton, helpButton] = useLazyGetHelpButtonQuery();
  const sliderService = useSlider();

  const [notificationContext, notificationAPI] = useNotification()
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({ notificationAPI, onClosePopup })
  const { grid, checkboxes, schema, parentId } = involvedState

  // TODO: Добавить обработку gridEmpty
  const itemClickHandler = async (item: IActionItem) => {
    let body = item.params?.allowActionIsSelectedEmpty
      ? grid.grid
      : grid.grid!.filter((row) => {
        const id = typeof row.id === "object" ? row.id.title : row.id;
        return checkboxes.includes(id);
      })

    if (item.params && "columns" in item.params) {
      // @ts-ignore
      body = body.map(row => Object.fromEntries(
        Object.entries(row).filter(([key]) => item.params?.columns?.includes(key))
      ));
    }

    if (item.params && item.params.popup && body?.length) {
      popupProps.show({ grid: body, params: item.params, handler: item.handler })
    }

    if (body?.length && !item.params?.popup) {
      if (item.params?.output?.type === "blob") {
        const response = await axiosInst.post(item.handler, body, {
          responseType: item.params.output.type
        })
        if (!item.params?.output?.action || item.params?.output?.action === 'download') {
          const link = document.createElement("a");
          const title = item.params?.output?.documentName || "";
          link.href = URL.createObjectURL(new Blob([response.data]));
          link.download = title;
          link.click();
        }
        if (item.params?.output?.action === 'print') {
          const printContent = response.data
          const printFrame = getPrintFrame()
          if (!printFrame) return

          printFrame.document.body.innerHTML = printContent
          setTimeout(() => {
            printFrame.window.focus()
            printFrame.window.print()
          }, 1000)
        }
        if (item.params.updateOnCloseSlider && onCloseSlider) {
          onCloseSlider()
        }
      } else {
        await sendData({ url: item.handler, body }).then(() => {
          if (item.params?.updateOnCloseSlider && onCloseSlider) {
            onCloseSlider()
          }
        });
      }
    }
  };

  const addButtonItemClickHandler = async (item: IActionItem) => {
    if (item.params && item.params.popup) {
      popupProps.show({ params: item.params, handler: item.handler })
    }

    if (!item.params?.popup) {
      await sendData({ url: item.handler, body: {} }).then(() => {
        if (item.params?.updateOnCloseSlider && onCloseSlider) {
          onCloseSlider()
        }
      });
    }
  };

  const handleGearClick = async (item: any) => {
    const gridData = checkboxes.length === 0 || checkboxes.length === grid.grid?.length
      ? grid.grid
      : grid.grid?.filter((item) => checkboxes.some((check) => check === item.id || check === (item.id as any).title))
    const response = await axiosInst.post('/admin/excel/get-excel', {
      schema: schema.filter((item) => item.visible).sort((a, b) => a.order - b.order),
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

  const handleCloseSlider = (updateOnClose: boolean = true) => {
    sliderService.hide()

    if (updateOnClose && onCloseSlider) {
      onCloseSlider()
    }
  }

  const buttonAddOnClick = async () => {
    if (process.env.NODE_ENV === "production") {
      switch (buttonAdd.data?.params.type) {
        case "openPath":
          BX24.openPath(buttonAdd.data?.params.link, function () {
            if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
              onCloseSlider();
            }
          });
          break;
        case "openApplication":
          if (window._APP_TYPE_ === 'site') {
            sliderService.show({
              type: "iframe",
              typeParams: { iframeUrl: buttonAdd.data?.params?.iframeUrl },
              placementOptions: { ...buttonAdd.data?.params },
              width: buttonAdd.data?.params?.bx24_width,
              onClose: () => handleCloseSlider(buttonAdd.data?.params?.updateOnCloseSlider)
            })
          } else {
            BX24.openApplication(buttonAdd.data?.params, function () {
              if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
                onCloseSlider();
              }
            });
          }
          break;
        case "openLink":
          window.open(buttonAdd.data?.params.link);
          break;
        case "popup":
          popupProps.show({ params: buttonAdd.data?.params, handler: buttonAdd.data?.params?.handler })
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

  const buttonHelpOnClick = async () => {
    switch (helpButton.data?.params.type) {
      case "openLink":
        window.open(helpButton.data?.params.link);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (entity) {
      getItems({ entity, parentId: propParentId });
      getButtonAdd({ entity, parentId });
      getHelpButton({ entity })
    }
  }, [getItems, getButtonAdd, entity, parentId, propParentId, getHelpButton]);

  return (
    <Container>
      {notificationContext}
      {!!buttonAdd.data && !buttonAdd.data?.items && (
        <Button
          color="success"
          svgBefore="black-plus"
          buttonProps={{ onClick: buttonAddOnClick }}
        >
          {buttonAdd.data?.title}
        </Button>
      )}
      {!!buttonAdd.data && !!buttonAdd.data?.items && (
        <Button
          color="success"
          svgBefore="black-plus"
          items={buttonAdd.data.items}
          dropdownDirection="left"
          itemsProps={{ onClick: addButtonItemClickHandler }}
          buttonProps={{ onClick: buttonAddOnClick }}
        >
          {buttonAdd.data?.title}
        </Button>
      )}
      <Button
        variant="square"
        color="light"
        svgBefore="setting"
        items={[{ label: "Выгрузка в Excel", value: "excel" }]}
        dropdownDirection="left"
        itemsProps={{ onClick: handleGearClick }}
      />
      {!!items.data?.length && (
        <Button
          children="Действия"
          variant="dropdown"
          color="light"
          items={items.data}
          itemsProps={{ onClick: itemClickHandler }}
          dropdownDirection="left"
        />
      )}
      {!!helpButton.data && (
        <Button
          color="gray"
          svgBefore="help"
          variant="square"
          onClick={buttonHelpOnClick}
        />
      )}
      {(isShowPopup && !!popupAction?.params.popup) && (
        <PopupAction
          {...popupAction.params.popup}
          onClose={popupProps.close}
          onSubmit={(form) => popupProps.handlePopupSubmit({ form, parentId })}
          onAfterSubmit={popupProps.afterPopupSubmit}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;
