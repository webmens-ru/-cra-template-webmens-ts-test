import { TField } from "@webmens-ru/ui_lib/dist/components/filter/types";

type TAllFieldYii = {
  id: number;
  entityCode: string;
  typeId: number;
  title: string;
  order: number;
  type: {
    id: number;
    name: string;
  };
  filterFieldOptions: [];
  code: string;
  params: any;
};

type TFieldYii = {
  id: number;
  filterId: number;
  filterFieldId: number;
  value: null | string[];
  title: "";
  order: number;
};

export const concatFieldsAndAllFields = (
  fields: TFieldYii[],
  allFields: TAllFieldYii[],
): TField[] => {  
  if (!fields || !allFields) {
    return [];
  }
  return allFields.slice().map((allField) => {
    const field = fields.find((field) => field.filterFieldId === allField.id);
    let result = {
      id: -allField.id,
      filterId: 0,
      order: 0,
      value: ["", "", ""],
      type: allField.type.name,
      title: allField.title,
      queryKey: allField.code,
      code: allField.entityCode,
      visible: false,
      params: allField.params
    };
    if (field) {
      result.id = field.id;
      result.filterId = field.filterId;
      result.order = field.order;
      result.visible = true;
      if (field.value) {
        result.value = field.value;
      }
    }
    return result;
  });
};
