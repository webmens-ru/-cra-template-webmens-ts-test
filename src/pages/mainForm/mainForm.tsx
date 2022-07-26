import React, { useCallback, useEffect } from "react";
import { Loader } from "@webmens-ru/ui_lib";
import { Form } from "@webmens-ru/ui_lib"; 
import { mainFormFields } from "./const";
import { 
  useGetValidationQuery, 
  useGetFormFieldsQuery,
  useGetFormTitleQuery,
  useGetFormValuesQuery
 } from "./mainFormApi";
import { FormMode, FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { axiosInst } from "../../app/api/baseQuery";

export default function MainForm({width = "100%", mode = "view", entity, action = "update", id = 0, canToggleMode = true}: 
{ 
  width?: string, 
  mode?: FormMode, 
  entity: string, 
  action?: string, 
  id?: any,
  canToggleMode?: boolean
}) {
  // const form = useGetFormQuery(visitorId)

  // if (form.isLoading || form.isError) {
  //   return <Loader />
  // }
  const formValues = useGetFormValuesQuery({entity, id});
  const formFields = useGetFormFieldsQuery(entity);
  const validation = useGetValidationQuery(entity);
  const formTitle = useGetFormTitleQuery(entity);
  
  const handleFormSubmit = (form: FormValues) => {
    console.log(form);
    console.log(action);
    const url = (action == "create") ? `${entity}/${action}` : `${entity}/${action}?id=${form.id}`
    return axiosInst({
      url: url,
      method: "POST",
      data: form,
    })
  }
  
  if(!formFields.isLoading && !validation.isLoading && !formTitle.isLoading && !formValues.isLoading)
  {
    return (
      <div className="page" style={{ width }}>
        <Form
          fields={formFields.data}
          values={formValues.data}
          mode={mode}
          formTitle= {formTitle.data.name}
          height="calc(100vh - 50px)"
          validationRules={validation.data}
          onSubmit={handleFormSubmit}
          canToggleMode={canToggleMode}
          // onAfterSubmit={handleAfterSubmit}/  //TODO: Закрытие слайдера
        />
      </div>
    )
  }
  else
    return <Loader />
}
