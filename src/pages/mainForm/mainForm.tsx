import { Form, Loader } from "@webmens-ru/ui_lib";
import { FormMode, FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { useEffect, useState } from "react";
import { axiosInst } from "../../app/api/baseQuery";
import {
  useGetFormFieldsQuery,
  useGetFormTitleQuery, useGetValidationQuery, useLazyGetFormValuesQuery
} from "./mainFormApi";

export interface MainFormProps {
  width?: string, 
  mode?: FormMode, 
  entity: string, 
  action?: string, 
  id?: any,
  canToggleMode?: boolean
}

export default function MainForm({width = "100%", mode = "view", entity, action = "update", id = 0, canToggleMode = true}: MainFormProps) {
  const [getValues] = useLazyGetFormValuesQuery()
  const formFields = useGetFormFieldsQuery(entity);
  const validation = useGetValidationQuery(entity);
  const formTitle = useGetFormTitleQuery(entity);

  const [form, setForm] = useState({ values: {}, isLoading: true })

  useEffect(() => {
    if (id == 0 || action === "create") {
      setForm({ values: {}, isLoading: false })
    } else {
      getValues({ entity, id }).then((response: { data: FormValues; }) => {
        setForm({ values: response.data, isLoading: false })
      })
    }
  }, [action, entity, getValues, id])
  
  const handleFormSubmit = (form: FormValues) => {
    console.log(form);
    console.log(action);
    const url = (action === "create") ? `${entity}/${action}` : `${entity}/${action}?id=${form.id}`
    return axiosInst({
      url: url,
      method: "POST",
      data: form,
    })
  }

  const handleAfterSubmit = () => {
    if (process.env.NODE_ENV === "production") {
      BX24.closeApplication()
    }
  }
  
  if(!formFields.isLoading && !validation.isLoading && !formTitle.isLoading && !form.isLoading)
  {
    return (
      <div className="page" style={{ width }}>
        <Form
          fields={formFields.data}
          values={form.values}
          mode={mode}
          formTitle={formTitle.data.name}
          height="calc(100vh - 50px)"
          validationRules={validation.data}
          onSubmit={handleFormSubmit}
          canToggleMode={canToggleMode}
          onAfterSubmit={handleAfterSubmit}
        />
      </div>
    )
  }
  else
    return <Loader />
}
