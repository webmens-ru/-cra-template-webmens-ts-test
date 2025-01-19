import React, { useEffect, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import NotificationsList from "../components/NotificationsList"
import { Notification, NotificationAPI, NotificationProps } from "../types"
import { getRootEl } from "../utils"

export const useNotification = (containerId = "wm-notifications-root"): [React.ReactPortal, NotificationAPI] => {
  const [rootEl] = useState<HTMLElement>(getRootEl(containerId))
  const [notifications, setNotifications] = useState<Notification[]>([])

  // TODO: Добавить дефолтные значения
  // closable = true
  // timeout = 0 | undefined
  const addNotification = (notificationProps?: NotificationProps) => {
    setNotifications([...notifications, { ...notificationProps, id: Date.now() }])
  }

  const closeNotification = (nid: number) => {
    // console.log(notifications.filter(item => item.id !== nid))
    setNotifications((prevState) => {
      return prevState.filter(item => item.id !== nid)
    })
  }

  const Notifications = useMemo(() => {
    const notificationsList = <NotificationsList notifications={notifications} onFinish={closeNotification} />
    return ReactDOM.createPortal(notificationsList, rootEl)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, rootEl])

  useEffect(() => {
    document.body.appendChild(rootEl)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notificationApi: NotificationAPI = {
    show: addNotification
  }

  return [Notifications, notificationApi]
}
