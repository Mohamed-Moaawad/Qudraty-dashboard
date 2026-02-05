import z from "zod";


const addTeamMemberSchema = z.object({
    fullName: z
        .string()
        .trim()
        .nonempty('الأسم مطلوب')
        .min(2, { message: 'الاسم لازم يكون 2 حروف على الأقل' }),
    phone: z
        .string()
        .trim()
        .nonempty('رقم الهاتف مطلوب')
        .regex(/^01[0-9]{9}$/, { message: "رقم الهاتف غير صحيح" }),
    role: z
        .enum(["مشرف", "مراقب"], { message: "يجب اختيار دور" }),
    email: z
        .string()
        .trim()
        .nonempty('البريد الإلكتروني مطلوب')
        .email({ message: 'البريد الإلكتروني غير صالح' }),
    password: z
        .string()
        .trim()
        .nonempty('كلمة المرور مطلوبة')
        .min(6, { message: 'كلمة المرور يجب أن تكون ٦ أحرف على الأقل' })
});

type addTeamMemberType = z.infer<typeof addTeamMemberSchema>;
export { addTeamMemberSchema, type addTeamMemberType }
// export { loginSchema, type loginType };
