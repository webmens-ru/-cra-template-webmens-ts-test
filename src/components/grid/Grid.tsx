import React, { useEffect, useState } from "react";
import DataGrid from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import SettingsModal from "./components/SettingsModal";
import SideScroll from "./components/SideScroll";
import { Pagination } from "./components/pagination";
import CheckboxFormatter from "./formatters/CheckboxFormatter";
import useColumnResize from "./hooks/useColumnResize";
import useColumns from "./hooks/useColumns";
import useGridRef from "./hooks/useGridRef";
import useGridReload from "./hooks/useGridReload";
import useRows from "./hooks/useRows";
import { GridContainer, GridStyle } from "./styles/grid";
import { IGridProps, TColumnItem, TRowItem } from "./types/types";
import { fromRawColumns, toRawColumns } from "./utils/grid_parser";

export const Grid2 = ({
  columns = [],
  rows = [],
  footer = [],
  burgerItems = [],
  isShowCheckboxes = true,
  height = 400,
  rowKey = "id",
  burgerKey = "actions",
  pagination,
  rowColorKey = "wmRowColor",
  cellColorKey,
  columnMutation = () => { },
  onChangeCheckboxes = () => { },
  onBurgerItemClick = () => { },
  onRowMutation = () => {},
  onCellClick = () => {}
}: IGridProps) => {
  const [mutableColumns, setMutableColumns] = useState<TColumnItem[]>(fromRawColumns(columns, isShowCheckboxes, onCellClick))
  const [createRows, setCreateRows] = useState<TRowItem[]>(rows)
  
  const { gridKey, reloadGrid } = useGridReload()
  const { gridRef, refReady } = useGridRef()

  const { draggableColumns, sortColumns, showSettings, setShowSettings, setSortColumns } = useColumns({ createColumns: mutableColumns, cellColorKey, onReorder: handleColumnsMutation, onChangeEnd: onRowMutation })
  const { sortedRows, selectedRows, setSelectedRows } = useRows({ createColumns: columns, createRows, sortColumns, burgerItems, burgerKey, gridRef, onBurgerItemClick })
  // @ts-ignore
  const { onColumnResize } = useColumnResize({ mutableColumns, draggableColumns, onResizeEnd: handleColumnsMutation })    
  
  useEffect(() => {
    onChangeCheckboxes(Array.from(selectedRows))
  }, [onChangeCheckboxes, selectedRows])

  function handleColumnsMutation(columns: TColumnItem[]) {
    setMutableColumns(columns)
    columnMutation(toRawColumns(columns))
  }

  function handleSettingsUpdate(columns: TColumnItem[]) {
    setMutableColumns(columns)
    columnMutation(toRawColumns(columns))
    reloadGrid()
  }

  const rowKeyGetter = (row: TRowItem) => {
    const id = typeof row[rowKey] !== "object" ? row[rowKey] : row[rowKey].title
    return typeof id === "string" ? parseInt(id) : id
  }

  const generateRowClassname = (row: TRowItem) => {
    if (!rowColorKey) return

    return row[rowColorKey]
  }

  useEffect(() => {
    setCreateRows(rows)
  }, [rows])

  return (
    <>
      <GridStyle />
      {showSettings && <SettingsModal columns={mutableColumns} onClose={() => setShowSettings(false)} onSubmit={handleSettingsUpdate} />}
      <GridContainer>
        {refReady && <SideScroll gridRef={gridRef} />}
        <DndProvider backend={HTML5Backend} >
          <DataGrid
            key={gridKey}
            ref={gridRef}
            
            // @ts-ignore
            columns={draggableColumns}
            sortColumns={sortColumns}
            rows={sortedRows}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            className="rdg-light wm-grid"
            headerRowHeight={47}
            rowHeight={47}
            rowClass={generateRowClassname}
            summaryRows={footer}
            rowKeyGetter={rowKeyGetter}
            onColumnResize={onColumnResize}
            onRowsChange={setCreateRows}
            onSortColumnsChange={setSortColumns}
            components={{ checkboxFormatter: CheckboxFormatter }}
            style={{ height }}
          />
          {pagination && (
            <Pagination {...pagination} />
          )}
        </DndProvider>
      </GridContainer>
    </>
  );
}
