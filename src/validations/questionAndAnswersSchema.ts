import { z } from "zod";

const questionAndAnswersSchema = z.object({
    
});

type questionAndAnswersType = z.infer<typeof questionAndAnswersSchema>;
export { questionAndAnswersSchema, type questionAndAnswersType };