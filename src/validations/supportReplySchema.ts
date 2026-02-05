import { z } from "zod";

const supportReplySchema = z.object({
    supportReply: z
        .string()
        .nonempty("هذا الحقل مطلوب")
        .min(5, { message: "الرد لا يجب أن يقل عن 5 أحرف" })
        .max(500, { message: "الرد لا يجب أن يزيد عن 500 حرف" }),
});

type supportReplySchemaType = z.infer<typeof supportReplySchema>;

export { supportReplySchema, type supportReplySchemaType }