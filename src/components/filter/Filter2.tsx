import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RightColumn } from './components/RightColumn';
import FilterSearchText from './components/filter_search_text';
import { LeftColumn } from './components/left_column';
import { useShowControl } from './hooks/useShowControl';
import { FilterContextProvider, useCustomContext } from './store/Context';
import { FilterContainer, FilterMenuContainer, PopUp } from './styles';
import { TProps } from './types';

/* TODO:
✔️ 1. Добавить глобальный поиск. Отправка под полем wmTextSearch. Сочетается с другими фильтрами.
2. Проверить работу полей. Даты.
✔️ 3. Начинать поиск по нажатию на Enter.
*/

/**
 * @param filters array of filters;
 * @param currentFilter текущий фильтр
 * @param fields array of fields;
 * @callback setCurrentFilter return filter onClick
 * @callback createFilter return filter {title, visible, order}
 * @callback updateFilter return filter {id, title, visible, order}
 * @callback deleteFilter return filter ID
 * @callback updateFiltersOrder return all filters with new order
 * @callback updateField return field {}
 * @callback updateFieldsOrder (f: TField[]) => void;
 * @callback returnDefaultFields () => void;
 * @callback onSearch (response: string) => void;
 * @callback onClearFilter () => void;
 * @callback getSelectItems TGetSelectItems;
 * @type Filter
 * {title: string;
 * visible: boolean;
 * order: number;}
 * @type Field
 * {id: number;
 * filterId: number;
 * order: number;
 * value: string[];
 * type: string;
 * title: string;
 * queryKey: string;
 * code: string;
 * visible: boolean;}
 */
export function FilterAlpha(props: TProps) {
  return (
    <FilterContextProvider {...props}>
      <FilterComponent />
    </FilterContextProvider>
  );
}

function FilterComponent() {
  const { state } = useCustomContext();
  const { isShow, setShow } = useShowControl();

  if (!state.currentFilter) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <FilterContainer>
        <FilterSearchText
          textSearch={state.textSearch}
          onClick={() => setShow(true)}
          onSearch={() => setShow(false)}
        />
        <FilterMenuContainer isShow={isShow}>
          <LeftColumn />
          <RightColumn setShowFilter={setShow} />
        </FilterMenuContainer>
      </FilterContainer>
      {isShow && <PopUp onClick={() => setShow(false)} />}
    </DndProvider>
  );
}