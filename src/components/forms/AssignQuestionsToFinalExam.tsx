import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CustomButton from "../ui/buttons/CustomButton";
import CustomInput from "../ui/inputs/CustomInput";
import thunkGetRandomQuestions from "../../store/exams/thunk/FinalExam/thunkGetRandomQuestions";
import SkeletonList from "../skeleton/SkeletonList";
import thunkAssignQuestions from "../../store/exams/thunk/FinalExam/thunkAssignQuestions";
import toast from "react-hot-toast";
import thunkGetSingleFinalExam from "../../store/exams/thunk/FinalExam/thunkGetSingleFinalExam";
import { Pagination } from "@mantine/core";


type TPropsData =
    {
        subjectId: string;
        examId: string;
        existingQuestionIds: string[];
        close: () => void;

    }

const AssignQuestionsToFinalExam = ({ subjectId, examId, existingQuestionIds, close, }: TPropsData) => {

    const dispatch = useAppDispatch();
    const { randomQuestion, totalPages, pageNumber, loading } = useAppSelector((state) => state.exams);

    const [activePage, setActivePage] = useState(pageNumber || 1);

    const assignQuestions = async (ids: string[]) => {
        if (!examId) {
            toast.error('معرف الامتحان غير موجود!');
            return;
        }
        if (!ids || ids.length === 0) {
            toast.error('لا توجد أسئلة لإرسالها!');
            return;
        }

        const loadingToast = toast.loading('جاري اضافة السؤال...');
        await dispatch(thunkAssignQuestions({ questionIds: ids, examId })).unwrap()
            .then(() => {
                toast.success('تم اضافة السؤال بنجاح!');
                close();
            })
            .catch((err) => [
                toast.error(`حدث خطأ: ${err}`)
            ]).finally(() => {
                toast.dismiss(loadingToast); // بس يقفل Loading
            });
        dispatch(thunkGetSingleFinalExam({ examId }))
        dispatch(thunkGetRandomQuestions({ subjectId, pageNumber: activePage }))
    }


    useEffect(() => {
        dispatch(thunkGetRandomQuestions({ subjectId, pageNumber: activePage }))
    }, [dispatch, subjectId, activePage]);



    return (
        <div className="">
            {loading === 'pending' && (
                <>
                    <SkeletonList />
                    <SkeletonList />
                </>
            )}
            {randomQuestion.length > 0 && loading === 'succeeded' && (
                <div className="w-full">
                    {randomQuestion.map((question, idx) => {
                        const isAdded = existingQuestionIds.includes(question.questionId);
                        return (
                            <div key={question.questionId} className="flex flex-wrap question py-4 px-6">
                                <span className='w-full'>{question.questionId}#</span>
                                <span className='w-full'>{idx + 1}#</span>

                                <div className='w-full flex flex-wrap justify-between'>
                                    <div className='w-8/12 p-2'>
                                        <CustomInput
                                            type="text"
                                            label="نص السؤال"
                                            value={question.questionText}
                                            readOnly
                                        />
                                    </div>
                                    {question.imageUrl && (
                                        <div className='w-4/12 flex items-center'>
                                            <img src={question.imageUrl} loading='lazy' alt="question image" />
                                        </div>
                                    )}
                                    <div className="w-full sm:w-4/12 p-2">
                                        <CustomInput
                                            type="text"
                                            label="وقت ظهور السؤال"
                                            value={question.timestamp}
                                            readOnly
                                        />
                                    </div>

                                </div>

                                <div className="w-full flex flex-wrap mt-10">
                                    {question.options.map((option, idx) => (
                                        <div key={option.optionId} className="w-full sm:w-6/12 p-2">
                                            <CustomInput
                                                type="text"
                                                label={`الإجابة رقم ( ${idx + 1} )`}
                                                value={option.text}
                                                readOnly
                                            // rightSection={question.. && <BadgeCheck color='var(--success-color)' />}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full flex justify-end my-4">
                                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                                        <CustomButton
                                            type="button"
                                            text={isAdded ? 'مضاف' : 'إضافة'}
                                            radius="lg"
                                            variant="filled"
                                            color="var(--main-color)"
                                            disabled={isAdded}
                                            onClick={() => {
                                                // لو السؤال مش موجود مسبقًا
                                                if (!existingQuestionIds.includes(question.questionId)) {
                                                    const updatedIds = Array.from(
                                                        new Set([...(existingQuestionIds || []), question.questionId])
                                                    );
                                                    assignQuestions(updatedIds);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="w-full">
                        <Pagination
                            total={totalPages}
                            value={activePage}
                            onChange={setActivePage}
                        />
                    </div>
                </div>
            )}


        </div>
    );
};

export default AssignQuestionsToFinalExam;