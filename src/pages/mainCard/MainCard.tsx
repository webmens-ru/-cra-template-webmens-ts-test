import { Loader, Menu, Button } from "@webmens-ru/ui_lib";
import { FormMode } from "@webmens-ru/ui_lib/dist/components/form/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useMenuData } from "../../app/hooks/useMenuData";
import useSlider from "../../components/slider/hooks/useSlider";
import MainForm, { MainFormProps } from "../mainForm/mainForm";
import MainIframe from "../mainIframe/mainIframe";
import MainPlacement from "../mainPlacement/MainPlacement";
import ActionButtons from "./components/ActionsButtons";
import {
  useGetPageTitleQuery,
  useLazyGetActionButtonsQuery,
  useLazyGetHelpButtonQuery
} from "./mainCardApi";
import { MainCardContainer, MainCardHeaderActionsContainer, MainCardHeaderContainer, MainCardTitle } from "./styles";
import { MainCardPath } from "./types";
import {Buttons} from "@webmens-ru/ui_lib/dist/components/calendar";

interface MainCardProps {
  path: MainCardPath;
  entity: string;
  menuId: number;
  parentId?: number;
  form?: MainFormProps;
}

export default function MainCard(props: MainCardProps) {
  const sliderService = useSlider()

  const [parentId, setParentId] = useState(props.parentId)
  const [currentTab, setCurrentTab] = useState<any>(null)
  const [onCreateState, setOnCreateState] = useState<boolean>(!parentId)
  const [formMode, setFormMode] = useState<FormMode>(onCreateState ? "edit" : props.form?.mode || "view")

  const { data: title } = useGetPageTitleQuery({ id: parentId, entity: props.entity })
  const [getActionButtons, actionButtons] = useLazyGetActionButtonsQuery();
  const [getHelpButton, helpButton] = useLazyGetHelpButtonQuery()
  const { tabs } = useMenuData(props.menuId);

  const handleFormSubmit = (values: any) => {
    setOnCreateState(false)
    setFormMode("view")

    if ("id" in values) {
      setParentId(values.id)
    }
  }

  const renderContentByPath = useCallback(() => {
    if (tabs.isLoading || !currentTab) {
      return <Loader />
    }

    switch (currentTab?.params?.path) {
      case "mainCard":
        return (
          <MainForm
            height="calc(100vh - 110px)"
            {...props.form}
            entity={props.entity}
            id={parentId}
            action={parentId ? "update" : "create"}
            mode={formMode}
            onAfterSubmit={handleFormSubmit}
          />
        )
      case "mainCardChildren":
        return <MainPlacement entity={currentTab.params.entity} parentId={parentId} />
      case "mainCardIframe":
        return <MainIframe src={currentTab.params.link} queryParams={{ parentId }} />
      default:
        // TODO: Вернуть текст с ошибкой
        return "error"
    }
  }, [currentTab, formMode, parentId, props.entity, props.form, tabs.isLoading])

  useLayoutEffect(() => {
    if (parentId) {
      getActionButtons({ entity: props.entity, id: parentId })
    }
  }, [getActionButtons, props.entity, parentId])

  useLayoutEffect(() => {
    getHelpButton({ entity: props.entity })
  }, [getHelpButton, props.entity])

  const buttonHelpOnClick = async () => {
    switch (helpButton.data?.params.type) {
      // case "openPath":
      //   // BX24.openPath(buttonAdd.data?.params.link, function () {
      //   //     if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
      //   //         onCloseSlider();
      //   //     }
      //   // });
      //   break;
      // case "openApplication":
      //   sliderService.show({
      //     type: "iframe",
      //     typeParams: { iframeUrl: "https://appv1.taxivisor.ru/lk" },
      //     placementOptions: { ...gelpButton.data?.params },
      //     width: gelpButton.data?.params?.bx24_width,
      //     // TODO: Добавить обработчик закрытия
      //     onClose: () => handleCloseSlider(gelpButton.data?.params?.updateOnCloseSlider)
      //   })
      //
      //   // BX24.openApplication(buttonAdd.data?.params, function () {
      //   //     if (buttonAdd.data?.params.updateOnCloseSlider && onCloseSlider) {
      //   //         onCloseSlider();
      //   //     }
      //   // });
      //   break;
      case "openLink":
        window.open(helpButton.data?.params.link);
        break;
      // case "popup":
      //   setShowPopup(true);
      //   setPopupAction({ params: gelpButton.data?.params, handler: gelpButton.data?.params?.handler });
      //   break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (tabs.isSuccess) {
      setCurrentTab(tabs.data[0])
    }
  }, [tabs.data, tabs.isSuccess])

  return (
    <MainCardContainer>
      <MainCardHeaderContainer>
        <MainCardTitle children={title || "Создание"} />
        <MainCardHeaderActionsContainer>
          {(actionButtons.isSuccess && actionButtons.data) && (
            <ActionButtons disabled={onCreateState} actions={actionButtons.data} parentId={parentId}/>
          )}
        </MainCardHeaderActionsContainer>
        {helpButton.data && (
            <Button
                color="gray"
                svgBefore="reload"
                variant="square"
                onClick={buttonHelpOnClick}
            />
        )}
      </MainCardHeaderContainer>

      <div style={{ marginBottom: 15 }}>
        {!tabs.isLoading && (
          <Menu
            disabled={onCreateState}
            menuStyle="card"
            items={tabs.data}
            setItem={(tab) => setCurrentTab(tab)}
            sliderOpenner={(params) => sliderService.show(params)}
          />
        )}
      </div>

      {renderContentByPath()}
    </MainCardContainer>
  )
}
