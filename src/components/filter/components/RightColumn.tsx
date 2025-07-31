import { Button } from "../../button";
import { useShowControl } from "../hooks/useShowControl";
import { useCustomContext } from "../store/Context";
import { FilterMenuFooter } from "../styles";
import { TField } from "../types";
import { DashedBlueBtn, DashedGreyBtn } from "./Buttons";
import { FilterFields } from "./right_column/FilterFields";
import FilterFieldsModal from "./filters_modal";

export function RightColumn({
  setShowFilter,
}: {
  setShowFilter: (arg: boolean) => void;
}) {
  const { state, dispatch } = useCustomContext();
  const { isShow, toggleShow } = useShowControl();

  const searchProxy = () => {
    state.onSearch(state.fields.filter((f) => Boolean(f.visible)));
    setShowFilter(false);
  };

  const cancelChanges = () => {
    dispatch({ type: "SET_IS_SETUP", isSetup: false });
    dispatch({ type: "SET_IS_CREATE_FILTER", isCreate: false });
  };

  const saveChanges = () => {
    if (state.isCreateFilter) {
      dispatch({ type: "SAVE_CREATE_FILTER" });
      state.createFilter({
        ...state.filterTemplate,
        menuId: state.filters[0].menuId,
        order: state.filters.filter((f) => Boolean(f.visible)).length + 1,
        parentId: state.currentFilter.id,
      });
    } else if (state.isEditFilter) {
      dispatch({ type: "SAVE_RENAME_FILTER" });
      state.updateFilter(state.filterTemplate);
    } else {
      dispatch({ type: "SET_IS_SETUP", isSetup: false });
      state.updateFiltersOrder(state.filters.map(filter => ({ id: filter.id, order: filter.order })))
    }
  };

  const onChangeFieldsVisibility = (fields: TField[]) => {
    state.addFields(fields);
    dispatch({ type: 'SET_FILTER_FIELDS', fields })
  }

  const onClear = () => {
    state.onClearFilter();
    setShowFilter(false);
  };

  return (
    <div draggable={false}>
      <FilterFields />
      <DashedBlueBtn onClick={toggleShow} children="Добавить поле" />
      <DashedGreyBtn onClick={state.returnDefaultFields} children="Вернуть поля по умолчанию" />
      <FilterMenuFooter>
        {state.isSetup || state.isCreateFilter ? (
          <>
            <Button color="success" onClick={saveChanges} children="Сохранить" />
            <Button color="light" onClick={cancelChanges} children="Отменить" />
          </>
        ) : (
          <>
            <Button color="primary" onClick={searchProxy} children="Найти" svgBefore="white-search" />
            <Button color="light" onClick={onClear} children="Сбросить" />
          </>
        )}
      </FilterMenuFooter>
      {isShow && (
        <FilterFieldsModal
          fields={state.fields}
          onClose={toggleShow}
          onSubmit={onChangeFieldsVisibility}
        />
      )}
    </div>
  );
}
