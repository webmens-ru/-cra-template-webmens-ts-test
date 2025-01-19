import { useMemo, useState } from "react";
import { DataGridHandle, SortColumn } from "react-data-grid";
import { BurgerItem, TRawColumnItem, TRowItem } from "../types";
import { getSorter } from "../utils/sorter";

interface IUseRowsProps {
  createRows: TRowItem[];
  createColumns: TRawColumnItem[]
  sortColumns: SortColumn[];
  burgerItems: BurgerItem[];
  burgerKey: string;
  gridRef: React.RefObject<DataGridHandle>;
  onBurgerItemClick: (item: BurgerItem, row: TRowItem) => void;
}

export default function useRows({ createRows, createColumns, sortColumns, burgerItems, burgerKey, gridRef, onBurgerItemClick }: IUseRowsProps) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());

  const sortedRows = useMemo((): readonly TRowItem[] => {
    const actionRows = createRows.map(row => {
      const rowBurgerItems = burgerItems.filter(item => row[burgerKey].includes(item.id))
      return { ...row, action: { burgerItems: rowBurgerItems, onBurgerItemClick, gridRef } }
    })

    if (sortColumns.length === 0) return actionRows;

    return actionRows.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getSorter(sort.columnKey, createColumns);
        const compResult = comparator(a, b, sort.columnKey);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [burgerItems, burgerKey, createColumns, createRows, gridRef, onBurgerItemClick, sortColumns]);

  return {
    sortedRows,
    selectedRows,
    setSelectedRows
  }
}
