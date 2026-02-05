import z from "zod";

const AddNewAdvertisementSchema = z.object({
    title: z
        .string()
        .trim()
        .nonempty("العنوان مطلوب")
        .min(3, { message: "العنوان يجب ألا يقل عن 3 أحرف" })
        .max(100, { message: "العنوان طويل جدًا" }),

    description: z
        .string()
        .trim()
        .nonempty("الوصف مطلوب")
        .min(5, { message: "الوصف يجب ألا يقل عن 5 أحرف" })
        .max(500, { message: "الوصف طويل جدًا" }),

    imageFile: z
        .instanceof(File, { message: "الصورة مطلوبة" })
        .nullable(),

    meetingUrl: z
        .string()
        .trim()
        .nonempty("رابط الاجتماع مطلوب")
        .url("من فضلك أدخل رابط صحيح"),

    order: z.number({ message: "الترتيب مطلوب" }).min(1),
});

type AddNewAdvertisementType = z.infer<typeof AddNewAdvertisementSchema>;

export { AddNewAdvertisementSchema, type AddNewAdvertisementType };