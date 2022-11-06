import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LeftColumn } from './components/LeftColumn';
import { RightColumn } from './components/RightColumn';
import { useShowControl } from './hooks/useShowControl';
import useSquares from './hooks/useSquares';
import { FilterContextProvider, useCustomContext } from './store/Context';
import { FilterContainer, FilterMenuContainer, PopUp, SquareItem, SquaresContainer } from './styles';
import { TProps } from './types';

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
      <Provider />
    </FilterContextProvider>
  );
}

function Provider() {
  const { state } = useCustomContext();
  const { isShow, setShow } = useShowControl();
  const { squares, validFieldsCount } = useSquares()

  if (!state.currentFilter) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <FilterContainer>
        <div onClick={() => setShow(true)}>
          {squares.length ? (
            <>
              <SquaresContainer>
                {squares.map((item, index) => (
                  <SquareItem key={index} title={`${item.title}: ${item.value}`} >
                    <span children={`${item.title}: ${item.value}`} />
                  </SquareItem>
                ))}
                {validFieldsCount > 2 && (
                  <SquareItem children={`И еще ${validFieldsCount - squares.length}`} />
                )}
              </SquaresContainer>
              <p>+ поиск</p>
            </>
          ) : (
            <p>Фильтр + поиск</p>
          )}
          <button></button>
        </div>
        <FilterMenuContainer isShow={isShow}>
          <LeftColumn />
          <RightColumn setShowFilter={setShow} />
        </FilterMenuContainer>
      </FilterContainer>
      {isShow && <PopUp onClick={() => setShow(false)} />}
    </DndProvider>
  );
}
