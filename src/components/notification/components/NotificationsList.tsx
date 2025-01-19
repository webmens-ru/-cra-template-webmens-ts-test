import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Notification } from "../types";
import NotificationItem from "./NotificationItem";

interface NotificationsListProps {
  notifications: Notification[]
  onFinish: (nid: number) => void;
}

export default function NotificationsList({ notifications, onFinish }: NotificationsListProps) {
  return (
    <TransitionGroup>
      {notifications.map(item => (
        <CSSTransition key={item.id} timeout={300}>
          <NotificationItem
            {...item}
            onFinish={onFinish}
          />
        </CSSTransition>

      ))}
    </TransitionGroup>
  )
}
