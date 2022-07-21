import React, { useCallback, useEffect } from "react";
import { Loader } from "@webmens-ru/ui_lib";
import { Form } from "@webmens-ru/ui_lib"; 
import { mainFormFields } from "./const";
import { useGetValidationQuery, useGetFormFieldsQuery } from "./mainFormApi";
import { FormMode, FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { axiosInst } from "../../app/api/baseQuery";

export default function MainForm({width = "100%", mode = "view", entity, action = "update"}: { width?: string, mode?: FormMode, entity: string, action?: string }) {
  // const form = useGetFormQuery(visitorId)

  // if (form.isLoading || form.isError) {
  //   return <Loader />
  // }
  const formFields = useGetFormFieldsQuery(entity);
  const validation = useGetValidationQuery(entity);
  
  const handleFormSubmit = (form: FormValues) => {
    console.log(formFields);
    const url = (action == "create") ? `${entity}/${action}` : `${entity}/${action}?id=${formFields.data.id}` //TODO: Откуда взять id?
    return axiosInst({
      url: url,
      method: "POST",
      data: form,
    })
  }
  
  console.log(entity);
  if(!formFields.isLoading && !validation.isLoading)
  {
    return (
      <div className="page" style={{ width }}>
        <Form
          fields={formFields.data}
          // values={form.data}
          mode={mode}
          formTitle="Посетитель" //TODO: Добавить title из запроса entity в БД
          height="calc(100vh - 50px)"
          validationRules={validation.data}
          onSubmit={handleFormSubmit}
          // onAfterSubmit={handleAfterSubmit}/  //TODO: Закрытие слайдера
        />
      </div>
    )
  }
  else
    return <Loader />
}
