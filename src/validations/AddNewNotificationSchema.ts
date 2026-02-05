import z from "zod";

const AddNewNotificationSchema = z.object({
    title: z.string()
        .trim()
        .nonempty("عنوان الإشعار مطلوب")
        .min(3, { message: "عنوان الإشعار يجب أن يتكون من 3 أحرف على الأقل" })
        .max(100, { message: "العنوان طويل جدًا" }),

    targetUserType: z.enum(['الطلاب', 'اولياء الأمور'], { message: "اختر نوع المستخدم المستهدف" }),

    body: z.string()
        .trim()
        .nonempty("محتوى الإشعار مطلوب")
        .min(3, { message: "محتوى الإشعار يجب أن يتكون من 3 أحرف على الأقل" })
        .max(500, { message: "محتوى الإشعار طويل جدًا" }),
});

type AddNewNotificationSchemaType = z.infer<typeof AddNewNotificationSchema>;

export { AddNewNotificationSchema, type AddNewNotificationSchemaType };