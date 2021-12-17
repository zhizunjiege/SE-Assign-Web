import { AxiosError } from "axios";

export function errorHandler(
  error: unknown,
  handlers?: { [code: number | string]: (e: AxiosError) => void },
  dropback?: (e: any) => void
) {
  if (error instanceof Error && "isAxiosError" in error) {
    const e = error as AxiosError;
    if (e.response && handlers) {
      const handler = handlers[e.response.status];
      if (handler instanceof Function) {
        handler(e);
      }
    }
  } else {
    if (dropback) {
      dropback(error);
    }
  }
}
