import { Select } from '@webmens-ru/ui_lib';
import { IDataItem } from '@webmens-ru/ui_lib/dist/components/select/types';
import { useCustomContext } from "../../../store/Context";
import { SelectContainer } from "../../../styles";
import { IField } from "../../../types";

export function SelectWrapper({ item, updateField, ...props }: IField) {
  const { dispatch } = useCustomContext();

  const updateValue = (options: IDataItem[]) => {
    const field = { ...item, value: options as unknown as any };
    console.log(field);
    
    dispatch({ type: "SET_FILTER_FIELD_VALUE", field });
    updateField(field, "valueWithRefetch");
  };

  return (
    <SelectContainer {...props}>
      <Select
        {...item.params}
        value={item.value.filter(val => val)}
        onChange={updateValue}
      />
    </SelectContainer>
  );
}
