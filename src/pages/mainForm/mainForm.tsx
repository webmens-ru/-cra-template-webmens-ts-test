import { Form, Loader, useNotification } from "@webmens-ru/ui_lib";
import { FormMode, FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInst } from "../../app/api/baseQuery";
import { ErrorResponse } from "../../app/model/query";
import {
  useGetFormFieldsQuery,
  useGetFormTitleQuery,
  useGetValidationQuery,
  useLazyGetFormValuesQuery
} from "./mainFormApi";

export interface MainFormProps {
  width?: string,
  height?: string,
  mode?: FormMode,
  entity: string,
  action?: string,
  id?: any,
  canToggleMode?: boolean,
  defaultValue?: any,
  onAfterSubmit?: (values: any) => void;
}

export default function MainForm(
  {
    width = "100%",
    height = "calc(100vh - 50px)",
    mode = "view",
    entity,
    action = "update",
    id = 0,
    canToggleMode = true,
    defaultValue = {},
    onAfterSubmit = () => {}
  }: MainFormProps) {
  const [getValues] = useLazyGetFormValuesQuery()
  const formFields = useGetFormFieldsQuery(entity);
  const validation = useGetValidationQuery(entity);
  const formTitle = useGetFormTitleQuery(entity);

  const [notificationContext, notificationApi] = useNotification()

  const [form, setForm] = useState({ values: defaultValue, isLoading: false })
  const [submitError, setSubmitError] = useState<{ error: boolean, data?: ErrorResponse }>({ error: false })

  const handleFormSubmit = (formValues: FormValues) => {
    setForm({ values: formValues, isLoading: true })

    const url = (action === "create") ? `${entity}/${action}` : `${entity}/${action}?id=${formValues.id}`
    const submitRequest = axiosInst.post(url, formValues)
      .then(() => {
        setForm({ values: formValues, isLoading: false })
        setSubmitError({ error: false, data: undefined })
        onAfterSubmit(formValues)
      }).catch(({ response }: AxiosError<ErrorResponse>) => {
        setForm({ values: formValues, isLoading: false })
        setSubmitError({ error: true, data: response?.data })
      })

    return submitRequest
  }

  const handleAfterSubmit = () => {
    if (!submitError.error && process.env.NODE_ENV === "production") {
      BX24.closeApplication()
    } else if (submitError.data && submitError.data.notification) {
      notificationApi.show(submitError.data.notification)
    }
  }

  useEffect(() => {
    if (id !== 0 && action !== "create") {
      setForm({ values: {}, isLoading: true })
      getValues({ entity, id }).then((response: { data: FormValues; }) => {
        setForm({ values: response.data, isLoading: false })
      })
    } else {
      setForm({ ...form, isLoading: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, action])

  if (formFields.isLoading || validation.isLoading || formTitle.isLoading || form.isLoading) {
    return <Loader />
  }

  return (
    <>
      {notificationContext}
      <div className="page" style={{ width }}>
        <Form
          fields={formFields.data}
          values={form.values}
          mode={mode}
          formTitle={formTitle.data?.name}
          height={height}
          validationRules={validation.data}
          onSubmit={handleFormSubmit}
          canToggleMode={canToggleMode}
          onAfterSubmit={handleAfterSubmit}
        />
      </div>
    </>
  )
}
