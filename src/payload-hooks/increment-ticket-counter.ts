/* eslint-disable @typescript-eslint/no-explicit-any */
export const incrementTicketCounter = async ({ doc, operation, req }: any) => {
  if (operation !== "create") return;
  await req.payload.update({
    collection: "events",
    id: doc.event as string,
    data: { ticketsSold: { increment: 1 } },
    depth: 0,
  });
};
