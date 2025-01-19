import React from "react";
import { useDrop } from "react-dnd";
import { useCustomContext } from "../store";
import { IMenuTabs } from "../types";
import Tab, { MENU_DRAG_TYPE } from "./Tab";

export default function MenuTabs({
  abroadTabs,
  hiddenTabs,
  isDraggable,
  setTab,
}: IMenuTabs) {
  const { state, dispatch } = useCustomContext()

  const moveTabs = (dragId: number, hoverId: number) => {
    const [dragItem, hoverItem] = [state.items.find(item => item.id === dragId)!, state.items.find(item => item.id === hoverId)!]
    
    const [dragOrder, hoverOrder] = [dragItem.order, hoverItem.order]

    if (dragOrder === hoverOrder) {
      hoverItem.order += 1
    } else {
      dragItem.order = hoverOrder
      hoverItem.order = dragOrder
    }

    dispatch({ type: "set_items", items: [
      ...state.items.filter(item => item.id !== dragItem.id && item.id !== hoverItem.id),
      dragItem,
      hoverItem
    ] })
  }

  const hideTab = (dragId: number) => {
    const dragItem = state.items.find(item => item.id === dragId)!

    dragItem.visible = false

    dispatch({ type: "set_items", items: [ ...state.items.filter(item => item.id !== dragItem.id), dragItem ] })
  }

  const [, dropRef] = useDrop<{ id: number }, void, any>({
    accept: [MENU_DRAG_TYPE.TOP_TAB, MENU_DRAG_TYPE.HIDDEN_TAB],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop: (item, monitor) => hideTab(item.id)
  })

  return (
    <>
      {abroadTabs.map(item => (
        <Tab
          key={item.id}
          title={item.title}
          tab={item}
          isCurrent={false}
          onClick={() => setTab(item)}
          onMoveTabs={moveTabs}
          onHideTab={hideTab}
          isDraggable={isDraggable}
          dragType="HIDDEN_TAB"
        />
      ))}
      <span>Скрытые</span>
      {hiddenTabs.length === 0 && (
        <div ref={dropRef}>
          <p>Перетащите сюда, чтобы скрыть</p>
        </div>
      )}
      {hiddenTabs.sort((a, b) => a.order - b.order).map(item => (
        <Tab
          key={item.id}
          title={item.title}
          tab={item}
          isCurrent={false}
          onClick={() => setTab(item)}
          onMoveTabs={moveTabs}
          onHideTab={hideTab}
          isDraggable={isDraggable}
          dragType="HIDDEN_TAB"
        />
      ))}
      <span>Управление</span>
    </>
  );
}
