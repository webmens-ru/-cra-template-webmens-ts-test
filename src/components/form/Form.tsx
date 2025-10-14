import React, { useEffect, useImperativeHandle, useReducer } from "react";
import { Button } from "../button";
import { EditForm } from "./components/EditForm";
import { ViewForm } from "./components/ViewForm";
import { init, reducer } from "./reducer";
import {
    FormButtonsContainer,
    FormContainer,
    FormHeader,
    FormInnerContainer,
    FormModeToggler,
    FormTitle,
    GlobalStyleForm
} from "./styles";
import { IFormProps, IFormRefHandlers, IValidationErrorItem } from "./types";
import { prepareFormData } from "./utils/parse";
import { validator } from "./utils/validator";

export const Form = React.forwardRef(({
                                          fields = [],
                                          values = {},
                                          errors = [],
                                          mode = "edit",
                                          viewType = "full",
                                          formTitle = "Форма",
                                          width = "100%",
                                          height = "100vh",
                                          canToggleMode = true,
                                          validationRules = [],
                                          onFieldChange = () => { },
                                          onSubmit = () => Promise.resolve(),
                                          onAfterSubmit = () => { },
                                          onInit = () => { },
                                          onEditEnd = () => { }
                                      }: IFormProps, ref: React.ForwardedRef<IFormRefHandlers>) => {
    const [form, dispatch] = useReducer(reducer, {
        fields,
        values,
        errors: [],
        validationRules,
        mode,
        onFieldChange
    }, init)

    useEffect(() => {
        onInit(form.values)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.inited])

    useEffect(() => {
        if (errors.length) {
            dispatch({ type: 'set_errors', errors })
        }
    }, [errors])

    useEffect(() => {
        dispatch({ type: "set_mode", mode })
    }, [mode])

    const toggleFormMode = () => {
        if (form.mode === 'edit') {
            const resp = window.confirm('Вы уверены, что хотите отменить изменения?')
            if (resp) {
                dispatch({ type: "undo_changes" })
                onEditEnd()
                return
            }
        } else {
            dispatch({ type: 'toggle_mode' })
        }
    }

    const validateAllFields = () => {
        console.log('VALIDATE ALL FIELDS', form.errors)
        const errors: IValidationErrorItem[] = form.fields.map((field) => {
            const value = form.tempValues[field.name]
            return validator(field.name, value, validationRules)
        }).flat()
        dispatch({ type: "set_errors", errors })

        return errors.length === 0
    }

    const handleFormSubmit = () => {
        const isValid = validateAllFields()

        if (isValid) {
            return onSubmit(prepareFormData(form)).then(response => {
                dispatch({ type: "submit_form" })
                onAfterSubmit(response)
                return true
            }).catch(({ response }) => {
                console.log('FORM CATCH', response, response.status)
                if (response.status !== 500) {
                    dispatch({ type: "set_errors", errors: response.data })
                }
                return false
            })
        } else {
            return false
        }
    }

    useImperativeHandle(ref, () => ({ validateAllFields, submit: handleFormSubmit }))

    if (!form.inited) {
        return <></>
    }

    if (viewType === "full") {
        return (
            <FormContainer mode={form.mode} viewType={viewType} width={width} height={height} >
                <GlobalStyleForm />
                <FormHeader>
                    <FormTitle children={formTitle} />
                    {canToggleMode &&
                        <FormModeToggler
                            children={form.mode === 'view' ? "Изменить" : "Отменить"}
                            onClick={toggleFormMode}
                        />
                    }
                </FormHeader>
                <FormInnerContainer mode={form.mode} viewType={viewType} >
                    {form.mode === 'edit'
                        ? <EditForm
                            form={form}
                            dispatch={dispatch}
                            fields={fields}
                            validationRules={form.validationRules}
                            onFieldChange={onFieldChange}
                        />
                        : <ViewForm
                            form={form}
                            fields={fields}
                        />
                    }
                </FormInnerContainer>
                {form.mode === "edit" && (
                    <FormButtonsContainer>
                        <Button color="success" children="Сохранить" buttonProps={{ onClick: handleFormSubmit }} />
                        <Button color="gray" children="Отменить" buttonProps={{ onClick: toggleFormMode }} />
                    </FormButtonsContainer>
                )}

            </FormContainer>
        )
    } else {
        return (
            <>
                <GlobalStyleForm />
                <FormInnerContainer mode="edit" viewType={viewType} >
                    <EditForm
                        form={form}
                        dispatch={dispatch}
                        fields={fields}
                        validationRules={form.validationRules}
                        onFieldChange={onFieldChange}
                    />
                </FormInnerContainer>
            </>
        )
    }
})
