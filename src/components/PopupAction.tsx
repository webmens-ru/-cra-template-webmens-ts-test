import { Button, Form, Modal } from "@webmens-ru/ui_lib";
import { ErrorsItem } from "@webmens-ru/ui_lib/dist/components/form/components/field/types";
import { FormValues, IFormProps } from "@webmens-ru/ui_lib/dist/components/form/types";
import React, { useState } from "react";

export interface PopupActionProps {
  title: string;
  body: {
    text?: string;
    form?: IFormProps;
  }
  buttons?: {
    success: string;
    cancel: string;
  }
  width?: string | number;
  height?: string | number;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
}

export default function PopupAction({ title, body, buttons, width = '50%', height = '50%', onClose, onSubmit }: PopupActionProps) {
  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<ErrorsItem[]>([])

  const handleFieldChange = (values: FormValues, errors: ErrorsItem[]) => {
    setValues(values)
    setErrors(errors)
  }

  const handleFormSubmit = () => {
    if (!errors.length) {
      onClose()
      onSubmit(values)
    }
  }

  const buildBody = (): React.ReactNode => {
    if (body.text) {
      return body.text
    }
    if (body.form) {
      return (
        <Form {...body.form} viewType="short" onFieldChange={(_field, values, errors) => handleFieldChange(values, errors)} />
      )
    }
  }

  const buildFooter = () => {    
    const [successTitle, cancelTitle] = [buttons?.success || "Сохранить", buttons?.cancel || "Закрыть"]
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <Button color="success" children={successTitle} onClick={handleFormSubmit} />
        <Button color="error" children={cancelTitle} onClick={onClose} />
      </div>
    )
  }

  return (
    <Modal
      header={title}
      body={buildBody()}
      footer={buildFooter()}
      showBackdrop={false}
      style={{ width, height }}
      onClose={onClose}
    />
  )
}
