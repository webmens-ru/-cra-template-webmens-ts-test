import React, { useCallback, useEffect } from "react";
import { Loader } from "@webmens-ru/ui_lib";
import { Form } from "@webmens-ru/ui_lib"; 
import { mainFormFields } from "./const";
import { useGetValidationQuery, useLazyGetFormFieldsQuery } from "./mainFormApi";
import { FormMode, FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { axiosInst } from "../../app/api/baseQuery";

export default function MainForm({width = "100%", mode = "view", entity, action = "update"}: { width?: string, mode?: FormMode, entity: string, action?: string }) {
  // const form = useGetFormQuery(visitorId)

  // if (form.isLoading || form.isError) {
  //   return <Loader />
  // }
  const [getFormFields, formFields] = useLazyGetFormFieldsQuery();
  const validation = useGetValidationQuery(entity);
  useEffect(() => {
    getFormFields(entity);
  }, [entity]);
  
  
  const handleFormSubmit = (form: FormValues) => {
    const url = (action == "create") ? `${entity}/${action}` : `${entity}/${action}?id=777` //TODO: Откуда взять id?
    return axiosInst({
      url: url,
      method: "POST",
      data: form,
    })
  }

  console.log(entity);
  return (
    <div className="page" style={{ width }}>
      <Form
        fields={formFields.data}
        // values={form.data}
        mode={mode}
        formTitle="Посетитель" //TODO: Добавить title из запроса entity в БД
        height="calc(100vh - 50px)"
        validationRules={validation.data}
        // onInit={onFormInited}
        // onFieldChange={onFieldChange} //TODO: Разобраться
        onSubmit={handleFormSubmit}
        // onAfterSubmit={handleAfterSubmit}/ 
      />
    </div>
  )
}
