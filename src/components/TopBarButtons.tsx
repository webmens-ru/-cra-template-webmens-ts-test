import { Button, useNotification } from "@webmens-ru/ui_lib";
import { FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { TRawColumnItem, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInst } from "../app/api/baseQuery";
import { ErrorResponse } from "../app/model/query";
import { IGridState } from "../pages/main";
import {
    useLazyGetButtonAddQuery,
    useLazyGetDynamicButtonItemsQuery,
    useSendDataOnButtonClickMutation
} from "../pages/main/mainApi";
import PopupAction, { PopupActionProps } from "./PopupAction";
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
  params: IActionItemParams | null;
}

interface IActionItemParams {
  output: {
    type: string;
    documentName: string;
  };
  popup?: PopupActionProps;
  columns: string[];
  updateOnCloseSlider?: boolean;
  allowActionIsSelectedEmpty?: false;
}

export function TopBarButtons({ involvedState, excelTitle, entity, parentId: propParentId, onCloseSlider, onClosePopup }: ITopBarButtonsProps) {
  const [getItems, items] = useLazyGetDynamicButtonItemsQuery();
  const [getButtonAdd, buttonAdd] = useLazyGetButtonAddQuery();
  const [sendData] = useSendDataOnButtonClickMutation();
  const sliderService = useSlider()

  const [isShowPopup, setShowPopup] = useState(false)
  const [popupAction, setPopupAction] = useState<{ handler: string, grid?: TRowItem[], params: IActionItemParams } | null>(null)

  const { grid, checkboxes, schema, parentId } = involvedState
    const [notificationContext, notificationApi] = useNotification()

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
        Object.entries(row).filter(([key]) => item.params?.columns.includes(key))
      ));
    }

    if (item.params && item.params.popup && body?.length) {
      setShowPopup(true);
      setPopupAction({ grid: body, params: item.params, handler: item.handler });
    }

    if (body?.length && !item.params?.popup) {
      if (item.params?.output?.type === "blob") {
        const response = await axiosInst.post(item.handler, body, {
          responseType: item.params.output.type
        })

        const link = document.createElement("a");
        const title = item.params?.output?.documentName;
        link.href = URL.createObjectURL(new Blob([response.data]));
        link.download = title;
        link.click();
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
    // let body = grid.grid!.filter((row) => {
    //   const id = typeof row.id === "object" ? row.id.title : row.id;
    //   return checkboxes.includes(id);
    // })

    // if (item.params && "columns" in item.params) {
    //   // @ts-ignore
    //   body = body.map(row => Object.fromEntries(
    //     Object.entries(row).filter(([key]) => item.params?.columns.includes(key))
    //   ));
    // }

    if (item.params && item.params.popup) {
      setShowPopup(true);
      setPopupAction({ params: item.params, handler: item.handler });
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
    const gridData = checkboxes.length == 0 || checkboxes.length == grid.grid?.length
      ? grid.grid
      : grid.grid?.filter((item) => checkboxes.some((check) => check == item.id || check == (item.id as any).title))
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
          // BX24.openPath(buttonAdd.data?.params.link, function () {
          //     if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
          //         onCloseSlider();
          //     }
          // });
          break;
        case "openApplication":
          sliderService.show({
            type: "iframe",
            typeParams: { iframeUrl: "https://appv1.taxivisor.ru/lk" },
            placementOptions: { ...buttonAdd.data?.params },
            width: buttonAdd.data?.params?.bx24_width,
            // TODO: Добавить обработчик закрытия
            onClose: () => handleCloseSlider(buttonAdd.data?.params?.updateOnCloseSlider)
          })

          // BX24.openApplication(buttonAdd.data?.params, function () {
          //     if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
          //         onCloseSlider();
          //     }
          // });
          break;
        case "openLink":
          window.open(buttonAdd.data?.params.link);
          break;
        case "popup":
          setShowPopup(true);
          setPopupAction({ params: buttonAdd.data?.params, handler: buttonAdd.data?.params?.handler });
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

    const handlePopupSubmit = (values?: FormValues) => {
        if (popupAction) {
            const body = {grid: popupAction.grid, form: values}
            return axiosInst
                .post(popupAction.handler, body, {responseType: "output" in popupAction.params ? "blob" : "json"})
                .then((response) => {
                    if (response?.data && "notification" in response.data) {
                        notificationApi.show(response.data.notification)
                    }
                    setShowPopup(false)
                })
                .catch((err: AxiosError<ErrorResponse>) => {
                    setShowPopup(false)
                    if (err.response?.data && "notification" in err.response.data) {
                        notificationApi.show(err.response.data.notification)
                    }
                })
        } else {
            return Promise.all([])
        }
    }

  const afterPopupSubmit = (response: any) => {
    if (popupAction && popupAction.params.output && response.data) {
      const link = document.createElement("a")
      const title = popupAction.params.output.documentName
      link.href = URL.createObjectURL(new Blob([response.data]))
      link.download = title //TODO: Убрать дату и расширение. Добавить расширение в title
      link.click()
    }

    if (popupAction && popupAction.params.updateOnCloseSlider && onClosePopup) {
      onClosePopup()
    }
  }

  const handleCloseModal = () => {
    setShowPopup(false)
    setPopupAction(null)
  }

  useEffect(() => {
    if (entity) {
      getItems({ entity, parentId: propParentId });
      getButtonAdd({ entity, parentId });
    }
  }, [getItems, getButtonAdd, entity, parentId, propParentId]);

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
      {(isShowPopup && !!popupAction?.params.popup) && (
        <PopupAction
          {...popupAction.params.popup}
          onClose={handleCloseModal}
          onSubmit={handlePopupSubmit}
          onAfterSubmit={afterPopupSubmit}
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
