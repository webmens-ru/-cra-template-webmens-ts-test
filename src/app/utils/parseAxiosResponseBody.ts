import type { NotificationProps } from "../../components/notification/types";

/** Разбирает тело ответа axios (JSON-объект, строка, Blob при responseType blob и т.д.) */
export async function parseAxiosResponseBody(data: unknown): Promise<unknown> {
  if (data == null) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as unknown;
    } catch {
      return data;
    }
  }
  if (typeof Blob !== "undefined" && data instanceof Blob) {
    try {
      const text = await data.text();
      try {
        return JSON.parse(text) as unknown;
      } catch {
        return text;
      }
    } catch {
      return null;
    }
  }
  return data;
}

export function extractNotification(payload: unknown): NotificationProps | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;
  const n = (payload as { notification?: unknown }).notification;
  if (!n || typeof n !== "object" || n === null || Array.isArray(n)) return undefined;
  return n as NotificationProps;
}
