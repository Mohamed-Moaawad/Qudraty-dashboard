import z from "zod";

const EditSubscriptionPlanSchema = z.object({
    planName: z.string().min(1, "اسم الخطة مطلوب"),
    planPrice: z.number({ message: "السعر يجيب ان يكون رقم" })
        .min(1, { message: "السعر مطلوب" }),
    // features: z
    //     .array(z.string())
    //     .min(1, "أضف ميزة واحدة على الأقل"),
});

type EditSubscriptionPlanType = z.infer<typeof EditSubscriptionPlanSchema>;

export { EditSubscriptionPlanSchema, type EditSubscriptionPlanType };