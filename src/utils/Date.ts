import { format } from "date-fns";

export const formatDate = (date: string | number | Date, formatStr: string) =>
  format(date, formatStr);
