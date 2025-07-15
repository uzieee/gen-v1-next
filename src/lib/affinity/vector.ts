/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WEIGHTS,
  //   CAT_INTERESTS,
  //   CAT_PROF_FIELDS,
  CAT_COUNTRIES,
} from "./constants";
import { mapJobTitle } from "./taxonomy";
// import type { Payload } from "payload";

export type SparseVector = Record<number, number>;

/**
 * Build a weighted sparse vector for a user.
 * Uses numeric **hash buckets** for each feature to keep the index small.
 */
export async function buildVectorForUser(user: any): Promise<SparseVector> {
  const vec: SparseVector = {};

  /* helper: deterministic hash → 0…9999 (4 digits) */
  const bucket = (str: string) =>
    Math.abs(
      Array.from(str).reduce((h, c) => (h << 5) - h + c.charCodeAt(0), 0)
    ) % 10_000;

  /* attributes ----------------------------------- */
  for (const attr of user.attributes ?? []) {
    const w =
      attr.category?.slug === CAT_COUNTRIES
        ? WEIGHTS.ATTR_COUNTRY
        : WEIGHTS.ATTR_INTEREST;
    vec[bucket("A" + attr.id)] = w;
  }

  /* profession ----------------------------------- */
  if (user.profession) {
    const prof = user.profession;
    vec[bucket("PF" + prof.professionalField.id)] = WEIGHTS.PROF_FIELD;
    vec[bucket("JT" + mapJobTitle(prof.jobTitle))] = WEIGHTS.JOB_TITLE_BUCKET;
  }

  /* startups ------------------------------------- */
  for (const s of user.startups ?? []) {
    vec[bucket("SS" + s.stage)] = WEIGHTS.STARTUP_STAGE;
    for (const ind of s.industries ?? [])
      vec[bucket("SI" + ind.id)] = WEIGHTS.STARTUP_INDUSTRY;
    for (const sup of s.supportNeeded ?? [])
      vec[bucket("SN" + sup)] = WEIGHTS.SUPPORT_NEEDED;
  }

  return vec;
}
