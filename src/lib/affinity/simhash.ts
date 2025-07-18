type SparseVector = Record<number, number>;

/**
 * Simple hash function to convert a string to a 64-bit hash
 */
function stringToHash(str: string): bigint {
  let hash = BigInt(0);
  for (let i = 0; i < str.length; i++) {
    const char = BigInt(str.charCodeAt(i));
    hash = (hash << BigInt(5)) - hash + char;
    hash = hash & BigInt("0xFFFFFFFFFFFFFFFF"); // Keep it 64-bit
  }
  return hash;
}

/**
 * Implements Charikar's simhash algorithm
 * @param vec Sparse vector with token indices as keys and weights as values
 * @returns 64-bit simhash as bigint
 */
export function vectorToSimhash(vec: SparseVector): bigint {
  const HASH_BITS = 64;
  const accumulator: number[] = new Array(HASH_BITS).fill(0);

  // Process each feature in the sparse vector
  for (const [tokenStr, weight] of Object.entries(vec)) {
    // Convert token key to string (keys are always strings in Record)
    const token: string = tokenStr;

    // Get hash for this token
    const tokenHash: bigint = stringToHash(token);

    // For each bit position
    for (let i = 0; i < HASH_BITS; i++) {
      // Check if bit i is set in the hash
      const bitMask: bigint = BigInt(1) << BigInt(i);
      const bitValue: number = (tokenHash & bitMask) !== BigInt(0) ? 1 : -1;

      // Add weighted bit value to accumulator
      accumulator[i] += bitValue * weight;
    }
  }

  // Generate final hash by checking sign of each accumulator position
  let simhash: bigint = BigInt(0);
  for (let i = 0; i < HASH_BITS; i++) {
    if (accumulator[i] > 0) {
      simhash |= BigInt(1) << BigInt(i);
    }
  }

  return simhash;
}

/**
 * Calculate Hamming distance between two simhashes
 * Useful for determining similarity (lower distance = more similar)
 */
export function hammingDistance(hash1: bigint, hash2: bigint): number {
  let xor = hash1 ^ hash2;
  let distance = 0;

  while (xor !== BigInt(0)) {
    distance += Number(xor & BigInt(1));
    xor >>= BigInt(1);
  }

  return distance;
}

/**
 * Check if two simhashes are similar within a threshold
 * @param hash1 First simhash
 * @param hash2 Second simhash
 * @param threshold Maximum Hamming distance for similarity (default: 3)
 * @returns true if hashes are similar
 */
export function areSimilar(
  hash1: bigint,
  hash2: bigint,
  threshold: number = 3
): boolean {
  return hammingDistance(hash1, hash2) <= threshold;
}
