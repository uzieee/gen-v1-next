/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { SparseVector } from "./vector";
// @ts-ignore
import simhash from "simhash-js";

export function vectorToSimhash(vec: SparseVector): bigint {
  const features = Object.entries(vec).map(([token, weight]) => ({
    token,
    weight,
  }));
  return simhash.hash(features);
}
