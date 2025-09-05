import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosInst } from "../../app/api/baseQuery";
import { ErrorResponse } from "../../app/model/query";
import { convertToFormData } from "../../app/utils/formatters/form";
import {
  useGetFormFieldsQuery,
  useGetFormTitleQuery,
  useGetValidationQuery,
  useLazyGetFormValuesQuery,
} from "./mainFormApi";
import Form, { type FormMode, type FormValues } from "../../components/form";
import { Loader } from "../../components/loader";
import useNotification from "../../components/notification";

export interface MainFormProps {
  width?: string;
  height?: string;
  mode?: FormMode;
  entity: string;
  action?: string;
  id?: any;
  canToggleMode?: boolean;
  defaultValue?: any;
  closeSliderOnSubmit?: boolean;
  onAfterSubmit?: (values: any) => void;
  onValuesChange?: (values: FormValues) => void; // ДОБАВЛЕННЫЙ ПРОПС
  onDealClick?: (dealData: { type: string; url: string }) => void;
}

export default function MainForm({
  width = "100%",
  height = "calc(100vh - 50px)",
  mode = "view",
  entity,
  action = "update",
  id = 0,
  canToggleMode = true,
  closeSliderOnSubmit = true,
  defaultValue = {},
  onAfterSubmit = () => {},
  onValuesChange,
  onDealClick,
}: MainFormProps) {
  const [getValues] = useLazyGetFormValuesQuery();
  const formFields = useGetFormFieldsQuery(entity);
  const validation = useGetValidationQuery(entity);
  const formTitle = useGetFormTitleQuery(entity);

  const [notificationContext, notificationApi] = useNotification();

  const [form, setForm] = useState({ values: defaultValue, isLoading: false });
  const [submitError, setSubmitError] = useState<{
    error: boolean;
    data?: ErrorResponse;
  }>({ error: false });

  const updateFormValues = (newValues: FormValues) => {
    // setForm((prev) => ({ ...prev, values: newValues }));

    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  const handleFormSubmit = (formValues: FormValues) => {
    setForm({ values: formValues, isLoading: true });

    const url =
      action === "create"
        ? `${entity}/${action}`
        : `${entity}/${action}?id=${formValues.id}`;
    const formData = convertToFormData(formValues);
    const submitRequest = axiosInst
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const values = {
          ...formValues,
          id: action === "create" ? response.data.id : formValues.id,
        };

        setForm({ values, isLoading: false });
        setSubmitError({ error: false, data: undefined });
        onAfterSubmit(values);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setForm({ values: formValues, isLoading: false });
        setSubmitError({ error: true, data: error.response?.data });
        return Promise.reject(error);
      });

    return submitRequest;
  };

  const handleAfterSubmit = () => {
    console.log(submitError, closeSliderOnSubmit);
    requestAnimationFrame(() => {
      if (
        !submitError.error &&
        closeSliderOnSubmit &&
        process.env.NODE_ENV === "production" &&
        window._APP_TYPE_ !== "site"
      ) {
        BX24.closeApplication();
      } else if (submitError.data && submitError.data.notification) {
        notificationApi.show(submitError.data.notification);
      }
    });
  };

  useEffect(() => {
    if (id !== 0 && action !== "create") {
      setForm({ ...form, isLoading: true });
      getValues({ entity, id }).then((response: { data: FormValues }) => {
        const values = response.data;
        setForm({ values, isLoading: false });

        if (onValuesChange) {
          onValuesChange(values);
        }
      });
    } else {
      setForm({ ...form, isLoading: false });

      // ВЫЗЫВАЕМ CALLBACK С ДЕФОЛТНЫМИ ЗНАЧЕНИЯМИ
      if (onValuesChange && Object.keys(defaultValue).length > 0) {
        onValuesChange(defaultValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, action]);

  if (
    formFields.isLoading ||
    validation.isLoading ||
    formTitle.isLoading ||
    form.isLoading
  ) {
    return <Loader />;
  }

  return (
    <>
      {notificationContext}
      <div className="page" style={{ width }}>
        <Form
          fields={formFields.data}
          values={form.values}
          errors={submitError.data}
          mode={mode}
          formTitle={formTitle.data?.name}
          height={height}
          validationRules={validation.data}
          canToggleMode={canToggleMode}
          onInit={(values) => {
            setForm({ isLoading: false, values });
            // ВЫЗЫВАЕМ CALLBACK ПРИ ИНИЦИАЛИЗАЦИИ ФОРМЫ
            if (onValuesChange) {
              onValuesChange(values);
            }
          }}
          onValuesChange={updateFormValues}
          onSubmit={handleFormSubmit}
          onAfterSubmit={handleAfterSubmit}
          onDealClick={onDealClick}
          dealData={form.values?.deal}
        />
      </div>
    </>
  );
}
