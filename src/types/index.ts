import { z } from "zod";

// Button variant type
export type ButtonVariant = 'primary' | 'main' | 'secondary' | 'error' | 'badge' | 'outline' | 'outline-main' | 'outline-primary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'disabled' | 'active';

export const signInSchema = z.object({
    phoneNumber: z.string({
        required_error: 'Phone number is required',
    }).length(9, {
        message: 'Phone number must be 9 digits long',
    }).regex(/^\d+$/, {
        message: 'Phone number must contain only digits',
    })
});

export type ISignInDetails = z.infer<typeof signInSchema>;
