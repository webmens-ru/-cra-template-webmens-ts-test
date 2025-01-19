import React, { useCallback, useMemo, useState } from "react";
import LockClosed from "../assets/svg/lock-closed.svg";
import LockOpen from "../assets/svg/lock-open.svg";
import { IGNORED_COLUMN_KEYS } from "../consts";
import { ActionsContainer, ButtonsContainer, ColumnsList, ColumnsListItem, ColumnsListItemTitle, FooterInnerContainer, LockIcon, TogglersContainer } from "../styles";
import { TColumnItem } from "../types";
import Input from "../../input";
import { Checkbox } from "../../checkbox";
import { Button } from "../../button";
import { Modal } from "../../modal/Modal";

interface SettingsModalProps {
  columns: TColumnItem[];
  onClose: () => void;
  onSubmit: (newColumns: TColumnItem[]) => void;
}

export default function SettingsModal({ columns, onClose, onSubmit }: SettingsModalProps) {
  const [filterValue, setFilterValue] = useState("")
  const [columnsSettings, setColumnsSettings] = useState(columns)

  const checkedColumns = useMemo(() => columnsSettings.filter(column => !IGNORED_COLUMN_KEYS.includes(column.key) && column.instance.visible), [columnsSettings])
  const filteredColumns = useMemo(() => {
    const clearColumns = columnsSettings.filter(column => !IGNORED_COLUMN_KEYS.includes(column.key))

    return filterValue === "" ? clearColumns :
      clearColumns.filter(column => column.name.toString().toLowerCase().includes(filterValue.toLowerCase()))
  }, [columnsSettings, filterValue])

  const handleColumnCheck = useCallback((column: TColumnItem) => {
    const changedColumns = columnsSettings.map(item => {
      if (column === item) {
        const instance = { ...item.instance, visible: !item.instance.visible }
        return { ...item, instance }
      } else return item
    })

    setColumnsSettings(changedColumns)
  }, [columnsSettings])

  const handleColumnFrozen = useCallback((evt: React.MouseEvent<HTMLImageElement>, column: TColumnItem) => {
    evt.stopPropagation()

    const changedColumns = columnsSettings.map(item => {
      if (column === item) {
        const instance = { ...item.instance, frozen: !item.instance.frozen }
        return { ...item, frozen: !item.frozen, instance }
      } else return item
    })

    setColumnsSettings(changedColumns)
  }, [columnsSettings])

  const handleSettingsSubmit = useCallback(() => {
    onSubmit(columnsSettings)
    onClose()
  }, [columnsSettings, onClose, onSubmit])

  const toggleCheckboxes = useCallback((check: boolean) => {
    const toggledColumns = columnsSettings.map(column => IGNORED_COLUMN_KEYS.includes(column.key) ? { ...column } : { ...column, instance: { ...column.instance, visible: check } })
    setColumnsSettings(toggledColumns)
  }, [columnsSettings])

  const headerModal = useMemo(() => (
    <Input iconLeftName="searchWhite" width="30%" iconPosition="left" onChange={(value) => setFilterValue(value)} />
  ), [])

  const bodyModal = useMemo(() => (
    <ColumnsList>
      {filteredColumns.map(column => (
        <ColumnsListItem key={column.key} selected={column.instance.visible} onClick={() => handleColumnCheck(column)}>
          <Checkbox value={column.instance.visible} onCheck={() => handleColumnCheck(column)} />
          <ColumnsListItemTitle children={column.name} />
          <LockIcon title={column.frozen ? "Открепить столбец" : "Закрепить столбец"} src={column.frozen ? LockClosed : LockOpen} onClick={(e) => handleColumnFrozen(e, column)} />
        </ColumnsListItem>
      ))}
    </ColumnsList>
  ), [filteredColumns, handleColumnCheck, handleColumnFrozen])

  const footerModal = useMemo(() => (
    <FooterInnerContainer>
      <ActionsContainer />
      <ButtonsContainer>
        <Button color="success" children="Сохранить" disabled={checkedColumns.length === 0} onClick={handleSettingsSubmit} />
        <Button color="light" children="Отменить" onClick={onClose} />
      </ButtonsContainer>
      <TogglersContainer>
        <Button color="dashed" children="Выбрать все" onClick={() => toggleCheckboxes(true)} />
        <Button color="dashed" children="Отменить все" onClick={() => toggleCheckboxes(false)} />
      </TogglersContainer>
    </FooterInnerContainer>
  ), [checkedColumns.length, handleSettingsSubmit, onClose, toggleCheckboxes])

  return (
    <Modal
      header={headerModal}
      body={bodyModal}
      footer={footerModal}
      onClose={onClose}
    />
  )
}
