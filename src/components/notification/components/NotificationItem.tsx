import React, { useEffect } from "react";
import { NOTIFICATION_TYPES } from "../consts";
import { NotificationCloseBtn, NotificationContainer, NotificationContent, NotificationIcon } from "../styles";
import { NotificationItemProps } from "../types";
import notificationIcons from "./icons";

export default function NotificationItem({
  id,
  closable = true,
  content = "",
  timeout = 5000,
  type,
  onFinish,
}: NotificationItemProps) {
  
  useEffect(() => {
    if (timeout > 0) {
      setTimeout(() => {
        onFinish(id)
      }, timeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getIconByType = () => {
    if (!type || !NOTIFICATION_TYPES.includes(type)) {
      return
    }

    const icon = notificationIcons[type]
    return icon()
  }

  return (
    <NotificationContainer>
      {type && <NotificationIcon children={getIconByType()} />}
      <NotificationContent children={content} />
      {closable && <NotificationCloseBtn onClick={() => onFinish(id)} />}
    </NotificationContainer>
  )
}
