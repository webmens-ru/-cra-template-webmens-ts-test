import React, {useCallback, useEffect, useImperativeHandle, useReducer, useState} from "react";
import {Button} from "../button";
import {EditForm} from "./components/EditForm";
import {ViewForm} from "./components/ViewForm";
import {init, reducer} from "./reducer";
import {
    FormButtonsContainer,
    FormContainer,
    FormHeader,
    FormInnerContainer,
    FormModeToggler,
    FormTitle,
    GlobalStyleForm,
    BlockContainer,
    BlockInnerContainer,
} from "./styles";
import {FormValues, IFormProps, IFormRefHandlers, IValidationErrorItem} from "./types";
import {prepareFormData} from "./utils/parse";
import {validator} from "./utils/validator";
import {useLazyGetDepositQuery} from "../../pages/mainForm/mainFormApi";

export const Form = React.forwardRef(
    (
        {
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
            onFieldChange = () => {
            },
            onSubmit = () => Promise.resolve(),
            onAfterSubmit = () => {
            },
            onInit = () => {
            },
            onEditEnd = () => {
            },
            onValuesChange = () => {
            },
            dealData,
            contactData,
            onDealClick,
            onContactClick,
            entity
        }: IFormProps,
        ref: React.ForwardedRef<IFormRefHandlers>
    ) => {
        const [form, dispatch] = useReducer(
            reducer,
            {
                fields,
                values,
                errors: [],
                validationRules,
                mode,
                onFieldChange,
            },
            init
        );

        const [deposit, setDeposit] = useState<number | null>(null);
        const [getDeposit] = useLazyGetDepositQuery(entity);

        const fetchDeposit = useCallback(async (vehicleId: string | number) => {
            try {
                const depositData = await getDeposit(String(vehicleId)).unwrap();
                setDeposit(depositData.deposit);
            } catch (error) {
                console.error('Error fetching deposit:', error);
                setDeposit(null);
            }
        }, [getDeposit]);

        useEffect(() => {
            const vehicleValue = form.tempValues.parentId1036;

            const getVehicleId = (): string | number | null => {
                if (!vehicleValue) return null;

                // Если это массив (MultifieldItemValue может быть string[])
                if (Array.isArray(vehicleValue)) {
                    if (vehicleValue.length === 0) return null;
                    const firstItem = vehicleValue[0];
                    return typeof firstItem === 'object' && firstItem !== null && 'value' in firstItem
                        ? firstItem.value
                        : String(firstItem);
                }

                // Если это примитив
                if (typeof vehicleValue === 'string' || typeof vehicleValue === 'number') {
                    return vehicleValue;
                }

                return null;
            };

            const vehicleId = getVehicleId();

            if (vehicleId) {
                fetchDeposit(vehicleId);
            } else {
                setDeposit(null);
            }
        }, [form.tempValues.parentId1036, fetchDeposit]);

        const [daysDifference, setDaysDifference] = useState<number | null>(null);
        // ДОБАВИМ ЭФФЕКТ ДЛЯ ВЫЗОВА onValuesChange ПРИ ИЗМЕНЕНИИ tempValues
        useEffect(() => {
            if (form.inited && Object.keys(form.tempValues).length > 0) {
                onValuesChange(form.tempValues);
            }
        }, [form.tempValues, form.inited, onValuesChange]);

        useEffect(() => {
            onInit(form.values);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [form.inited]);

        useEffect(() => {
            if (errors.length) {
                dispatch({type: "set_errors", errors});
            }
        }, [errors]);

        useEffect(() => {
            dispatch({type: "set_mode", mode});
        }, [mode]);

        const toggleFormMode = () => {
            if (form.mode === "edit") {
                const resp = window.confirm(
                    "Вы уверены, что хотите отменить изменения?"
                );
                if (resp) {
                    dispatch({type: "undo_changes"});
                    onEditEnd();
                    return;
                }
            } else {
                dispatch({type: "toggle_mode"});
            }
        };

        const validateAllFields = () => {
            console.log("VALIDATE ALL FIELDS", form.errors);
            const errors: IValidationErrorItem[] = form.fields
                .map((field) => {
                    const value = form.tempValues[field.name];
                    return validator(field.name, value, validationRules);
                })
                .flat();
            dispatch({type: "set_errors", errors});

            return errors.length === 0;
        };

        const handleFormSubmit = () => {
            const isValid = validateAllFields();

            if (isValid) {
                return onSubmit(prepareFormData(form))
                    .then((response) => {
                        dispatch({type: "submit_form"});
                        onAfterSubmit(response);
                        return true;
                    })
                    .catch(({response}) => {
                        console.log("FORM CATCH", response, response.status);
                        if (response.status !== 500) {
                            dispatch({type: "set_errors", errors: response.data});
                        }
                        return false;
                    });
            } else {
                return false;
            }
        };

        useImperativeHandle(ref, () => ({
            validateAllFields,
            submit: handleFormSubmit,
        }));

        const handleDealClick = () => {
            if (dealData && onDealClick) {
                onDealClick({
                    type: dealData.type,
                    url: dealData.url
                });
            }
        };

        const handleContactClick = () => {
            if (contactData && onContactClick) {
                onContactClick({
                    type: contactData.type,
                    url: contactData.url
                });
            }
        };

        const calculateDaysDifference = useCallback(() => {
            const startDateValue = form.tempValues.ufCrm19DateRentStart;
            const endDateValue = form.tempValues.ufCrm19DateRentEnd;

            console.log([startDateValue, 'startDateValue']);
            console.log([endDateValue, 'endDateValue']);

            const startDateStr = String(startDateValue || '');
            const endDateStr = String(endDateValue || '');

            if (startDateStr && endDateStr) {
                try {
                    // Парсим даты напрямую (JavaScript умеет парсить формат YYYY-MM-DD)
                    const startDate = new Date(startDateStr);
                    const endDate = new Date(endDateStr);

                    // Проверяем, что даты валидны
                    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                        setDaysDifference(null);
                        return;
                    }

                    // Вычисляем разницу в днях
                    const diffTime = endDate.getTime() - startDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    setDaysDifference(diffDays >= 0 ? diffDays : null);
                } catch (error) {
                    console.error('Error parsing dates:', error);
                    setDaysDifference(null);
                }
            } else {
                setDaysDifference(null);
            }
        }, [form.tempValues.ufCrm19DateRentStart, form.tempValues.ufCrm19DateRentEnd]);

// Эффект для вызова onValuesChange при изменении tempValues
        useEffect(() => {
            if (form.inited && Object.keys(form.tempValues).length > 0) {
                onValuesChange(form.tempValues);
                calculateDaysDifference(); // Пересчитываем разницу дней
            }
        }, [form.tempValues, form.inited, onValuesChange, calculateDaysDifference]);


        if (viewType === "full") {
            return (
                <>
                    <FormContainer
                        mode={form.mode}
                        viewType={viewType}
                        width={width}
                        height={height}
                    >
                        <GlobalStyleForm/>
                        <FormHeader>
                            <FormTitle children={formTitle}/>
                            {canToggleMode && (
                                <FormModeToggler
                                    children={form.mode === "view" ? "Изменить" : "Отменить"}
                                    onClick={toggleFormMode}
                                />
                            )}
                        </FormHeader>
                        <FormInnerContainer mode={form.mode} viewType={viewType}>
                            {form.mode === "edit" ? (
                                <EditForm
                                    form={form}
                                    dispatch={dispatch}
                                    fields={fields}
                                    validationRules={form.validationRules}
                                    onFieldChange={onFieldChange}
                                />
                            ) : (
                                <ViewForm form={form} fields={fields}/>
                            )}

                        </FormInnerContainer>
                    </FormContainer>

                    <BlockContainer>
                        <FormHeader>
                            <FormTitle children='Additional data'/>
                        </FormHeader>
                        <BlockInnerContainer>
                            {deposit !== null && (
                                <div style={{
                                    fontSize: 14,
                                    color: '#525c69',
                                    marginBottom: '15px',
                                }}>
                                    <div style={{ marginBottom: 5 }}>Deposit:</div>
                                    <div style={{
                                        fontSize: 16,
                                        color: '#2066B0',
                                    }}>
                                        {deposit} ฿
                                    </div>
                                </div>
                            )}
                            {daysDifference !== null && (
                                <div style={{
                                    fontSize: 14,
                                    color: '#525c69',
                                    marginBottom: '15px',
                                }}>
                                    <div style={{marginBottom: 5}}>Rental period:</div>
                                    <div style={{
                                        fontSize: 16,
                                        color: '#2066B0',
                                    }}>
                                        {daysDifference} day{daysDifference !== 1 ? 's' : ''}
                                    </div>
                                </div>
                            )}
                            {dealData && (
                                <div style={{
                                    fontSize: 14,
                                    color: '#525c69',
                                    marginBottom: '15px',
                                }}>
                                    <div style={{
                                        marginBottom: 5,
                                    }}>Deal:
                                    </div>
                                    <div onClick={handleDealClick} style={{
                                        fontSize: 16,
                                        color: '#2066B0',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                    }}>
                                        {dealData.title}
                                    </div>
                                </div>
                            )}
                            {contactData && (
                                <div style={{
                                    fontSize: 14,
                                    color: '#525c69',
                                    marginBottom: '15px',
                                }}>
                                    <div style={{
                                        marginBottom: 5,
                                    }}>Contact:
                                    </div>
                                    <div onClick={handleContactClick} style={{
                                        fontSize: 16,
                                        color: '#2066B0',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                    }}>
                                        {contactData.title}
                                    </div>
                                </div>
                            )}
                        </BlockInnerContainer>
                    </BlockContainer>
                    {form.mode === "edit" && (
                        <FormButtonsContainer>
                            <Button
                                color="success"
                                children="Save"
                                buttonProps={{onClick: handleFormSubmit}}
                            />
                            <Button
                                color="gray"
                                children="Cancel"
                                buttonProps={{onClick: toggleFormMode}}
                            />
                        </FormButtonsContainer>
                    )}
                </>
            );
        } else {
            return (
                <>
                    <GlobalStyleForm/>
                    <FormInnerContainer mode="edit" viewType={viewType}>
                        <EditForm
                            form={form}
                            dispatch={dispatch}
                            fields={fields}
                            validationRules={form.validationRules}
                            onFieldChange={onFieldChange}
                        />
                    </FormInnerContainer>
                </>
            );
        }
    }
);
