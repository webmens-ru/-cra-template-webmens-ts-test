import axios from "axios";

export const formatData = (
  schema: any[],
  grid: any[] = [],
  footer: any[] = [],
) => {
  const firstItem = schema
    .map((item) => ({ [item.code]: item.title }))
    .reduce((acc, item) => ({ ...acc, ...item }));
  const newGrid = grid.map((item) => ({
    ...Object.keys(firstItem)
      .map((key) =>
        typeof item[key] === "object"
          ? { [key]: item[key].title }
          : { [key]: item[key] },
      )
      .reduce((acc, item) => ({ ...acc, ...item })),
  }));
  const lastItem = Object.keys(firstItem)
    .map((key) => (footer[0][key] ? { [key]: footer[0][key] } : { [key]: "" }))
    .reduce((acc, item) => ({ ...acc, ...item }));
  return [firstItem, ...newGrid, lastItem];
};

export const downloadFile = async (url: string, data: any, format: string) => {
  try {
    const response = await axios({
      method: "post",
      url: window._HOSTNAME_ + url,
      responseType: "blob",
      headers: {
        authorization: `Bearer ${window._ACCESS_TOKEN_}`,
      },
      data,
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([response.data]));
    link.setAttribute("download", `${Date.now()}.${format}`);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
  }
};
