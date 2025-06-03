import { z } from "zod";

// Button variant type
export type ButtonVariant = 'primary' | 'main' | 'secondary' | 'error' | 'badge' | 'outline' | 'outline-main' | 'outline-primary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonState = 'default' | 'disabled' | 'active';

export const signInSchema = z.object({
    phoneNumber: z.string({
        required_error: 'Phone number is required',
    }).regex(/^\d+$/, {
        message: 'Phone number must contain only digits',
    }).length(9, {
        message: 'Phone number must be 9 digits long',
    })
});

export type ISignInDetails = z.infer<typeof signInSchema>;

export const verifySchema = z.object({
    verificationCode: z.string({
        required_error: 'Verification code is required',
    }).regex(/^\d+$/, {
        message: 'Verification code must contain only digits',
    }).length(6, {
        message: 'Verification code must be 6 digits long',
    }),
});

export type IVerifyDetails = z.infer<typeof verifySchema>;
