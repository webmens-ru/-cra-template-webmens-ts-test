import { Button, Checkbox, Input } from "@webmens-ru/ui_lib";
import { useState } from "react";
import { IGNORED_COLUMN_KEYS } from "../../consts";
import { TColumnItem } from "../../types";
import { ActionsContainer, BodyModalContainer, ButtonsContainer, ColumnsList, ColumnsListItem, ColumnsListItemTitle, FooterInnerContainer, FooterModalContainer, HeaderCancelButton, HeaderModalContainer, SettingsModalBackdrop, SettingsModalContainer, SettingsModalInnerContainer, TogglersContainer } from "./styles";

interface SettingsModalProps {
  columns: TColumnItem[];
  onClose: () => void;
  onSubmit: (newColumns: TColumnItem[]) => void;
}

export default function SettingsModal({ columns, onClose, onSubmit }: SettingsModalProps) {
  const [filterValue, setFilterValue] = useState("")
  const [columnsSettings, setColumnsSettings] = useState(columns)

  const handleColumnCheck = (column: TColumnItem) => {
    const changedColumns = columnsSettings.map(item => {
      if (column === item) {
        return { ...item, instance: { ...item.instance, visible: item.instance.visible === 0 ? 1 : 0 } }
      } else return item
    })
    setColumnsSettings(changedColumns)
  }

  const handleSettingsSubmit = () => {
    onSubmit(columnsSettings)
    onClose()
  }

  const checkAll = () => {
    setColumnsSettings(columnsSettings.map(column => ({ ...column, instance: { ...column.instance, visible: 1 } })))
  }

  const uncheckAll = () => {
    setColumnsSettings(columnsSettings.map(column => ({ ...column, instance: { ...column.instance, visible: 0 } })))
  }

  const getFilteredColumns = () => {
    const clearColumns = columnsSettings.filter(column => !IGNORED_COLUMN_KEYS.includes(column.key))

    if (filterValue === "") {
      return clearColumns
    } else {
      return clearColumns.filter(column => column.name.toString().toLowerCase().includes(filterValue.toLowerCase()))
    }
  }

  const getCheckedColumns = () => {
    return columnsSettings.filter(column => column.key !== "action" && column.instance.visible)
  }  

  return (
    <>
      <SettingsModalBackdrop onClick={onClose} />
      <SettingsModalContainer>
        <SettingsModalInnerContainer>

          <HeaderModalContainer>
            <Input iconLeftName="searchWhite" width="30%" iconPosition="left" onChange={(value) => setFilterValue(value)} />
            <HeaderCancelButton onClick={onClose} />
          </HeaderModalContainer>

          <BodyModalContainer>
            <ColumnsList>
              {getFilteredColumns().map(column => (
                <ColumnsListItem key={column.key} selected={!!column.instance.visible} onClick={() => handleColumnCheck(column)}>
                  <Checkbox value={!!column.instance.visible} onCheck={() => handleColumnCheck(column)} />
                  <ColumnsListItemTitle children={column.name} />
                </ColumnsListItem>
              ))}
            </ColumnsList>
          </BodyModalContainer>

          <FooterModalContainer>
            <FooterInnerContainer>
              <ActionsContainer />
              <ButtonsContainer>
                <Button color="success" children="Сохранить" disabled={getCheckedColumns().length === 0} onClick={handleSettingsSubmit} />
                <Button color="light" children="Отменить" onClick={onClose} />
              </ButtonsContainer>
              <TogglersContainer>
                <Button color="dashed" children="Выбрать все" onClick={checkAll} />
                <Button color="dashed" children="Отменить все" onClick={uncheckAll} />
              </TogglersContainer>
            </FooterInnerContainer>
          </FooterModalContainer>

        </SettingsModalInnerContainer>
      </SettingsModalContainer>
    </>
  )
}
