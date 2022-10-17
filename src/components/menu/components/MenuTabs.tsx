import { useCustomContext } from "../store";
import { IMenuTabs } from "../types";
import Tab from "./Tab";

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

  const hideTab = (dragId: number, _hoverId: number) => {
    const [dragItem] = [state.items.find(item => item.id === dragId)!]    

    dragItem.visible = false

    dispatch({ type: "set_items", items: [ ...state.items.filter(item => item.id !== dragItem.id), dragItem ] })
  }

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
        <p>Перетащите сюда, чтобы скрыть</p>
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
