import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useCustomContext } from "../store";
import { TabContainer, TabDragHandle } from "../styles";
import { Item } from "../types";

interface MenuTabProps {
  tab: Item;
  isDraggable: boolean;
  dragType: keyof typeof MENU_DRAG_TYPE
  isCurrent: boolean;
  title: string;
  onClick: React.MouseEventHandler;
  onMoveTabs?: (dragId: number, hoverId: number) => void;
  onHideTab?: (dragId: number, hoverId: number) => void;
  onShowTab?: (dragId: number, hoverId: number) => void;
}

interface DragMenuItem {
  id: number;
}

export const MENU_DRAG_TYPE = {
  TOP_TAB: 'TOP_TAB',
  HIDDEN_TAB: 'HIDDEN_TAB'
}

export default function Tab({ tab, isDraggable, dragType, isCurrent, title, onClick, onMoveTabs = () => {}, onHideTab = () => {}, onShowTab = () => {} }: MenuTabProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { state } = useCustomContext()

  const [, drop] = useDrop<DragMenuItem, void, any>({
    accept: [MENU_DRAG_TYPE.TOP_TAB, MENU_DRAG_TYPE.HIDDEN_TAB],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      const [dragId, dragTypeDrag] = [item.id, monitor.getItemType() as keyof typeof MENU_DRAG_TYPE]
      const [hoverId, hoverTypeDrag] = [tab.id, dragType as keyof typeof MENU_DRAG_TYPE]

      if (!ref.current || dragId === hoverId) {
        return
      }

      const hoverBoundingRect = ref.current.parentElement!.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset() as XYCoord
      const [hoverMiddleX, hoverMiddleY] = [(hoverBoundingRect.left + hoverBoundingRect.right) / 2, (hoverBoundingRect.top + hoverBoundingRect.bottom) / 2]
      const [hoverClientX, hoverClientY] = [clientOffset.x, clientOffset.y]

      if (dragTypeDrag === 'TOP_TAB' && hoverTypeDrag === 'HIDDEN_TAB') {        
        onHideTab(dragId, hoverId)
      }

      if (dragTypeDrag === 'HIDDEN_TAB' && hoverTypeDrag === 'TOP_TAB') {
        onShowTab(dragId, hoverId)
      }

      console.log(dragTypeDrag);
      

      if (
        (hoverTypeDrag === 'TOP_TAB' && hoverClientX > hoverMiddleX)
        ||
        (hoverTypeDrag === 'HIDDEN_TAB' && hoverClientY > hoverMiddleY)
      ) {
        onMoveTabs(dragId, hoverId)
      }
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragType,
    item: (): DragMenuItem => ({ id: tab.id }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref)

  return (
    <TabContainer
      ref={(ref) => {
        drop(ref)
        preview(ref)
      }}
      onClick={(evt) => !isDraggable ? onClick(evt) : null}
      menuStyle={state.menuStyle}
      disabled={state.disabled}
      current={isCurrent}
      position={dragType}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <TabDragHandle ref={ref} isDraggable={isDraggable} />
      {title}
    </TabContainer>
  )
}
