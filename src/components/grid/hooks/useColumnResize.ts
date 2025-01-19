import { useRef, useState } from "react";
import { TColumnItem } from '../types';
import { updateInstance } from '../utils/grid_parser';

interface IUseColumnResizeProps {
  draggableColumns: TColumnItem[];
  mutableColumns: TColumnItem[];
  onResizeEnd: (columns: TColumnItem[]) => void;
}

// TODO: Не срабатывает ресайз на замороженных столбцах
export default function useColumnResize({ draggableColumns, mutableColumns, onResizeEnd }: IUseColumnResizeProps) {
  const [tempWidth, setTempWidth] = useState(0)
  const tempWidthRef = useRef(0)

  tempWidthRef.current = tempWidth

  function onColumnResize(columnIndex: number, width: number) {
    setTempWidth(width)
    setTimeout((newWidth) => {
      if (newWidth === tempWidthRef.current) {
        handleResizeEnd(columnIndex, newWidth)
      }
    }, 350, width)
  }

  function handleResizeEnd(columnIndex: number, width: number) {
    const columnKey = draggableColumns[columnIndex].key
    const changedColumn = mutableColumns.find(c => c.key === columnKey)

    if (!changedColumn) return

    const mutableColumnIndex = mutableColumns.indexOf(changedColumn)
    const changedColumns = mutableColumns.slice()

    changedColumns.splice(mutableColumnIndex, 1, { ...changedColumn, width })

    const resultColumns = updateInstance(changedColumns)

    onResizeEnd(resultColumns)
  }

  return {
    onColumnResize
  }
}
