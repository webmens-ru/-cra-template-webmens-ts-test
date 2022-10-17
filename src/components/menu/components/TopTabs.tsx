import { useCustomContext } from '../store';
import { ITopTabs } from '../types/index';
import Tab from './Tab';

export default function TopTabs({ arr, isDraggable, currentId, setTab }: ITopTabs) {  

  const { state, dispatch } = useCustomContext()

  const moveTabs = (dragId: number, hoverId: number) => {
    const visibleItems = state.items.filter(item => !!item.visible)
    const [dragItem, hoverItem] = [{...visibleItems.find(item => item.id === dragId)!}, {...visibleItems.find(item => item.id === hoverId)!}]    
    
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

  const showTab = (dragId: number, _hoverId: number) => {
    const [dragItem] = [state.items.find(item => item.id === dragId)!]
    
    dragItem.visible = true

    dispatch({ type: "set_items", items: [ ...state.items.filter(item => item.id !== dragItem.id), dragItem ] })
  }

  return (<>{arr.sort((a, b) => a.order - b.order).map(item => (
    <Tab
      key={item.id}
      tab={item}
      isCurrent={currentId === item.id}
      isDraggable={isDraggable}
      dragType='TOP_TAB'
      title={item.title}
      onClick={() => setTab(item)}
      onMoveTabs={moveTabs}
      onShowTab={showTab}
    />
  ))}</>)
}
