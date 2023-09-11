import { Loader, Menu } from "@webmens-ru/ui_lib";
import { FormMode } from "@webmens-ru/ui_lib/dist/components/form/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useMenuData } from "../../app/hooks/useMenuData";
import useSlider from "../../components/slider/hooks/useSlider";
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
  const sliderService = useSlider()

  const [parentId, setParentId] = useState(props.parentId)
  const [currentTab, setCurrentTab] = useState<any>(null)
  const [onCreateState, setOnCreateState] = useState<boolean>(!parentId)
  const [formMode, setFormMode] = useState<FormMode>(onCreateState ? "edit" : props.form?.mode || "view")

  const { data: title } = useGetPageTitleQuery({ id: parentId, entity: props.entity })
  const [getActionButtons, actionButtons] = useLazyGetActionButtonsQuery()
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
