import React from "react";
import { Loader } from "@webmens-ru/ui_lib";
import { Form } from "@webmens-ru/ui_lib"; 
import { mainFormFields } from "./const";
import { useGetFormQuery } from "./visitorApi";
import { FormMode } from "@webmens-ru/ui_lib/dist/components/form/types";

export default function MainForm({width = "100%", mode = "view"}: { width?: string, mode?: FormMode }) {
  // const form = useGetFormQuery(visitorId)

  // if (form.isLoading || form.isError) {
  //   return <Loader />
  // }
  return (
    <div className="page" style={{ width }}>
      <Form
        fields={mainFormFields}
        // values={form.data}
        mode={mode}
        formTitle="Посетитель"
      />
    </div>
  )
}
