import z from "zod";

const AddNewRewardSchema = z.object({
    title: z
        .string()
        .nonempty("عنوان المحتوى مطلوب"),

    description: z
        .string()
        .nonempty("الوصف مطلوب")
        .min(10, "الوصف يجب ألا يقل عن 10 أحرف"),

    media: z
        .instanceof(File, { message: "من فضلك اختر صورة" })
        .optional(),

    order: z
        .number({ message: "الترتيب مطلوب" })
        .min(1, "الترتيب يجب أن يكون 1 أو أكبر"),
});

type AddNewRewardType = z.infer<typeof AddNewRewardSchema>;

export { AddNewRewardSchema, type AddNewRewardType };