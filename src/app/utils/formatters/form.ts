export function convertToFormData(data: any, formData = new FormData(), parentKey = '') {
  for (let key in data) {
    const dataItem = data[key];
    const finalKey = parentKey ? `${parentKey}[${key}]` : key;

    if (typeof dataItem === 'object') {
      if (dataItem instanceof File) {
        formData.append(finalKey, dataItem)
      } else if (Array.isArray(dataItem)) {
        dataItem.forEach((item: any, index: number) => {
          const finalKey = parentKey ? `${parentKey}[${key}][${index}]` : `${key}[${index}]`
          if (typeof item === "object") {
            convertToFormData(item, formData, finalKey);
          } else {
            formData.append(finalKey, item)
          }
        });
      } else {
        convertToFormData(dataItem, formData, finalKey);
      }
    } else {
      formData.append(finalKey, dataItem);
    }
  }

  return formData;
}
