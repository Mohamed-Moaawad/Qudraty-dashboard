import z from "zod";

const addNewSubjectSchema = z.object({
    subjectName: z.string()
        .trim()
        .nonempty('مطلوب: اكتب اسم المادة')
        .min(2, { message: 'الاسم لازم يكون 2 حروف على الأقل' })
        .max(50, { message: 'الاسم طويل جدًا الحد الأقصى 50 حرف' }),

    image: z
        .instanceof(File, { message: "يجب رفع صورة" })
        .refine(
            (file) => ["image/jpeg", "image/png"].includes(file.type),
            "الصورة يجب أن تكون PNG أو JPG"
        ),

    subjectDescription: z.string()
        .trim()
        .nonempty("مطلوب: اكتب وصف للمادة")
        .min(5, { message: 'الوصف لازم يكون 5 حروف على الأقل' })
        .max(150, { message: 'الوصف طويل جدًا الحد الأقصى 150 حرف' }),

    curriculum: z.string().min(1, { message: "يجب اختيار المنهج" })
});

type addNewSubjectSchemaType = z.infer<typeof addNewSubjectSchema>;

export { addNewSubjectSchema, type addNewSubjectSchemaType };