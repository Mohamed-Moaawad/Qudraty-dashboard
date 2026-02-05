import z from "zod";

const AddNewCouponSchema = z.object({
    couponName: z
        .string()
        .trim()
        .nonempty("اسم الكوبون مطلوب")
        .min(3, "اسم الكوبون يجب أن يتكون من 3 أحرف على الأقل"),
    countPoints: z
        .string()
        .trim()
        .nonempty("عدد النقاط مطلوب")
        .refine((val) => !isNaN(Number(val)), "عدد النقاط يجب أن يكون رقمًا")
        .refine((val) => Number(val) > 0, "عدد النقاط يجب أن يكون أكبر من صفر"),

    discountValue: z
        .string()
        .trim()
        .nonempty("قيمة الخصم مطلوبة")
        .refine((val) => !isNaN(Number(val)), "قيمة الخصم يجب أن تكون رقمًا")
        .refine(
            (val) => Number(val) >= 1 && Number(val) <= 100,
            "قيمة الخصم يجب أن تكون بين 1 و 100"
        ),

    startDate: z
        .string()
        .trim()
        .nonempty("تاريخ البداية مطلوب")
        .regex(
            /^\d{2}\/\d{2}\/\d{4}$/,
            "صيغة التاريخ يجب أن تكون DD/MM/YYYY"
        ),

    endDate: z
        .string()
        .trim()
        .nonempty("تاريخ الانتهاء مطلوب")
        .regex(
            /^\d{2}\/\d{2}\/\d{4}$/,
            "صيغة التاريخ يجب أن تكون DD/MM/YYYY"
        ),
});

type AddNewCouponType = z.infer<typeof AddNewCouponSchema>;

export { AddNewCouponSchema, type AddNewCouponType }