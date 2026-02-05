import z from "zod";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'البريد الإلكتروني غير صالح' }),
    password: z
        .string()
        .trim()
        .min(1, { message: 'كلمة المرور مطلوبة' })
        .min(6, { message: 'كلمة المرور يجب أن تكون ٦ أحرف على الأقل' })
})

type loginType = z.infer<typeof loginSchema>
export { loginSchema, type loginType };