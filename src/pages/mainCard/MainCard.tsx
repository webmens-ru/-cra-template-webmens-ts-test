import { Loader, Menu } from "@webmens-ru/ui_lib";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useMenuData } from "../../app/hooks/useMenuData";
import MainForm, { MainFormProps } from "../mainForm/mainForm";
import MainPlacement from "../mainPlacement/MainPlacement";
import ActionButtons from "./components/ActionsButtons";
import { useGetPageTitleQuery, useLazyGetActionButtonsQuery } from "./mainCardApi";
import { MainCardContainer, MainCardHeaderActionsContainer, MainCardHeaderContainer, MainCardTitle } from "./styles";
import { MainCardPath } from "./types";

interface MainCardProps {
  path: MainCardPath;
  entity: string;
  menuId: number;
  parentId?: number;
  form?: MainFormProps;
}

export default function MainCard(props: MainCardProps) {
  const { data: title } = useGetPageTitleQuery({ id: props.parentId, entity: props.entity })
  const [getActionButtons, actionButtons] = useLazyGetActionButtonsQuery()
  const { tabs, setTab } = useMenuData(props.menuId);

  const [currentTab, setCurrentTab] = useState<any>(null)
  const [onCreateState, setOnCreateState] = useState<boolean>(!props.parentId)

  const handleFormSubmit = () => {

  }

  const renderContentByPath = useCallback(() => {
    if (tabs.isLoading || !currentTab) {
      return <Loader />
    }

    switch (currentTab?.params?.path) {
      case "mainCard":
        return (
          <MainForm
            height="80%"
            {...props.form}
            entity={props.entity}
            id={props.parentId}
            onAfterSubmit={handleFormSubmit}
          />
        )
      case "mainCardChildren":
        return <MainPlacement entity={currentTab.params.entity} parentId={props.parentId} />
      default:
        // TODO: Вернуть текст с ошибкой
        return "error"
    }
  }, [currentTab, props.entity, props.form, props.parentId, tabs.isLoading])

  useLayoutEffect(() => {
    if (props.parentId) {
      getActionButtons({ entity: props.entity, id: props.parentId })
    }
  }, [getActionButtons, props.entity, props.parentId])

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
            <ActionButtons disabled={onCreateState} actions={actionButtons.data} />
          )}
        </MainCardHeaderActionsContainer>
      </MainCardHeaderContainer>

      <div style={{ marginBottom: 15 }}>
        {!tabs.isLoading && (
          <Menu
            disabled={onCreateState}
            menuStyle="card"
            items={tabs.data}
            setItem={(tab) => setCurrentTab(tab)}
          />
        )}
      </div>

      {renderContentByPath()}
    </MainCardContainer>
  )
}
