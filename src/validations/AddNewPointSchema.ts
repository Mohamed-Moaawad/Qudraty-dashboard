import z from "zod";

const AddNewPointSchema = z.object({
    taskName: z.string()
        .nonempty('أسم المهمة مطلوب'),
    points: z.number({message:'يجب أن يكون رقم'})
        .min(1, { message: 'يجب أن يكون هناك على الأقل نقطة واحدة' }),
    description: z.string()
        .nonempty('يجب أن يكون هناك وصف للمهمة')
});

type AddNewPointType = z.infer<typeof AddNewPointSchema>;
export { AddNewPointSchema, type AddNewPointType };