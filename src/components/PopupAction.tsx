import { Button, Form, Modal } from "@webmens-ru/ui_lib";
import { FormValues, IFormProps, IFormRefHandlers } from "@webmens-ru/ui_lib/dist/components/form/types";
import React, { useRef } from "react";

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
  onSubmit: (values: FormValues) => Promise<any>;
  onAfterSubmit: (response: any) => void;
}

export default function PopupAction({ title, body, buttons, width = '50%', height = '50%', onClose, onSubmit, onAfterSubmit }: PopupActionProps) {
  const formHandlers = useRef<IFormRefHandlers>(null)

  const buildBody = (): React.ReactNode => {
    if (body.text) {
      return body.text
    }
    if (body.form) {
      return (
        <Form
          {...body.form}
          ref={formHandlers}
          viewType="short"
          onSubmit={onSubmit}
          onAfterSubmit={onAfterSubmit}
        />
      )
    }
  }

  const handleSubmit = () => {
    formHandlers.current?.submit()
  }

  const buildFooter = () => {    
    const [successTitle, cancelTitle] = [buttons?.success || "Сохранить", buttons?.cancel || "Закрыть"]
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <Button color="success" children={successTitle} onClick={handleSubmit} />
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
