import { Tooltip } from "react-tooltip";
import type { BurgerItem } from "../../grid";
import ReactDOM from "react-dom";

interface ActionsTooltipProps {
  target: HTMLElement | null;
  actions: BurgerItem[];
}

export default function ActionsTooltip({
  target,
  actions,
}: ActionsTooltipProps) {
  return ReactDOM.createPortal(
    <Tooltip id="timeline-action-tooltip" style={{ zIndex: 50 }}>
      {actions.map(item => (
        <span key={item.id}>
          {item.title}
        </span>
      ))}
    </Tooltip>,
    document.body
  );
}
