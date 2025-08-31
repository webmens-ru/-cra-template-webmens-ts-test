// customCard.tsx
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
  useLazyGetHelpButtonQuery,
  useGetPriceMutation
} from "./customCardApi";
import { MainCardContainer, MainCardHeaderContainer, MainCardTitle, MainCardHeaderActionsContainer, PriceContainer, PriceLoading, PriceValue, PriceError } from "./styles";
import { MainCardPath } from "./types";
import type { FormMode } from "../../components/form";
import { Loader } from "../../components/loader";
import { Menu } from "../../components/menu";
import { Button } from "../../components/button";
import { FormValues } from "../../components/form";

interface MainCardProps {
  path: MainCardPath;
  entity: string;
  menuId: number;
  parentId?: number;
  form?: MainFormProps;
}

export default function CustomCard(props: MainCardProps) {
  const sliderService = useSlider()

  const [parentId, setParentId] = useState(props.parentId)
  const [currentTab, setCurrentTab] = useState<any>(null)
  const [onCreateState, setOnCreateState] = useState<boolean>(!parentId)
  const [formMode, setFormMode] = useState<FormMode>(onCreateState ? "edit" : props.form?.mode || "view")

  // ДОБАВИМ СОСТОЯНИЯ ДЛЯ ЦЕНЫ
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [isPriceLoading, setIsPriceLoading] = useState(false)
  const [lastFormValues, setLastFormValues] = useState<FormValues>({})

  const { data: title } = useGetPageTitleQuery({ id: parentId, entity: props.entity })
  const [getActionButtons, actionButtons] = useLazyGetActionButtonsQuery();
  const [getHelpButton, helpButton] = useLazyGetHelpButtonQuery()
  const [getPrice] = useGetPriceMutation();
  const { tabs } = useMenuData(props.menuId);

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ calculatePrice
  const calculatePrice = useCallback(async (values: FormValues) => {
    if (Object.keys(values).length === 0) return;

    setIsPriceLoading(true);
    try {
      const priceData = await getPrice({
        entity: props.entity,
        data: values
      }).unwrap();

      setCurrentPrice(priceData);
    } catch (error) {
      console.error('Ошибка при расчете стоимости:', error);
      setCurrentPrice(null);
    } finally {
      setIsPriceLoading(false);
    }
  }, [getPrice, props.entity]);

  useEffect(() => {
    if (Object.keys(lastFormValues).length > 0) {
      const timeoutId = setTimeout(() => {
        calculatePrice(lastFormValues);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [lastFormValues, calculatePrice]);

  const handleFormSubmit = (values: any) => {
    setOnCreateState(false);
    setFormMode("view");

    if ("id" in values) {
      setParentId(values.id);
    }
  };

  // ДОБАВИМ ОБРАБОТЧИК ИЗМЕНЕНИЙ ФОРМЫ
  const handleFormValuesChange = useCallback((values: FormValues) => {
    setLastFormValues(values);
  }, []);

  const renderContentByPath = useCallback(() => {
    if (tabs.isLoading || !currentTab) {
      return <Loader />;
    }

    switch (currentTab?.params?.path) {
      case "mainCard":
        return (
            <MainForm
                  height="calc(100vh - 128px)"
                  {...props.form}
                  entity={props.entity}
                  id={parentId}
                  action={parentId ? "update" : "create"}
                  mode={formMode}
                  onAfterSubmit={handleFormSubmit}
                  onValuesChange={handleFormValuesChange}
              />
        );
      case "mainCardChildren":
        return (
            <MainPlacement
                entity={currentTab.params.entity}
                parentId={parentId}
                viewMode={currentTab.params.viewMode}
            />
        );
      case "mainCardIframe":
        return <MainIframe src={currentTab.params.link} queryParams={{ parentId }} />;
      default:
        return "error";
    }
  }, [currentTab, formMode, parentId, props.entity, props.form, tabs.isLoading, isPriceLoading, currentPrice, handleFormValuesChange]);

  useLayoutEffect(() => {
    if (parentId) {
      getActionButtons({ entity: props.entity, id: parentId });
    }
  }, [getActionButtons, props.entity, parentId]);

  useLayoutEffect(() => {
    getHelpButton({ entity: props.entity });
  }, [getHelpButton, props.entity]);

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
    if (tabs.isSuccess) {
      setCurrentTab(tabs.data[0]);
    }
  }, [tabs.data, tabs.isSuccess]);

  return (
      <MainCardContainer>
        <MainCardHeaderContainer>
          <MainCardTitle children={title || "Создание"} />
          <>
            {isPriceLoading ? (
                <PriceLoading>Price...</PriceLoading>
            ) : currentPrice !== null ? (
                <PriceValue>Price: {currentPrice}</PriceValue>
            ) : (
                <PriceError>Failed to calculate cost</PriceError>
            )}
          </>
          <MainCardHeaderActionsContainer>
            {(actionButtons.isSuccess && actionButtons.data) && (
                <ActionButtons disabled={onCreateState} actions={actionButtons.data} parentId={parentId} />
            )}
            {helpButton.data && (
                <Button
                    color="gray"
                    svgBefore="help"
                    variant="square"
                    onClick={buttonHelpOnClick}
                />
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
                  showNativeSlider={window._APP_TYPE_ !== 'site'}
              />
          )}
        </div>

        {renderContentByPath()}
      </MainCardContainer>
  );
}