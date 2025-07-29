import React, { useCallback, useMemo, useState } from "react";
import { ActionsContainer, ButtonsContainer, FieldsList, FieldsListItem, FieldsListItemTitle, FooterInnerContainer, TogglersContainer } from "./styles";
import Input from "../../../input";
import { Checkbox } from "../../../checkbox";
import { Button } from "../../../button";
import { Modal } from "../../../modal/Modal";
import type { TField } from "../../types";
import { BodyPortal } from "../../../body_portal";

interface SettingsModalProps {
  fields: TField[];
  onClose: () => void;
  onSubmit: (newColumns: TField[]) => void;
}

export default function FilterFieldsModal({ fields, onClose, onSubmit }: SettingsModalProps) {
  const [filterValue, setFilterValue] = useState("")
  const [fieldsSettings, setFieldsSettings] = useState(fields)

  const filteredFields = useMemo(() => {
    if (!filterValue) {
      return fieldsSettings
    }

    return fieldsSettings.filter(field => field.title.toString().toLowerCase().includes(filterValue.toLowerCase()))
  }, [fieldsSettings, filterValue])

  const handleFieldCheck = useCallback((field: TField) => {
    const newFields = fieldsSettings.map(item => {
      return field === item ? { ...item, visible: !item.visible } : item
    })

    setFieldsSettings(newFields)
  }, [fieldsSettings])

  const handleSettingsSubmit = useCallback(() => {
    onSubmit(fieldsSettings)
    onClose()
  }, [fieldsSettings, onClose, onSubmit])

  const toggleCheckboxes = useCallback((check: boolean) => {
    const toggledFields = fieldsSettings.map(field => ({ ...field, visible: check }))
    setFieldsSettings(toggledFields)
  }, [fieldsSettings])

  const headerModal = useMemo(() => (
    <Input
      iconLeftName="searchWhite"
      width="30%"
      iconPosition="left"
      onChange={setFilterValue}
    />
  ), [])

  const bodyModal = useMemo(() => (
    <FieldsList>
      {filteredFields.map(field => (
        <FieldsListItem key={field.id} selected={!!field.visible} onClick={() => handleFieldCheck(field)}>
          <Checkbox value={!!field.visible} onCheck={() => handleFieldCheck(field)} />
          <FieldsListItemTitle children={field.title} />
        </FieldsListItem>
      ))}
    </FieldsList>
  ), [filteredFields, handleFieldCheck])

  const footerModal = useMemo(() => (
    <FooterInnerContainer>
      <ActionsContainer />
      <ButtonsContainer>
        <Button color="success" children="Сохранить" onClick={handleSettingsSubmit} />
        <Button color="light" children="Отменить" onClick={onClose} />
      </ButtonsContainer>
      <TogglersContainer>
        <Button color="dashed" children="Выбрать все" onClick={() => toggleCheckboxes(true)} />
        <Button color="dashed" children="Отменить все" onClick={() => toggleCheckboxes(false)} />
      </TogglersContainer>
    </FooterInnerContainer>
  ), [handleSettingsSubmit, onClose, toggleCheckboxes])

  return (
    <BodyPortal>
      <Modal
        header={headerModal}
        body={bodyModal}
        footer={footerModal}
        onClose={onClose}
      />
    </BodyPortal>
  )
}
