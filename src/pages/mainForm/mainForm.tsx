import {Form, Loader} from "@webmens-ru/ui_lib";
import {FormMode, FormValues} from "@webmens-ru/ui_lib/dist/components/form/types";
import {useEffect, useState, useCallback} from "react";
import {axiosInst} from "../../app/api/baseQuery";
import {
    useGetFormFieldsQuery,
    useGetFormTitleQuery,
    useGetValidationQuery,
    useLazyGetFormValuesQuery
} from "./mainFormApi";

export interface MainFormProps {
    width?: string,
    mode?: FormMode,
    entity: string,
    action?: string,
    id?: any,
    canToggleMode?: boolean,
    defaultValue?: any,
}

export default function MainForm(
    {
        width = "100%",
        mode = "view",
        entity,
        action = "update",
        id = 0,
        canToggleMode = true,
        defaultValue = {}
    }: MainFormProps) {
    const [getValues] = useLazyGetFormValuesQuery()
    const formFields = useGetFormFieldsQuery(entity);
    const validation = useGetValidationQuery(entity);
    const formTitle = useGetFormTitleQuery(entity);

    const [form, setForm] = useState({values: {}, isLoading: true})


    useEffect(() => {
        if (id == 0 || action === "create") {
            if (defaultValue) {
                setForm({values: defaultValue, isLoading: false})
            } else {
                setForm({values: {}, isLoading: false})
            }
        }else{
            getValues({entity, id}).then((response: { data: FormValues; }) => {
                setForm({values: response.data, isLoading: false})
            })
        }
    }, [action, entity, id, getValues])

    const handleFormSubmit = (formValues: FormValues) => {
        const url = (action === "create") ? `${entity}/${action}` : `${entity}/${action}?id=${formValues.id}`
        setForm({values:formValues, isLoading: true})
        console.log(form.isLoading)
        return axiosInst({
            url: url,
            method: "POST",
            data: formValues,
        }).then(()=>{
            setForm({values:formValues, isLoading: false})
        })
    }

    const handleAfterSubmit = () => {
        if (process.env.NODE_ENV === "production") {
            BX24.closeApplication()
        }
    }

    if (!formFields.isLoading && !validation.isLoading && !formTitle.isLoading && !form.isLoading) {
        return (
            <div className="page" style={{width}}>
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
    } else
        return <Loader/>
}
