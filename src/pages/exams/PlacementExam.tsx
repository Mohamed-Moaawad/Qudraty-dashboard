// import QuestionAndAnswersForm from '../../components/forms/QuestionAndAnswersForm';
import { useEffect, useState } from 'react';
import CustomInput from '../../components/ui/inputs/CustomInput'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import thunkGetPlacementExam from '../../store/exams/thunk/PlacementExam/thunkGetPlacementExam';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import NotFoundImage from '../../components/notFound/NotFoundImage';
import CustomButton from '../../components/ui/buttons/CustomButton';
import { BadgeCheck } from 'lucide-react';
import { Pagination } from '@mantine/core';
import CustomModal from '../../components/ui/modals/CustomModal';
import { useDisclosure } from '@mantine/hooks';
import AddNewQuestionToPlacementExam from '../../components/forms/AddNewQuestionToPlacementExam';

const PlacementExam = () => {
    const dispatch = useAppDispatch();
    const { placementExam, loading, pageNumber, totalPages } = useAppSelector((state) => state.exams);
    const [activePage, setActivePage] = useState(pageNumber || 1);


    const [opened, { open, close }] = useDisclosure(false);


    useEffect(() => {
        dispatch(thunkGetPlacementExam({ pageNumber: activePage }));
    }, [dispatch, activePage])


    return (
        <section className="placement-exam">
            {loading === 'pending' && (
                <SkeletonForm />
            )}
            {placementExam.length > 0 && loading === 'succeeded' && (
                <div className='flex flex-wrap'>
                    {/* <form className='page-details'>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='اسم الامتحان'
                                value='تحديد المستوى'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='تاريخ الانشاء'
                                value='28/8/2025'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='الوصف'
                                value='ساعدنا نحدد مستواك علشان نبدأ معاك من المكان الصح'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='مدة الامتحان'
                                value='120 د'
                                readOnly
                            />
                        </div>
                    </form> */}
                    <div className='w-full flex justify-end'>
                        <div className='w-full sm:w-6/12 md:w-4/12 lg:w-3/12 flex justify-end'>
                            <CustomButton
                                type='button'
                                radius='md'
                                text='إضافة سؤال جديد'
                                variant='filled'
                                onClick={open}
                            />
                        </div>
                    </div>
                    {placementExam.map((question, idx) => (
                        <div key={question.id} className="w-full sm:w-6/12 lg:w-4/12 mt-5 px-2">
                            <div className="flex flex-wrap question pt-4 px-6">
                                <span className='w-full'>{idx + 1}#</span>
                                <span className='w-full'>{question.id}</span>
                                {/* <span className='w-full'>{question.videoQuestionId}#</span> */}

                                <div className={`${question.imageUrl ? 'w-8/12' : 'w-full'} p-2`}>
                                    <CustomInput
                                        type="text"
                                        label="نص السؤال"
                                        value={question.text}
                                        readOnly
                                    />
                                </div>
                                {question.imageUrl && (
                                    <div className="w-4/12 p-2 flex items-center">
                                        <img src={question.imageUrl} alt="question" />
                                    </div>
                                )}


                                <div className="w-full flex flex-wrap mt-10">
                                    {question.options.map((option, idx) => (
                                        <div key={option.id} className="w-full sm:w-6/12 p-2">
                                            <CustomInput
                                                type="text"
                                                label={`الإجابة رقم ( ${idx + 1} )`}
                                                value={option.text}
                                                readOnly
                                                rightSection={option.isCorrect && <BadgeCheck color='var(--success-color)' />}
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
                                        // onClick={() => deleteQuestion(question.questionId)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='w-full mt-5 p-2'>
                        <Pagination
                            total={totalPages}
                            value={activePage}
                            onChange={setActivePage}
                        />
                    </div>
                </div>
            )}

            {placementExam.length === 0 && loading === 'succeeded' && (
                <NotFoundImage text='لا يوجد أسئلة لعرضها' />
            )}

            <CustomModal opened={opened} onClose={close} title='إضافة سؤال جديد' size='60%'>
                <AddNewQuestionToPlacementExam close={close} />
            </CustomModal>

        </section>
    );
};

export default PlacementExam;