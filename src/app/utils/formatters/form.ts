export function convertToFormData(data: any, formData = new FormData(), parentKey = '') {
  for (let key in data) {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: any, index: number) => {
          const finalKey = parentKey ? `${parentKey}[${key}][${index}]` : `${key}[${index}]`
          if (typeof item === "object") {
            convertToFormData(item, formData, finalKey);
          } else {
            formData.append(finalKey, item)
          }
        });
      } else {
        const finalKey = parentKey ? `${parentKey}[${key}]` : key
        convertToFormData(data[key], formData, finalKey);
      }
    } else {
      const finalKey = parentKey ? `${parentKey}[${key}]` : key;
      formData.append(finalKey, data[key]);
    }
  }

  return formData;
}
