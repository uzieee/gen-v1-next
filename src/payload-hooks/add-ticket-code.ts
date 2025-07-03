import { generateTicketCode } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const addTicketCode = ({ data }: any) => {
  if (!data?.code) data.code = generateTicketCode();
  return data;
};
