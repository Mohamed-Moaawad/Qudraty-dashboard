import './Subjects.css';
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Container from "../../components/ui/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import thunkGetTopicDetails from "../../store/topics/thunk/thunkGetTopicDetails";
import SkeletonForm from "../../components/skeleton/SkeletonForm";
import HeadTitle from "../../components/headTitle/HeadTitle";
import CustomInput from "../../components/ui/inputs/CustomInput";
import CustomButton from "../../components/ui/buttons/CustomButton";
import toast from 'react-hot-toast';
import thunkEditTopic from '../../store/topics/thunk/thunkEditTopic';
import AddNewQuestionForm from '../../components/forms/AddNewQuestionForm';
import CustomModal from '../../components/ui/modals/CustomModal';
import { useDisclosure } from '@mantine/hooks';
import CustomIconButton from '../../components/ui/buttons/CustomIconButton';
import { BadgeCheck, Trash2 } from 'lucide-react';

const TopicDetails = () => {
    const { topicId } = useParams();
    const [searchParams] = useSearchParams();

    const [opened, { open, close }] = useDisclosure(false);

    const { topicDetails, loading } = useAppSelector((state) => state.topics);
    const dispatch = useAppDispatch();




    useEffect(() => {
        if (topicId) {
            dispatch(thunkGetTopicDetails(topicId));
        }
    }, [topicId, dispatch]);

    // console.log(topicDetails);
    // console.log(loading);

    const deleteTopic = async () => {
        if (topicDetails && topicId) {
            const editData = {
                Id: topicDetails.id,
                Title: topicDetails.title,
                SubjectId: topicDetails.subjectId,
                Video: topicDetails.videoUrl,
                order: Number(searchParams.get('order')),
                IsActive: false,
            }
            const loadingToast = toast.loading('جاري حذف الدرس...');
            await dispatch(thunkEditTopic({ data: editData })).unwrap()
                .then(() => {
                    toast.success('تم حذف السؤال بنجاح!');
                })
                .catch((err) => {
                    toast.error(`حدث خطأ: ${err}`)
                }).finally(() => {
                    toast.dismiss(loadingToast);
                });
            dispatch(thunkGetTopicDetails(topicId));
        }
    }

    if (!topicId) return null;

    return (
        <section className="topic-details">
            {/* header */}
            <Header text='تفاصيل المادة' />
            <Container>
                {loading === 'pending' && (
                    <Container>
                        <SkeletonForm />
                    </Container>
                )}

                {topicDetails && loading === 'succeeded' && (
                    <Container>
                        {/* HeadTitle */}
                        <HeadTitle title='تفاصيل الدرس :' />

                        <div className='page-details'>
                            <div className="w-full md:w-6/12 px-2 mt-5">
                                <CustomInput
                                    type='text'
                                    label='اسم المادة'
                                    value={topicDetails.title}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 px-2 mt-5">
                                <video controls>
                                    <source src={topicDetails.videoStreamUrl} type="video/mp4" />
                                </video>
                            </div>
                            <div className="w-full md:w-6/12 px-2 mt-5">
                                <CustomInput
                                    type='text'
                                    label='أسم المادة'
                                    value={topicDetails.subjectName}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 px-2 mt-5">
                                <CustomInput
                                    type='text'
                                    label='الحالة'
                                    value={topicDetails.isActive ? 'نشط ✅' : 'غير نشط ❌'}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* add question button */}
                        <div className='w-full md:w-4/12'>
                            <CustomButton
                                type='button'
                                radius='md'
                                text='إضافة سؤال جديد'
                                variant='filled'
                                onClick={open}
                            />
                        </div>



                        <HeadTitle title='الأسئلة' />
                        {topicDetails.questions.length === 0 && loading === 'succeeded' && (
                            <p className='text-center my-4 text-neutral-600'>لا يوجد أسئلة</p>
                        )}
                        <div className="flex flex-wrap">
                            {topicDetails.questions.map((question, idx) => (
                                <div key={question.id} className="flex flex-wrap w-full md:w-6/12 lg:w-4/12 py-4 px-2 mb-5">
                                    <div className="question p-4">
                                        <div className='w-full flex justify-between'>
                                            <span>{idx + 1}#</span>
                                            <CustomIconButton
                                                size='lg'
                                                color='var(--danger-color)'
                                                icon={<Trash2 />}
                                                radius={4}
                                            />
                                        </div>
                                        {question.imageUrl ? (
                                            <div className='w-full flex justify-between'>
                                                <div className="w-full sm:w-8/12 p-2">
                                                    <CustomInput
                                                        type="text"
                                                        label="نص السؤال"
                                                        value={question.text}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className='w-4/12 flex items-center'>
                                                    <img src={question.imageUrl} loading='lazy' alt="question image" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full sm:w-6/12 p-2">
                                                <CustomInput
                                                    type="text"
                                                    label="نص السؤال"
                                                    value={question.text}
                                                    readOnly
                                                />
                                            </div>
                                        )}
                                        <div className="w-full sm:w-6/12 p-2">
                                            <CustomInput
                                                type="text"
                                                label="وقت ظهور السؤال"
                                                value={question.timestamp}
                                                readOnly
                                            />
                                        </div>
                                        <div className="w-full flex flex-wrap mt-10">
                                            {question.options.map((option, idx) => (
                                                <div key={option.id} className="w-full sm:w-6/12 p-2">
                                                    <CustomInput
                                                        type="text"
                                                        label={`الإجابة رقم (${idx + 1}) :::${option.isCorrect}`}
                                                        value={option.text}
                                                        readOnly
                                                        rightSection={option.isCorrect && <BadgeCheck color='var(--success-color)' />}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Buttons */}
                        <div className="forms-actions-btn flex-wrap justify-end">
                            <div className="w-full sm:w-3/12 md:w-2/12">
                                <CustomButton
                                    type='button'
                                    text='حفظ المتغيرات'
                                    radius='xl'
                                    variant='filled'
                                />
                            </div>
                            <div className="w-full sm:w-3/12 md:w-2/12">
                                <CustomButton
                                    type='button'
                                    text={topicDetails.isActive ? 'إلغاء التنشيط' : 'غير نشط'}
                                    radius='xl'
                                    variant='light'
                                    color='var(--danger-color)'
                                    onClick={deleteTopic}
                                />
                            </div>
                        </div>
                    </Container>
                )}
            </Container>

            <CustomModal opened={opened} onClose={close} title='إضافة سؤال جديد' size='60%'>
                <AddNewQuestionForm topicId={topicId} close={close} />
            </CustomModal>
        </section>
    );
};

export default TopicDetails;