import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useCustomContext } from "../../store/Context";
import { TFilter } from "../../types";
import { MenuItemContainer, MenuItemDeleteHandle, MenuItemDragHandle, MenuItemInput, MenuItemRenameHandle } from "./styles";

interface MenuItemProps {
  menuItem: TFilter;
  onMoveItem: (dragItem: TFilter, hoverItem: TFilter) => void;
  onChangeFilterTemplateName: (value: string) => void;
  onRename: (item: TFilter) => void;
  onPickFilter: (item: TFilter) => void;
}

export default function MenuItem({ menuItem, onMoveItem, onChangeFilterTemplateName, onRename, onPickFilter }: MenuItemProps) {
  const { state } = useCustomContext()
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag, preview] = useDrag({
    type: "MENU_ITEM",
    item: () => ({ dragItem: menuItem }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, drop] = useDrop({
    accept: ["MENU_ITEM"],
    hover: (item: any, monitor) => {
      const [dragItem, hoverItem] = [item.dragItem, menuItem]

      if (!ref.current || dragItem.id === hoverItem.id) {
        return
      }

      const hoverBoundingRect = ref.current.parentElement!.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset() as XYCoord
      const [hoverMiddleY, hoverClientY] = [(hoverBoundingRect.top + hoverBoundingRect.bottom) / 2, clientOffset.y]

      if (hoverClientY > hoverMiddleY) {
        onMoveItem(dragItem, hoverItem)
      }
    }
  })

  drag(ref)

  return (
    <MenuItemContainer
      ref={(ref) => {
        drop(ref)
        preview(ref)
      }}
      style={{ background: state.filterTemplate.id === menuItem.id ? "#fff" : "transparent", opacity: isDragging ? 0.5 : 1 }}
    >
      <MenuItemDragHandle ref={ref} style={{ display: state.isSetup ? "block" : "none" }} />
      <MenuItemInput
        value={state.filterTemplate.id === menuItem.id ? state.filterTemplate.title : menuItem.title}
        onChange={(evt) => onChangeFilterTemplateName(evt.target.value)}
        readOnly={menuItem.id !== state.filterTemplate.id}
        current={menuItem.id === state.currentFilter.id}
        onClick={() => ((state.isSetup && menuItem.id === state.currentFilter.id) ? null : onPickFilter(menuItem))}
      />
      {state.isSetup && (
        <>
          <MenuItemRenameHandle onClick={() => onRename(menuItem)} />
          <MenuItemDeleteHandle onClick={() => state.deleteFilter(menuItem.id as any)} />
        </>
      )}
    </MenuItemContainer>
  )
}
