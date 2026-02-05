import z from "zod";

const AddNewQuestion = z.object({
    // =================================
    questionText: z
        .string()
        .min(1, "هذا الحقل مطلوب")
        .max(300, "الحد الأقصى للنص 300 حرف"),

    showTime: z
        .string()
        .regex(
            /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
            "يجب إدخال وقت بالصيغــة 00:00:00"
        )
        .refine(
            (val) => {
                const [h, m, s] = val.split(":").map(Number);
                return h + m + s > 0;
            },
            { message: "وقت الظهور يجب أن يكون أكبر من صفر" }
        ),


    correctAnswerIndex: z
        .number({
            message: "رقم الإجابة الصحيحة مطلوب",
        })
        .int("يجب أن يكون رقمًا صحيحًا")
        .min(1, "يجب أن يكون بين 1 و 4")
        .max(4, "يجب أن يكون بين 1 و 4"),

    answers: z.object({
        answer1: z.string().min(1, "الإجابة الأولى مطلوبة"),
        answer2: z.string().min(1, "الإجابة الثانية مطلوبة"),
        answer3: z.string().min(1, "الإجابة الثالثة مطلوبة"),
        answer4: z.string().min(1, "الإجابة الرابعة مطلوبة"),
    }),
});

type AddNewQuestionType = z.infer<typeof AddNewQuestion>;

export { AddNewQuestion, type AddNewQuestionType };