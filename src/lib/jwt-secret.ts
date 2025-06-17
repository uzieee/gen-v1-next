import "dotenv/config";
export const JWT_SECRET = (process.env.PAYLOAD_SECRET || "").trim();
if (!JWT_SECRET) throw new Error("PAYLOAD_SECRET missing");
