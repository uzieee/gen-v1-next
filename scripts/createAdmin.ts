import "dotenv/config"; // ① env first
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config"; // ② config as object

(async () => {
  // ③ boot Payload head-less
  const payload = await getPayload({
    config: payloadConfig, // object, not file-path// override in case config is empty
  });

  // ④ check for existing admin
  const { docs } = await payload.find({
    collection: "users",
    limit: 1,
    where: { role: { equals: "admin" } },
  });

  if (docs.length) {
    console.log("✅ admin exists →", docs[0].email);
    return;
  }

  // ⑤ create bootstrap admin
  const admin = await payload.create({
    collection: "users",
    data: {
      phoneNumber: "N/A",
      role: "admin",
      email: process.env.ADMIN_EMAIL || "",
      password: process.env.ADMIN_PASSWORD || "",
      isPhoneNumberVerified: true,
    },
  });

  console.log("🎉 admin created →", admin.email);
})();
