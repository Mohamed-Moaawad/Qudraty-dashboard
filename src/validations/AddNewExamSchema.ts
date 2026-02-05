import z from "zod";

const AddNewExamSchema = z.object({
    examName: z.string()
        .trim()
        .nonempty("اسم الامتحان مطلوب")
        .min(3, { message: "اسم الامتحان يجب أن يتكون من 3 أحرف على الأقل" }),
    subjectId: z.string()
        .nonempty("يجب اختيار المادة"),
    description: z.string()
        .trim()
        .nonempty("وصف الامتحان مطلوب")
        .min(3, { message: "وصف الامتحان يجب أن يتكون من 5 أحرف على الأقل" }),
});

type AddNewExamSchemaType = z.infer<typeof AddNewExamSchema>;
export { AddNewExamSchema, type AddNewExamSchemaType };