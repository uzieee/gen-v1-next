import { z } from "zod";

// Button variant type
export type ButtonVariant =
  | "primary"
  | "main"
  | "secondary"
  | "error"
  | "badge"
  | "outline"
  | "outline-main"
  | "outline-primary"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonState = "default" | "disabled" | "active";

export const signInSchema = z.object({
  countryCode: z
    .string({
      required_error: "Country code is required",
    })
    .regex(/^\+\d+$/, {
      message: "Country code must start with + followed by digits",
    }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits",
    })
    .min(9, {
      message: "Phone number must be 9 digits long",
    }),
});

export type ISignInDetails = z.infer<typeof signInSchema>;

export const verifySchema = z.object({
  verificationCode: z
    .string({
      required_error: "Verification code is required",
    })
    .regex(/^\d+$/, {
      message: "Verification code must contain only digits",
    })
    .length(6, {
      message: "Verification code must be 6 digits long",
    }),
});

export type IVerifyDetails = z.infer<typeof verifySchema>;

export const accountSetupSchema = z.object({
  fullNames: z.string({
    required_error: "Full names are required",
  }),
  gender: z.string({
    required_error: "Gender is required",
  }),
  age: z.date({
    required_error: "Age is required",
  }),
});

export type IAccountSetupDetails = z.infer<typeof accountSetupSchema>;

export const interestsHobbiesSchema = z.object({
  interests: z.array(z.string()).optional(),
  sports: z.array(z.string()).optional(),
});

export type IInterestsHobbiesDetails = z.infer<typeof interestsHobbiesSchema>;

export const vibeSchema = z.object({
  vibe: z.string({
    required_error: "Vibe is required",
  }),
});

export type IVibeDetails = z.infer<typeof vibeSchema>;

export const languageCountrySchema = z.object({
  languages: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional()
});
export type ILanguageCountryDetails = z.infer<typeof languageCountrySchema>;

