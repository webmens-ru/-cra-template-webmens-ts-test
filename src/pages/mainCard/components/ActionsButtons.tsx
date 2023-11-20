import { Button, useNotification } from "@webmens-ru/ui_lib";
import styled from "styled-components";
import usePopupHandler from "../../../app/hooks/usePopupHandler";
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
  const [notificationContext, notificationAPI] = useNotification()
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({ notificationAPI, onClosePopup })

  const handleButtonAction = async (item: { params: ActionButtonParams, handler: string }) => {
    if (item.params && item.params.popup) {
      popupProps.show({ params: item.params, handler: item.handler })
    }

    if (!item.params?.popup) {
      await sendData({ url: item.handler, body: { parentId } })
        .then((response: any) => {
          if (response.data && response.data.notification)
            notificationAPI.show(response.data.notification)
        })
        .catch((err) => {

        })
    }
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
          onClose={popupProps.close}
          onSubmit={(form) => popupProps.handlePopupSubmit({ form, parentId })}
          onAfterSubmit={popupProps.afterPopupSubmit}
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
