import { AxiosError } from "axios";

export function errorHandler(error: unknown, handlers: { [key: number | string]: (e: AxiosError) => void }) {
  const e = error as AxiosError;
  if (e.response) {
    const status = e.response.status;
    handlers[status](e);
  }
}
