import "dotenv/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Attributes } from "./collections/Attributes";
import { AttributeCategories } from "./collections/AttributeCategories";
import { UserAttributes } from "./collections/UserAttributes";
import { Organizers } from "./collections/Organizers";
import { Events } from "./collections/Events";
import { Tickets } from "./collections/Tickets";
import { Professions } from "./collections/Professions";
import { Startups } from "./collections/Startups";
import { TableAssignments } from "./collections/TableAssignments";
import { Sessions } from "./collections/Sessions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Attributes,
    AttributeCategories,
    UserAttributes,
    Organizers,
    Events,
    Tickets,
    Professions,
    Startups,
    Sessions,
    TableAssignments,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
