import React, { useRef } from "react";
import { useCustomContext } from "../../store/Context";
import { TFilter } from "../../types";
import MenuItem from "../menu_item";
import { CreateFilterInput } from "./styles";

export function LeftColumn() {
  const { state, dispatch } = useCustomContext();
  const createFilterRef = useRef<HTMLInputElement>(null);

  const handleMoveItems = (dragItem: TFilter, hoverItem: TFilter) => {
    const draggedItem = { ...dragItem, order: hoverItem.order }
    const hoverredItem = { ...hoverItem, order: dragItem.order }    

    if (draggedItem.order === hoverredItem.order) {
      hoverredItem.order += 1
    }

    const reorderedFilters = [
      ...state.filters.filter((filter) => filter.id !== dragItem.id && filter.id !== hoverItem.id),
      draggedItem,
      hoverredItem
    ]

    dispatch({ type: "SET_FILTERS", filters: reorderedFilters })
  }

  const setNewCurrentFilter = (filter: TFilter) => {
    dispatch({ type: "SET_CURRENT_FILTER", filter });
  };

  const setIsSetup = () => {
    dispatch({ type: "SET_IS_SETUP", isSetup: true });
  };

  const setRenameFilter = (filter: TFilter) => {
    dispatch({ type: "SET_RENAME_FILTER", filter });
  };

  const setFilterTemplateValue = (title: string) => {
    dispatch({ type: "SET_FILTER_TEMPLATE_VALUE", title });
  };

  const setIsCreateFilter = () => {
    dispatch({ type: "SET_IS_CREATE_FILTER", isCreate: true });    
    setTimeout(() => {
      if (createFilterRef.current) {
        createFilterRef.current.focus();
      }
    }, 200);
  };

  return (
    <menu>
      <h3>Фильтры</h3>
      {state.filters
        .filter((f) => Boolean(f.visible))
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <MenuItem
            key={item.id}
            menuItem={item}
            onChangeFilterTemplateName={setFilterTemplateValue}
            onRename={setRenameFilter}
            onPickFilter={setNewCurrentFilter}
            onMoveItem={handleMoveItems}
          />
        ))}
      {state.isCreateFilter && (
        <div key="000">
          <CreateFilterInput
            ref={createFilterRef}
            placeholder="Название фильтра"
            type="text"
            value={state.filterTemplate.title || ''}
            onChange={(e) => setFilterTemplateValue(e.target.value)}
          />
        </div>
      )}
      <button children="Сохранить фильтр" onClick={setIsCreateFilter} />
      <button onClick={setIsSetup} />
    </menu>
  );
}
