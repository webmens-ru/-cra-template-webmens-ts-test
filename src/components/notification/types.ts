export interface NotificationProps {
  content?: React.ReactNode;
  timeout?: number;
  type?: NotificationTypes;
  closable?: boolean;
}

export interface Notification extends NotificationProps {
  id: number;
}

export type NotificationTypes = "success" | "info" | "warning" | "error";

export interface NotificationItemProps extends Notification {
  onFinish: (nid: number) => void;
}

export interface NotificationAPI {
  show: (props?: NotificationProps) => void;
}
