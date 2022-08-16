import React, { useState, useEffect, useMemo } from "react";
import { HeaderRendererProps, SortColumn } from "react-data-grid";
import { DraggableHeaderRenderer } from "../components/DraggableHeader";
import SettingsCellHeader from "../components/SettingsCellHeader";
import { IGNORED_COLUMN_KEYS } from "../consts";
import { TColumnItem, TRowItem } from "../types/types";
import { updateInstance } from "../utils/grid_parser";

interface IUseDraggableColumnsProps {
  createColumns: TColumnItem[];
  onReorder: (columns: TColumnItem[]) => void;
}

export default function useColumns({ createColumns, onReorder }: IUseDraggableColumnsProps) {
  const [columns, setColumns] = useState(createColumns);
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => setColumns(createColumns), [createColumns])

  const draggableColumns = useMemo(() => {
    function HeaderRenderer(props: HeaderRendererProps<TRowItem>) {
      return <DraggableHeaderRenderer {...props} onColumnsReorder={handleColumnsReorder} />;
    }

    function handleColumnsReorder(sourceKey: string, targetKey: string) {
      console.log(sourceKey, targetKey);

      const sourceColumnIndex = columns.findIndex((c) => c.key === sourceKey);
      const targetColumnIndex = columns.findIndex((c) => c.key === targetKey);
      const reorderedColumns = [...columns];

      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );

      const resultColumns = updateInstance(reorderedColumns)

      onReorder(resultColumns)
      setColumns(resultColumns);
    }

    return columns
      .filter((c) => !!c.instance.visible)
      .map((c) => {
        if (c.key === "action") {
          return { ...c, headerRenderer: () => SettingsCellHeader({ onClick: () => setShowSettings(true) }) }
        } else if (IGNORED_COLUMN_KEYS.includes(c.key)) {
          return c
        };
        return { ...c, headerRenderer: HeaderRenderer };
      });
  }, [columns, onReorder])

  return {
    draggableColumns,
    sortColumns,
    showSettings,
    setShowSettings,
    setSortColumns
  }
}
