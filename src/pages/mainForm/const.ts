import { FormFieldsItem } from "@webmens-ru/ui_lib/dist/components/form/types" 

export const mainFormFields = [
  { type: "input", name: "last_name", label: "Фамилия" },
  { type: "input", name: "first_name", label: "Имя" },
  { type: "input", name: "second_name", label: "Отчество" },
  { type: "input", name: "last_name_en", label: "Фамилия", labelSuffix: "на англ. языке" },
  { type: "input", name: "first_name_en", label: "Имя", labelSuffix: "на англ. языке" },
  { type: "input", name: "company_name", label: "Название компании" },
  { type: "input", name: "company_name_en", label: "Название компании", labelSuffix: "на англ. языке" },
  { type: "input", name: "job_title", label: "Должность" },
  { type: "input", name: "phone", label: "Телефон" },
  { type: "input", name: "mail", label: "Электронная почта" },
  { type: "input", name: "qr_code", label: "QR-код" },
  { type: "input", name: "passport_serial", label: "Серия" },
  { type: "input", name: "passport_number", label: "Номер" },
  { type: "input", name: "issuing_body", label: "Выдан" },
  { type: "input", name: "date_of_issue", label: "Дата выдачи" },
  { type: "input", name: "unit_code", label: "Код подразделения" },
  { type: "input", name: "date_of_birth", label: "Дата рождения" },
  { type: "input", name: "place_of_birth", label: "Место рождения" },
  { type: "input", name: "registration_address", label: "Адрес прописки" },

] as FormFieldsItem[]
