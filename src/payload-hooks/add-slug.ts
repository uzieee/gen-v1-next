/* eslint-disable @typescript-eslint/no-explicit-any */
export const addSlug = ({ data }: any) => {
  if (data?.name && !data?.slug) {
    data.slug = data.name
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  return data;
};
