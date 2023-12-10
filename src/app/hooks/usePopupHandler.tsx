import { NotificationAPI } from "@webmens-ru/ui_lib/dist/components/notification/types";
import { AxiosError } from "axios";
import { useState } from "react";
import { axiosInst } from "../api/baseQuery";
import { PopupAction } from "../model/popup-action";
import { ErrorResponse } from "../model/query";
import { getPrintFrame } from "../utils/print";

interface usePopupHandlerProps {
  notificationAPI: NotificationAPI;
  onClosePopup?: VoidFunction;
}

export default function usePopupHandler({ notificationAPI, onClosePopup }: usePopupHandlerProps) {
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [popupAction, setPopupAction] = useState<PopupAction | null>(null)

  const handlePopupSubmit = (body: any) => {
    if (!popupAction) {
      return Promise.all([])
    }

    const responseType = !popupAction.params.output?.action || popupAction.params.output.action === "download" ? "blob"
      : popupAction.params.output.action === "print" ? "document" : "json"

    return axiosInst
      .post(popupAction.handler, body, { responseType })
      .then((response) => {
        if (response?.data && "notification" in response.data) {
          notificationAPI.show(response.data.notification)
        }
        setIsShowPopup(false)
        return response
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        setIsShowPopup(false)
        if (err.response?.data && "notification" in err.response.data) {
          notificationAPI.show(err.response.data.notification)
        }
      })
  }

  const afterPopupSubmit = (response: any) => {
    const action = popupAction?.params?.output?.action

    if (popupAction?.params.output !== undefined && (action === undefined || action === 'download')) {
      const link = document.createElement("a");
      const title = popupAction?.params?.output?.documentName || "";
      link.href = URL.createObjectURL(new Blob([response.data]));
      link.download = title;
      link.click();
    }

    if (popupAction?.params.output !== undefined && action === 'print') {
      const printContent = response.data
      const printFrame = getPrintFrame()
      if (!printFrame || !printContent?.body) return

      printFrame.document.body.innerHTML = printContent.body.innerHTML
      setTimeout(() => {
        printFrame.window.focus()
        printFrame.window.print()
      }, 1000)
    }

    if (popupAction && popupAction.params.updateOnCloseSlider && onClosePopup) {
      onClosePopup()
    }
  }

  const show = (params: PopupAction) => {
    setIsShowPopup(true)
    setPopupAction(params)
  }

  const close = () => {
    setIsShowPopup(false)
    setPopupAction(null)
  }

  return {
    isShowPopup,
    show,
    close,
    popupAction,
    handlePopupSubmit,
    afterPopupSubmit,
  }
}
