/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SparseVector } from "./vector";

/**
 * Cosine similarity between two sparse vectors.
 * Returns 0 → 1 (1 = identical, 0 = orthogonal).
 */
export function cosine(a: SparseVector, b: SparseVector): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  // combine keys once for speed
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const k of keys) {
    const va = a[k as any] ?? 0;
    const vb = b[k as any] ?? 0;
    dot += va * vb;
    normA += va * va;
    normB += vb * vb;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / Math.sqrt(normA * normB);
}
