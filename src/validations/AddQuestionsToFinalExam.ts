import z from "zod";

const AddQuestionsToFinalExam = z.object({
    // =================================
    questionText: z
        .string()
        .min(1, "هذا الحقل مطلوب")
        .max(300, "الحد الأقصى للنص 300 حرف"),

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

type AddQuestionsToFinalExamType = z.infer<typeof AddQuestionsToFinalExam>;

export { AddQuestionsToFinalExam, type AddQuestionsToFinalExamType };