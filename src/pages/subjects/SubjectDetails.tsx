import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import Header from '../../components/header/Header';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomList from '../../components/lists/CustomList';
import CustomButton from '../../components/ui/buttons/CustomButton';
import Container from '../../components/ui/Container';
import CustomInput from '../../components/ui/inputs/CustomInput';
import CustomModal from '../../components/ui/modals/CustomModal';
import AddNewTopicForm from '../../components/forms/AddNewTopicForm';
import thunkGetSingleSubject from '../../store/subjects/thunk/thunkGetSingleSubject';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import SkeletonList from '../../components/skeleton/SkeletonList';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import thunkGetTopics from '../../store/topics/thunk/thunkGetTopics';
import thunkGetBook from '../../store/books/thunk/thunkGetBook';
import InputFile from '../../components/ui/inputs/InputFile';
import thunkUploadNewBook from '../../store/books/thunk/thunkUploadNewBook';
import CustomIconButton from '../../components/ui/buttons/CustomIconButton';
import thunkDeleteBook from '../../store/books/thunk/thunkDeleteBook';
import { FileUp, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SubjectDetails = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { subjectId } = useParams();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { singleSubject, loading } = useAppSelector((state) => state.subjects);
    const { topics, loading: TopicsLoading } = useAppSelector((state) => state.topics);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { book, loading: booksLoading } = useAppSelector((state) => state.books);

    console.log(book[0])

    useEffect(() => {
        if (subjectId) {
            dispatch(thunkGetSingleSubject(subjectId));
            dispatch(thunkGetTopics({ subjectId: subjectId }))
            dispatch(thunkGetBook({ subjectId, }))
        }
    }, [dispatch, subjectId]);


    const uploadBook = async (file: File) => {
        if (singleSubject && subjectId) {
            const loadToast = toast.loading('جاري رفع الكتاب');
            try {
                const title = singleSubject.name;
                const description = singleSubject.description;

                await dispatch(thunkUploadNewBook({ title, description, file, subjectId })).unwrap();
                dispatch(thunkGetBook({ subjectId, }))
                toast.success('تم رفع الكتاب');
            } catch (error) {
                toast.success(`حدث خطأ : ${error}`);
            } finally {
                toast.dismiss(loadToast);
            }
        }
    }
    const deleteBook = async (bookId: string) => {
        if (subjectId) {
            const loadToast = toast.loading('جاري حذف الكتاب');
            try {
                await dispatch(thunkDeleteBook({ bookId })).unwrap();
                dispatch(thunkGetBook({ subjectId, }))
                toast.success('تم حذف الكتاب');
            } catch (error) {
                toast.success(`حدث خطأ : ${error}`);
            } finally {
                toast.dismiss(loadToast);
            }
        }
    }


    return (
        <section className='subject-details'>
            {/* header */}
            <Header text='تفاصيل المادة' />
            {loading === 'pending' && (
                <Container>
                    <SkeletonForm />
                    <div className='mt-20'>
                        <SkeletonList />
                    </div>
                </Container>
            )}
            {singleSubject && loading === 'succeeded' && (
                <Container>
                    {/* List */}
                    <HeadTitle title='تفاصيل المادة :' />

                    <form className='page-details'>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='اسم المادة'
                                value={singleSubject.name}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">

                            {/* <SelectInput
                                name='curriculum'
                                data={['كمي', 'لفظي']}
                                label='المنهج'
                                placeholder={singleSubject.type}
                                radius='sm'
                            /> */}

                            <CustomInput
                                type='text'
                                label='المنهج'
                                value={singleSubject.type}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='الوصف'
                                value={singleSubject.description}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='text'
                                label='الحالة'
                                value={singleSubject.isActive ? 'نشط ✅' : ' غير نشط'}
                                readOnly
                            />
                        </div>
                        <div className="w-full px-2 mt-5">
                            {book[0] ? (
                                <div className='w-full flex'>
                                    <div className='w-11/12'>
                                        <CustomInput
                                            type='url'
                                            label='رابط الكتاب'
                                            value={book[0].fileUrl}
                                            readOnly
                                        />
                                    </div>
                                    <div className='w-1/12 flex justify-center items-end'>
                                        <CustomIconButton
                                            color='var(--danger-color)'
                                            icon={<Trash2 />}
                                            radius={3}
                                            size='xl'
                                            onClick={() => deleteBook(book[0].id)}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <InputFile
                                    label={'ارفع كتاب'}
                                    placeholder={'ارفع كتاب'}
                                    accept='.pdf'
                                    rightSection={<FileUp />}
                                    onChange={(file) => {
                                        if (file) {
                                            uploadBook(file)
                                        }
                                    }}
                                />
                            )}
                        </div>
                        <div className="w-full md:w-6/12 px-2 mt-5">
                            <CustomInput
                                type='number'
                                label='عدد الدروس'
                                value={topics ? topics.topics.length : 0}
                                readOnly
                            />
                        </div>
                    </form>

                    {/* List */}
                    <HeadTitle title='الدروس :'
                        component={
                            <CustomButton
                                type='button'
                                text='إضافة درس جديد'
                                radius='xl'
                                variant='light'
                                icon={<Plus />}
                                onClick={open}
                            />
                        }
                    />
                    {TopicsLoading === 'pending' && (
                        <SkeletonList />
                    )}
                    {topics ?
                        topics?.topics.length > 0 && TopicsLoading === 'succeeded' && (
                            <CustomList
                                data={topics.topics}
                                onEdit={(item) => navigate(`${item.id}?order=${item.order}`)}
                            />
                        ) : (
                            <CustomList
                                text='لا يوجد دروس'
                                data={[]}
                                onEdit={() => { }}
                            />
                        )}

                    {/* Buttons */}
                    <div className="forms-actions-btn flex-wrap">
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
                                text='الغاء'
                                radius='xl'
                                variant='light'
                                color='var(--danger-color)'
                            />
                        </div>
                    </div>
                </Container>
            )}

            <CustomModal onClose={close} opened={opened} title='إضافة درس جديد' size={'xl'}>
                <AddNewTopicForm subjectId={subjectId || ''} close={close} />
            </CustomModal>

        </section>
    );
};

export default SubjectDetails;