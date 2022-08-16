import { useEffect, useState } from "react";
import DataGrid from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import SettingsModal from "./components/SettingsModal";
import SideScroll from "./components/SideScroll";
import CheckboxFormatter from "./formatters/CheckboxFormatter";
import useColumnResize from "./hooks/useColumnResize";
import useColumns from "./hooks/useColumns";
import useGridRef from "./hooks/useGridRef";
import useRows from "./hooks/useRows";
import { GridContainer, GridStyle } from "./styles/grid";
import { IGridProps, TCellItem, TColumnItem, TRowItem } from "./types/types";
import { fromRawColumns, toRawColumns } from "./utils/grid_parser";

export const Grid = ({
  columns = [],
  rows = [],
  footer = [],
  burgerItems = [{ label: "Редактировать" }, { label: "Удалить" }, ],
  columnMutation = () => { },
  onChangeCheckboxes = () => {},
  onBurgerItemClick = () => {},
  onCellClick = (cell: TCellItem) => {}
}: IGridProps) => {
  const [mutableColumns, setMutableColumns] = useState<TColumnItem[]>(fromRawColumns(columns, onCellClick))
  const { gridRef, refReady } = useGridRef()

  
  
  const { draggableColumns, sortColumns, showSettings, setShowSettings, setSortColumns } = useColumns({ createColumns: mutableColumns, onReorder: handleColumnsMutation, })
  const { sortedRows, selectedRows, setSelectedRows } = useRows({ createColumns: columns, createRows: rows, sortColumns, burgerItems, gridRef, onBurgerItemClick })
  const { onColumnResize } = useColumnResize({ mutableColumns, draggableColumns, onResizeEnd: handleColumnsMutation })
  
  console.log(selectedRows);
  useEffect(() => {
    onChangeCheckboxes(Array.from(selectedRows))
  }, [onChangeCheckboxes, selectedRows])

  function handleColumnsMutation(columns: TColumnItem[]) {
    setMutableColumns(columns)
    columnMutation(toRawColumns(columns))
  }  

  const rowKeyGetter = (row: TRowItem) => {
    const id = typeof row.id !== "object" ? row.id : row.id.title
    return typeof id === "string" ? parseInt(id) : id
  }

  return (
    <>
      <GridStyle />
      {showSettings && <SettingsModal columns={mutableColumns} onClose={() => setShowSettings(false)} onSubmit={handleColumnsMutation} />}
      <GridContainer>
        {refReady && <SideScroll gridRef={gridRef} />}
        <DndProvider backend={HTML5Backend} >
          <DataGrid
            ref={gridRef}
            columns={draggableColumns}
            sortColumns={sortColumns}
            rows={sortedRows}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            className="rdg-light wm-grid"
            headerRowHeight={47}
            rowHeight={47}
            summaryRows={footer}
            rowKeyGetter={rowKeyGetter}
            onColumnResize={onColumnResize}
            onSortColumnsChange={setSortColumns}
            components={{ checkboxFormatter: CheckboxFormatter }}
          />
        </DndProvider>
      </GridContainer>
    </>
  );
}
