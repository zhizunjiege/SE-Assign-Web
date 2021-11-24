import { date } from "quasar";

export function getTimeString(timestamp = Date.now()) {
  return date.formatDate(timestamp, "YYYY/MM/DD HH:mm:ss");
}
