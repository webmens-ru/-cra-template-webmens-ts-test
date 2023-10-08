import axios from "axios";

export const PRINT_FRAME_NAME = "wm_print_frame"

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

export const getPrintFrame = (): Window => {
  // @ts-ignore
  let frame: Window = window.frames[PRINT_FRAME_NAME]

  if (frame) return frame

  const printFrame = document.createElement("iframe")
  printFrame.src = "about:blank"
  printFrame.name = PRINT_FRAME_NAME
  printFrame.width = "0"
  printFrame.height = "0"
  printFrame.frameBorder = "0"
  document.body.append(printFrame)
  
  // @ts-ignore
  return window.frames[PRINT_FRAME_NAME]
}
