import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Container from "../../components/ui/Container";
import CustomInput from "../../components/ui/inputs/CustomInput";
import CustomButton from "../../components/ui/buttons/CustomButton";
import HeadTitle from "../../components/headTitle/HeadTitle";
import { BadgeCheck, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import thunkGetSingleFinalExam from "../../store/exams/thunk/FinalExam/thunkGetSingleFinalExam";
import SkeletonList from "../../components/skeleton/SkeletonList";
import CustomModal from "../../components/ui/modals/CustomModal";
import { useDisclosure } from "@mantine/hooks";
import AssignQuestionsToFinalExam from "../../components/forms/AssignQuestionsToFinalExam";
import thunkDeleteQuestion from "../../store/exams/thunk/FinalExam/thunkDeleteQuestion";
import toast from "react-hot-toast";
import NotFoundData from "../../components/notFound/NotFoundData";
import AddNewQuestionToFinalExam from "../../components/forms/AddNewQuestionToFinalExam";

const FinalExamDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();

    // مودل 1
    const [opened1, { open: open1, close: close1 }] = useDisclosure(false);

    // مودل 2
    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

    const dispatch = useAppDispatch();
    const { singleExam, loading } = useAppSelector((state) => state.exams);

    const existingQuestionIds = singleExam?.questions.reduce<string[]>((acc, q) => {
        if (q.isStandalone === false) {
            acc.push(q.videoQuestionId);
        }
        return acc;
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetSingleFinalExam({ examId: id }));
        }
    }, [dispatch, id])

    const deleteQuestion = async (questionId: string) => {
        if (id) {
            const loadingToast = toast.loading('جاري مسح السؤال...');
            await dispatch(thunkDeleteQuestion({ examId: id, questionId })).unwrap()
                .then(() => {
                    toast.success('تم مسح السؤال بنجاح!');
                })
                .catch((err) => [
                    toast.error(`حدث خطأ: ${err}`)
                ]).finally(() => {
                    toast.dismiss(loadingToast); // بس يقفل Loading
                });
            dispatch(thunkGetSingleFinalExam({ examId: id }));
        }
    }

    if (id) {
        return (
            <section>
                {/* header */}
                <Header text="تفاصيل الامتحان" />

                <Container>
                    {/* head Title */}
                    <HeadTitle title="تفاصيل الامتحان :" />

                    <div className='page-details'>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='اسم الامتحان'
                                value={`أمتحان مادة : ${state.data.subjectName}`}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='المادة'
                                value={state.data.subjectName}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='المنهج'
                                value={state.data.subjectTypeName}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='number'
                                label='عدد الاسئلة'
                                value={singleExam ? singleExam.totalQuestions : 'عدد الأسئلة غير معروف'}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='تاريخ الانشاء'
                                value={state.data.created}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label="حاله الامتحان"
                                value={state.data.isActive ? 'نشط ✅' : ' غير نشط'}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* head Title */}
                    <HeadTitle title=" أسئلة الأمتحان :"
                        component={
                            <div className="head-title-component">
                                <div>
                                    <CustomButton
                                        type="button"
                                        text="إضافة سؤال من الفيديوهات"
                                        radius="xl"
                                        variant="light"
                                        icon={<Plus />}
                                        onClick={open1}
                                    />
                                </div>
                                <CustomButton
                                    type="button"
                                    text="إضافة سؤال جديد"
                                    radius="xl"
                                    variant="light"
                                    icon={<Plus />}
                                    onClick={open2}
                                />
                            </div>
                        }
                    />

                    {loading === 'pending' && (
                        <div>
                            <SkeletonList />
                            <SkeletonList />
                            <SkeletonList />
                        </div>
                    )}
                    {singleExam && singleExam.questions.length > 0 && loading === 'succeeded' && (
                        <div className="flex flex-wrap">
                            {singleExam.questions.map((exam, idx) => (
                                <div key={exam.questionId} className="w-full md:w-6/12 lg:w-4/12 px-2">
                                    <div className="flex flex-wrap question pt-4 px-6">
                                        <span className='w-full'>{exam.videoQuestionId}#</span>
                                        <span className='w-full'>{exam.isStandalone ? 'Standalone' : 'Not Standalone'}</span>
                                        <span className='w-full'>{idx + 1}#</span>
                                        {/* <span className='w-full'>{exam.videoQuestionId}#</span> */}
                                        <div className="w-full sm:w-8/12 p-2">
                                            <CustomInput
                                                type="text"
                                                label="نص السؤال"
                                                value={exam.questionText}
                                                readOnly
                                            />
                                        </div>

                                        {exam.imageUrl && (
                                            <div className="w-4/12 mb-6 flex justify-center items-end">
                                                <img
                                                    className="w-[80%]"
                                                    src={exam.imageUrl}
                                                    alt="equation"
                                                />
                                            </div>
                                        )}


                                        <div className="w-full flex flex-wrap mt-10">
                                            {exam.options.map((option, idx) => (
                                                <div key={option.optionId} className="w-full sm:w-6/12 p-2">
                                                    <CustomInput
                                                        type="text"
                                                        label={`الإجابة رقم ( ${idx + 1} )`}
                                                        value={option.text}
                                                        readOnly
                                                        rightSection={exam.correctOptionId === option.optionId && <BadgeCheck color='var(--success-color)' />}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full flex justify-end my-4">
                                            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                                                <CustomButton
                                                    type="button"
                                                    text="حذف السؤال"
                                                    radius="lg"
                                                    variant="light"
                                                    color="var(--danger-color)"
                                                    onClick={() => deleteQuestion(exam.questionId)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {singleExam && singleExam.questions.length === 0 && (
                        <NotFoundData text="لا توجد أسئلة" />
                    )}
                </Container>

                <CustomModal opened={opened1} onClose={close1} title="إضافة سؤال جديد" size="70%">
                    <AssignQuestionsToFinalExam
                        subjectId={state.data.subjectId}
                        examId={id}
                        existingQuestionIds={existingQuestionIds ? existingQuestionIds : []}
                        close={close1}
                    />
                </CustomModal>
                <CustomModal opened={opened2} onClose={close2} title="إضافة سؤال جديد" size="70%">
                    {/* <AddNewQuestionForm close={close2} /> */}
                    <AddNewQuestionToFinalExam examId={id} close={close2} />
                </CustomModal>
            </section>
        );
    }
};

export default FinalExamDetails;