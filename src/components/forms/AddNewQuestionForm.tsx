import { useForm, type SubmitHandler } from "react-hook-form";
import CustomButton from "../ui/buttons/CustomButton"
import CustomInput from "../ui/inputs/CustomInput"
import InputTime from "../ui/inputs/InputTime"
import { useAppDispatch } from "../../hooks/hooks";
import { AddNewQuestion, type AddNewQuestionType } from "../../validations/AddNewQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import thunkAddNewQuestion from "../../store/topics/thunk/thunkAddNewQuestion";
import thunkGetTopicDetails from "../../store/topics/thunk/thunkGetTopicDetails";
import { Radical, X } from "lucide-react";
import { useState } from "react";
import EquationsTable from "../equationsTable/EquationsTable";

type TAddNewQuestionForm = {
    topicId?: string;
    close: () => void;
}

const AddNewQuestionForm = ({ topicId, close }: TAddNewQuestionForm) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddNewQuestionType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewQuestion),
    });

    const onSubmit: SubmitHandler<AddNewQuestionType> = async (data) => {
        if (topicId) {
            const questionData = {
                text: data.questionText,
                imageUrl: isImage && `https://mathpad.ai/api/v1/latex2image?latex=${encodeURIComponent(isImage)}&format=png&scale=3`,
                topicId: Number(topicId),
                timestamp: data.showTime,
                options: [
                    { text: data.answers.answer1, isCorrect: data.correctAnswerIndex === 1 },
                    { text: data.answers.answer2, isCorrect: data.correctAnswerIndex === 2 },
                    { text: data.answers.answer3, isCorrect: data.correctAnswerIndex === 3 },
                    { text: data.answers.answer4, isCorrect: data.correctAnswerIndex === 4 },
                ]
            }

            const loadingToast = toast.loading('جاري اضافة السؤال...');
            await dispatch(thunkAddNewQuestion({ data: questionData })).unwrap()
                .then(() => {
                    toast.success('تم اضافة السؤال بنجاح!');
                    reset();
                    close();
                    dispatch(thunkGetTopicDetails(topicId));
                })
                .catch((err) => [
                    toast.error(`حدث خطأ: ${err}`)
                ]).finally(() => {
                    toast.dismiss(loadingToast);
                })
        }
    }

    const [isEquation, setIsEquation] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<string>('');

    const addEquation = () => {
        setIsEquation((state) => state = !state);
    }

    console.log(isImage)

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
                {isImage ? (
                    <div className="w-9/12 flex flex-wrap">
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
                        <div className="w-4/12 flex items-center justify-center px-2">
                            <img src={`https://mathpad.ai/api/v1/latex2image?latex=${encodeURIComponent(isImage)}&format=png&scale=3`} alt="question" />
                        </div>
                    </div>
                ) : (
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
                )}

                <div className="w-3/12 mb-6">
                    <InputTime
                        label="وقت الظهور"
                        error={!!errors.showTime}
                        errorText={errors.showTime?.message}
                        {...register('showTime')}
                    />
                </div>

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

export default AddNewQuestionForm