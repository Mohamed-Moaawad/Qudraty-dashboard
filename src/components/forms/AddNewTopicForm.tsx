import CustomInput from "../ui/inputs/CustomInput"

// import { useState } from "react"
import CustomButton from "../ui/buttons/CustomButton"

import { useForm, type SubmitHandler } from "react-hook-form"
import { AddNewTopicSchema, type AddNewTopicSchemaType } from "../../validations/AddNewTopicSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import HeadTitle from "../headTitle/HeadTitle"
import InputFile from "../ui/inputs/InputFile"
import { useAppDispatch } from "../../hooks/hooks"
import thunkAddNewTopic from "../../store/topics/thunk/thunkAddNewTopic"
import toast from "react-hot-toast"
import InputTime from "../ui/inputs/InputTime"
import { useState } from "react"
import { Radical, X } from "lucide-react"
import EquationsTable from "../equationsTable/EquationsTable"


type TPropsData = {
    data?: [];
    subjectId: string;
    close: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddNewTopicForm = ({ data, subjectId, close }: TPropsData) => {
    // const dateParser: DateInputProps['dateParser'] = (input) => {
    //     if (input === 'WW2') {
    //         return '1939-09-01';
    //     }

    //     return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
    // };
    // ===============================
    // const [value, setValue] = useState<string | null>(null);


    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<AddNewTopicSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewTopicSchema),
    });

    const onSubmit: SubmitHandler<AddNewTopicSchemaType> = async (data) => {
        const questionsArray = [
            {
                text: data.questionText,
                timestamp: data.showTime,
                options: [
                    { text: data.answers.answer1, isCorrect: data.correctAnswerIndex === 1 },
                    { text: data.answers.answer2, isCorrect: data.correctAnswerIndex === 2 },
                    { text: data.answers.answer3, isCorrect: data.correctAnswerIndex === 3 },
                    { text: data.answers.answer4, isCorrect: data.correctAnswerIndex === 4 },
                ]
            }
        ];

        const dataToSend = {
            lessonName: data.lessonName,
            lessonNumber: data.lessonNumber,
            video: data.video,
            QuestionsJson: questionsArray,
        };

        const loadingToast = toast.loading('جاري اضافة الدرس...');

        await dispatch(thunkAddNewTopic({ data: dataToSend, subjectId })).unwrap()
            .then(() => {
                toast.success('تم اضافة الدرس بنجاح!');
                reset();
                close()
            })
            .catch((err) => [
                toast.error(`حدث خطأ: ${err}`)
            ]).finally(() => {
                toast.dismiss(loadingToast); // بس يقفل Loading
            });
    }


    const [isEquation, setIsEquation] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<string>('');

    const addEquation = () => {
        setIsEquation((state) => state = !state);
    }

    return (
        <div className="add-new-topic-form">
            <form className="forms-component"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between">
                    <div className="w-8/12 pl-2">
                        <CustomInput
                            type="text"
                            label="اسم الدرس"
                            placeholder="اسم الدرس"
                            error={!!errors.lessonName}
                            errorText={errors.lessonName?.message}
                            {...register('lessonName')}
                        />
                    </div>
                    <div className="w-4/12 pr-2">
                        <CustomInput
                            type="number"
                            label=" رقم الدرس"
                            placeholder=" رقم الدرس"
                            error={!!errors.lessonNumber}
                            errorText={errors.lessonNumber?.message}
                            {...register('lessonNumber', {
                                valueAsNumber: true,
                            })}
                        />
                    </div>
                </div>

                <InputFile
                    label="ارفع الفيديو"
                    placeholder="اختار الفيديو"
                    onChange={(file) => {
                        if (file) {
                            setValue("video", file, { shouldValidate: true });
                        }
                    }}
                    accept='video/*'
                    error={!!errors.video}
                    errorText={errors.video?.message}
                />



                {/* QuestionAndAnswers */}
                <HeadTitle
                    title="الاسئلة :"
                />
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




                <div className="forms-actions-btn flex-wrap justify-end">
                    <div className="w-full sm:w-3/12 md:w-2/12">
                        <CustomButton
                            type="submit"
                            text="حفظ"
                            radius="xl"
                            variant="filled"
                        />
                    </div>
                    <div className="w-full sm:w-3/12 md:w-2/12">
                        <CustomButton
                            type="reset"
                            text="حذف"
                            radius="xl"
                            variant="light"
                            color="var(--danger-color)"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewTopicForm;