import { NotificationTypes } from "../../types"
import { ErrorIcon } from "./ErrorIcon"
import { InfoIcon } from "./InfoIcon"
import { SuccessIcon } from "./SuccessIcon"
import { WarningIcon } from "./WarningIcon"

const notificationIcons: { [key in NotificationTypes]: () => JSX.Element } = {
  error: ErrorIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  info: InfoIcon
}

export default notificationIcons
