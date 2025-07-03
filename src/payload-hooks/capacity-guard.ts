/* eslint-disable @typescript-eslint/no-explicit-any */
export const capacityGuard = async ({ data, req, operation }: any) => {
  if (operation !== "create") return data;

  const event = await req.payload.findByID({
    collection: "events",
    id: data.event,
    depth: 0,
  });

  if (event.ticketsSold >= event.capacity) {
    throw new Error("Event capacity reached");
  }
  return data;
};
