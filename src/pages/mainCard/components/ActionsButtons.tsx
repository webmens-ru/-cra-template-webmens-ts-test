import { Button, useNotification } from "@webmens-ru/ui_lib";
import { FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { useState } from "react";
import styled from "styled-components";
import { axiosInst } from "../../../app/api/baseQuery";
import { ActionButton, ActionButtonParams } from "../../../app/model/action-button";
import PopupAction from "../../../components/PopupAction";
import { useSendDataOnButtonClickMutation } from "../../main";

interface ActionButtonsProps {
  actions: Array<ActionButton>;
  disabled?: boolean;
  parentId?: string | number;
  onClosePopup?: () => void
}

export default function ActionButtons({ actions, disabled, parentId, onClosePopup }: ActionButtonsProps) {
  const [sendData] = useSendDataOnButtonClickMutation();
  const [notificationContext, notificationApi] = useNotification()

  const [isShowPopup, setShowPopup] = useState(false)
  const [popupAction, setPopupAction] = useState<{ params: ActionButtonParams, handler: string } | null>(null)

  const handleButtonAction = async (item: { params: ActionButtonParams, handler: string }) => {
    setPopupAction(item)

    if (item.params && item.params.popup) {
      setShowPopup(true);
      setPopupAction({ params: item.params, handler: item.handler });
    }

    if (!item.params?.popup) {
      await sendData({ url: item.handler, body: { parentId } })
        .then((response: any) => {
          if (response.data && response.data.notification)
            notificationApi.show(response.data.notification)
        })
        .catch((err) => {

        })
    }
  }

  const handlePopupSubmit = (values?: FormValues) => {
    if (popupAction) {
      const body = { form: values, parentId }
      return axiosInst.post(popupAction.handler, body, { responseType: "output" in popupAction.params ? "blob" : "json" })
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

  const handleClosePopup = () => {
    setShowPopup(false)
    setPopupAction(null)
  }

  return (
    <ActionButtonsContainer>
      {notificationContext}

      <Button
        disabled={disabled}
        children="Действие"
        color="gray"
        variant="dropdown"
        items={actions}
        itemsProps={{ onClick: handleButtonAction }}
        dropdownDirection="left"
      />
      {(isShowPopup && !!popupAction?.params.popup) && (
        <PopupAction
          {...popupAction.params.popup}
          onClose={handleClosePopup}
          onSubmit={handlePopupSubmit}
          onAfterSubmit={afterPopupSubmit}
        />
      )}
    </ActionButtonsContainer>
  )
}

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;
