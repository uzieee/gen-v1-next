import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { customAlphabet } from "nanoid";
import { Attribute, Profession, Startup } from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountryCodes() {
  return [
    { code: "1", country: "Canada", flag: "🇨🇦" },
    { code: "1", country: "United States", flag: "🇺🇸" },
    { code: "84", country: "Vietnam", flag: "🇻🇳" },
    { code: "44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "86", country: "China", flag: "🇨🇳" },
    { code: "81", country: "Japan", flag: "🇯🇵" },
    { code: "82", country: "South Korea", flag: "🇰🇷" },
    { code: "65", country: "Singapore", flag: "🇸🇬" },
    { code: "66", country: "Thailand", flag: "🇹🇭" },
    { code: "60", country: "Malaysia", flag: "🇲🇾" },
    { code: "62", country: "Indonesia", flag: "🇮🇩" },
    { code: "63", country: "Philippines", flag: "🇵🇭" },
    { code: "91", country: "India", flag: "🇮🇳" },
    { code: "92", country: "Pakistan", flag: "🇵🇰" },
    { code: "61", country: "Australia", flag: "🇦🇺" },
    { code: "49", country: "Germany", flag: "🇩🇪" },
    { code: "33", country: "France", flag: "🇫🇷" },
    { code: "39", country: "Italy", flag: "🇮🇹" },
    { code: "34", country: "Spain", flag: "🇪🇸" },
    { code: "7", country: "Russia", flag: "🇷🇺" },
    { code: "55", country: "Brazil", flag: "🇧🇷" },
    { code: "52", country: "Mexico", flag: "🇲🇽" },
    { code: "41", country: "Switzerland", flag: "🇨🇭" },
    { code: "31", country: "Netherlands", flag: "🇳🇱" },
    { code: "46", country: "Sweden", flag: "🇸🇪" },
    { code: "47", country: "Norway", flag: "🇳🇴" },
    { code: "45", country: "Denmark", flag: "🇩🇰" },
    { code: "353", country: "Ireland", flag: "🇮🇪" },
    { code: "351", country: "Portugal", flag: "🇵🇹" },
    { code: "30", country: "Greece", flag: "🇬🇷" },
    { code: "48", country: "Poland", flag: "🇵🇱" },
    { code: "420", country: "Czech Republic", flag: "🇨🇿" },
    { code: "36", country: "Hungary", flag: "🇭🇺" },
    { code: "381", country: "Serbia", flag: "🇷🇸" },
    { code: "250", country: "Rwanda", flag: "🇷🇼" },
    { code: "254", country: "Kenya", flag: "🇰🇪" },
    { code: "256", country: "Uganda", flag: "🇺🇬" },
    { code: "255", country: "Tanzania", flag: "🇹🇿" },
    { code: "233", country: "Ghana", flag: "🇬🇭" },
    { code: "234", country: "Nigeria", flag: "🇳🇬" },
    { code: "251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "212", country: "Morocco", flag: "🇲🇦" },
    { code: "213", country: "Algeria", flag: "🇩🇿" },
    { code: "216", country: "Tunisia", flag: "🇹🇳" },
    { code: "218", country: "Libya", flag: "🇱🇾" },
    { code: "249", country: "Sudan", flag: "🇸🇩" },
    { code: "963", country: "Syria", flag: "🇸🇾" },
    { code: "964", country: "Iraq", flag: "🇮🇶" },
    { code: "962", country: "Jordan", flag: "🇯🇴" },
    { code: "965", country: "Kuwait", flag: "🇰🇼" },
    { code: "966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "971", country: "United Arab Emirates", flag: "🇦🇪" },
    { code: "974", country: "Qatar", flag: "🇶🇦" },
    { code: "968", country: "Oman", flag: "🇴🇲" },
    { code: "973", country: "Bahrain", flag: "🇧🇭" },
    { code: "961", country: "Lebanon", flag: "🇱🇧" },
  ];
}

/** Example: GEN-8RX7A2JQ (no 0,O,1,l) */
const nano = customAlphabet("346789ABCDEFGHJKMNPQRTUVWXY", 8);

export const generateTicketCode = () => `GEN-${nano()}`;

/** Rotate an array by offset */
export function rotate<T>(arr: T[], offset: number): T[] {
  const n = arr.length;
  const m = ((offset % n) + n) % n;
  return arr.slice(m).concat(arr.slice(0, m));
}

/** Chunk an array into fixed-size batches */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function getProfessionSummary({
  profession,
  userName,
}: {
  profession?: Profession;
  userName: string;
}): string {
  const { jobTitle, jobDescription, professionalField } = profession || {};
  const field = (professionalField as Attribute)?.label;

  // Use job description if it exists and is not empty
  const jd =
    jobDescription && jobDescription.trim().length > 0
      ? `<br />
    ${userName}: ${jobDescription}`
      : "";

  if (jobTitle && field) {
    return `${userName} is a ${jobTitle} working in ${field}.` + jd;
  } else if (jobTitle) {
    return `${userName} works as a ${jobTitle}.` + jd;
  } else if (field) {
    return `${userName} works in ${field}.` + jd;
  } else {
    return jd.length > 0 ? jd : `${userName} is exploring their career path.`;
  }
}

export function getStartupSummary({
  startup,
  userName,
}: {
  startup: Startup;
  userName: string;
}): string {
  const { title, description, stage, industries } = startup;
  const industry = (industries as Attribute[])?.[0]?.label;

  // Use description if it exists and is not empty
  if (description && description.trim().length > 0) {
    return `${userName} is working on ${title}: ${description}`;
  }

  // Build summary based on available information
  if (title && industry && stage) {
    return `${userName} is ${stage} ${title}, a startup in ${industry}.`;
  } else if (title && stage) {
    return `${userName} is ${stage} ${title}.`;
  } else if (title && industry) {
    return `${userName} is working on ${title} in ${industry}.`;
  } else if (title) {
    return `${userName} is working on ${title}.`;
  } else {
    return `${userName} is working on a startup project.`;
  }
}

// Helper function to distribute users across tables
export function distributeUsersToTables<T>(
  users: T[],
  numberOfTables: number,
  maxUsersPerTable: number
): T[][] {
  // Initialize empty arrays for each table
  const tables: T[][] = Array.from({ length: numberOfTables }, () => []);

  // Calculate base distribution
  const baseUsersPerTable = Math.floor(users.length / numberOfTables);
  const remainder = users.length % numberOfTables;

  let userIndex = 0;

  for (let tableIndex = 0; tableIndex < numberOfTables; tableIndex++) {
    // Some tables get one extra user if there's a remainder
    let usersForThisTable =
      baseUsersPerTable + (tableIndex < remainder ? 1 : 0);

    // Don't exceed maxUsersPerTable
    usersForThisTable = Math.min(usersForThisTable, maxUsersPerTable);

    // Assign users to this table
    for (let u = 0; u < usersForThisTable && userIndex < users.length; u++) {
      tables[tableIndex].push(users[userIndex]);
      userIndex++;
    }
  }

  // Handle any remaining users (in case some tables hit maxUsersPerTable limit)
  while (userIndex < users.length) {
    // Find table with space
    const tableWithSpace = tables.find(
      (table) => table.length < maxUsersPerTable
    );
    if (tableWithSpace) {
      tableWithSpace.push(users[userIndex]);
      userIndex++;
    } else {
      // All tables are full - this shouldn't happen with proper configuration
      console.warn(`Cannot assign user ${userIndex + 1}: all tables are full`);
      break;
    }
  }

  return tables;
}
