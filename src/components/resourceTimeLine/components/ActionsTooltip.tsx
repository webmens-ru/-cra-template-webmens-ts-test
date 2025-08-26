import { type CSSProperties } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import type { TimelineAction } from "../types";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface ActionsTooltipProps {
  cellRect: DOMRect;
  actions?: TimelineAction[];
  onAction: (action: TimelineAction) => void
  onClose?: VoidFunction
}

const TooltipContainer = styled.div`
  position: absolute;
  padding: 8px;
  border-radius: .25em;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px;
  z-index: 100;

  &::before {
    content: '';
    display: block;  
    position: absolute;
    left: 50%;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    display: block;  
    position: absolute;
    left: 50%;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-bottom-color: #FFF;
    transform: translateX(-50%);
  }
`

const TooltipListItem = styled.li`
  padding: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(198, 205, 211);
  }
`

export default function ActionsTooltip({
  cellRect,
  actions = [],
  onAction,
  onClose = () => {}
}: ActionsTooltipProps) {
  const tooltipRef = useClickOutside<HTMLDivElement>(onClose, {
    ignoreSelectors: ['.fc-timeline-slots']
  })
  const timelineBodyContainer = document.querySelector('.fc .fc-scrollgrid .fc-scroller.fc-scroller-liquid-absolute .fc-timeline-body')

  if (!timelineBodyContainer) return <></>

  const containerRect = timelineBodyContainer.getBoundingClientRect()

  const cellPosition = {
    top: cellRect.y - containerRect.y,
    left: cellRect.x - containerRect.x
  }

  // TODO: Доработать определение стороны открытия тултипа
  const haveSpaceBottom = true

  const tooltipPosition: CSSProperties = {
    top: haveSpaceBottom
      ? cellPosition.top + cellRect.height + 8
      : cellPosition.top - cellRect.height - 8,
    left: cellPosition.left - ((tooltipRef.current?.clientWidth || 0) - cellRect.width) / 2
  }

  const handleClickTooltip = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation()
    evt.preventDefault()
    return false
  }

  return ReactDOM.createPortal(
    <TooltipContainer
      ref={tooltipRef}
      className="wm-timeline-tooltip"
      style={tooltipPosition}
      onClick={handleClickTooltip}
    >
      <ul>
        {actions?.map(action => (
          <TooltipListItem key={action.id} onClick={() => onAction(action)}>
            {action.title}
          </TooltipListItem>
        ))}
      </ul>
    </TooltipContainer>,
    timelineBodyContainer
  );
}
