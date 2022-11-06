import { useCustomContext } from "../../store/Context";
import { TFilter } from "../../types";
import { MenuItemContainer, MenuItemDeleteHandle, MenuItemDragHandle, MenuItemInput, MenuItemRenameHandle } from "./styles";

interface MenuItemProps {
  item: TFilter;
  onChangeFilterTemplateName: (value: string) => void;
  onRename: (item: TFilter) => void;
  onPickFilter: (item: TFilter) => void;
}

export default function MenuItem({ item, onChangeFilterTemplateName, onRename, onPickFilter }: MenuItemProps) {
  const { state } = useCustomContext()

  return (
    <MenuItemContainer style={{ background: state.filterTemplate.id === item.id ? "#fff" : "transparent" }}>
      {state.isSetup && <MenuItemDragHandle />}
      <MenuItemInput
        value={state.filterTemplate.id === item.id ? state.filterTemplate.title : item.title}
        onChange={(evt) => onChangeFilterTemplateName(evt.target.value)}
        readOnly={item.id !== state.filterTemplate.id}
        current={item.id === state.currentFilter.id}
        onClick={() => (state.isSetup ? null : onPickFilter(item))}
      />
      {state.isSetup && (
        <>
          <MenuItemRenameHandle onClick={() => onRename(item)} />
          <MenuItemDeleteHandle onClick={() => state.deleteFilter(item.id as any)} />
        </>
      )}
    </MenuItemContainer>
  )
}