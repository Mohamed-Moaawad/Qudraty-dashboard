import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../ui/buttons/CustomButton";
import EquationsTable from "../equationsTable/EquationsTable";
import CustomInput from "../ui/inputs/CustomInput";
import { AddQuestionsToFinalExam, type AddQuestionsToFinalExamType } from "../../validations/AddQuestionsToFinalExam";
import { Radical, X } from "lucide-react";
import toast from "react-hot-toast";
import thunkAddNewQuestionStandalone from "../../store/exams/thunk/FinalExam/thunkAddNewQuestionStandalone";
import { useAppDispatch } from "../../hooks/hooks";
import thunkGetSingleFinalExam from "../../store/exams/thunk/FinalExam/thunkGetSingleFinalExam";

const AddNewQuestionToFinalExam = ({ examId, close }: { examId: string, close: () => void }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<AddQuestionsToFinalExamType>({
        mode: 'onChange',
        resolver: zodResolver(AddQuestionsToFinalExam),
    });

    const [isEquation, setIsEquation] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<string>('');

    const addEquation = () => {
        setIsEquation((state) => state = !state);
    }

    const onSubmit: SubmitHandler<AddQuestionsToFinalExamType> = async (data) => {
        const questionData = {
            examId,
            questionText: data.questionText,
            imageUrl: isImage || null,
            options: [
                { text: data.answers.answer1, isCorrect: data.correctAnswerIndex === 1 },
                { text: data.answers.answer2, isCorrect: data.correctAnswerIndex === 2 },
                { text: data.answers.answer3, isCorrect: data.correctAnswerIndex === 3 },
                { text: data.answers.answer4, isCorrect: data.correctAnswerIndex === 4 },
            ]
        }

        const loadToast = toast.loading('جاري إضافة السؤال');
        try {
            await dispatch(thunkAddNewQuestionStandalone({ data: questionData })).unwrap();
            toast.success('تمت إضافة السؤال بنحاج');
            dispatch(thunkGetSingleFinalExam({ examId }));
            close()
        } catch (error) {
            toast.error(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    };

    return (
        <form
            className="forms-component"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* add Equation */}
            <div className="w-full flex justify-end">
                <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                    <CustomButton
                        type="button"
                        text={isEquation ? "اخفاء" : "إضافة معادلة رياضية"}
                        radius="lg"
                        variant="light"
                        rightIcon={isEquation ? <X color="var(--danger-color)" /> : <Radical />}
                        onClick={addEquation}
                    />
                </div>
            </div>
            {isEquation && (
                <EquationsTable setIsImage={setIsImage} />
            )}


            {/* form */}
            <div className="flex flex-wrap justify-between items-center">
                <div className="w-8/12 mb-6">
                    <CustomInput
                        type="text"
                        label="نص السؤال"
                        placeholder="نص السؤال"
                        error={!!errors.questionText}
                        errorText={errors.questionText?.message}
                        {...register('questionText')}
                    />
                </div>

                {isImage && (
                    <div className="w-3/12 mb-6">
                        <img
                            src={isImage}
                            alt="equation"
                        />
                    </div>
                )}

                <div className="w-12/12 mb-6">
                    <CustomInput
                        type="number"
                        label="رقم الاجابة الصحيحة"
                        placeholder="رقم الاجابة الصحيحة"
                        error={!!errors.correctAnswerIndex}
                        errorText={errors.correctAnswerIndex?.message}
                        {...register('correctAnswerIndex', {
                            valueAsNumber: true
                        })}

                    />
                </div>
            </div>
            {/* answers */}
            <div className="flex flex-wrap">
                <div className="w-6/12 p-2">
                    <CustomInput
                        type="text"
                        label="الإجابة الأولى (1)"
                        placeholder="الإجابة الأولى"
                        error={!!errors.answers?.answer1}
                        errorText={errors.answers?.answer1?.message}
                        {...register('answers.answer1')}
                    />
                </div>

                <div className="w-6/12 p-2">
                    <CustomInput
                        type="text"
                        label="الإجابة الثانية (2)"
                        placeholder="الإجابة الثانية"
                        error={!!errors.answers?.answer2}
                        errorText={errors.answers?.answer2?.message}
                        {...register('answers.answer2')}
                    />
                </div>

                <div className="w-6/12 p-2">
                    <CustomInput
                        type="text"
                        label="الإجابة الثالثة (3)"
                        placeholder="الإجابة الثالثة"
                        error={!!errors.answers?.answer3}
                        errorText={errors.answers?.answer3?.message}
                        {...register('answers.answer3')}
                    />
                </div>

                <div className="w-6/12 p-2">
                    <CustomInput
                        type="text"
                        label="الإجابة الرابعة (4)"
                        placeholder="الإجابة الرابعة"
                        error={!!errors.answers?.answer4}
                        errorText={errors.answers?.answer4?.message}
                        {...register('answers.answer4')}
                    />
                </div>
            </div>

            <div className="w-full sm:w-3/12 md:w-2/12 mt-4">
                <CustomButton
                    type="submit"
                    text="إضافة"
                    radius="sm"
                    variant="filled"
                />
            </div>
        </form>
    )
}

export default AddNewQuestionToFinalExam