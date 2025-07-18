import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

const SEG_BITS = 16; // 4 segments → 64 bit
const SEG_MASK = BigInt("0xFFFF");

export async function indexUserLSH(userId: string, sig: bigint) {
  for (let i = 0; i < 4; i++) {
    const seg = Number((sig >> BigInt(i * SEG_BITS)) & SEG_MASK);
    await redis.sadd(`bucket:${i}:${seg}`, userId);
  }
}

export async function candidatesFor(sig: bigint): Promise<string[]> {
  const keys = [];
  for (let i = 0; i < 4; i++) {
    const seg = Number((sig >> BigInt(i * SEG_BITS)) & SEG_MASK);
    keys.push(`bucket:${i}:${seg}`);
  }
  return redis.sunion(...keys);
}
