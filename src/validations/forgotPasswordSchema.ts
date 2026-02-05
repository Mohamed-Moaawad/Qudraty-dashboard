import z from "zod";

const forgotPasswordSchema = z.object({
    email: z.string()
        .trim()
        .min(1, { message: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'البريد الإلكتروني غير صالح' }),
});

type forgotPasswordType = z.infer<typeof forgotPasswordSchema>

export { forgotPasswordSchema, type forgotPasswordType };