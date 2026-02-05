import './Notification.css';
import Header from '../../components/header/Header';
import HeadTitle from '../../components/headTitle/HeadTitle';
import Container from '../../components/ui/Container';
import CustomInput from '../../components/ui/inputs/CustomInput';
import CustomButton from '../../components/ui/buttons/CustomButton';
import SentNotifications from './SentNotifications';
import SelectInput from '../../components/ui/selectInput/SelectInput';
import CustomTextarea from '../../components/ui/inputs/CustomTextarea';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { AddNewNotificationSchema, type AddNewNotificationSchemaType } from '../../validations/AddNewNotificationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../hooks/hooks';
import thunkAddNewNotification from '../../store/notification/thunk/thunkAddNewNotification';
import toast from 'react-hot-toast';
import thunkGetAllNotifications from '../../store/notification/thunk/thunkGetAllNotifications';

const Notification = () => {
    const dispatch = useAppDispatch()
    const methods = useForm<AddNewNotificationSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewNotificationSchema),
    });

    const { register, handleSubmit, reset, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<AddNewNotificationSchemaType> = async (data) => {
        const loadToast = toast.loading('جاري تعديل الخطة');

        const newData = {
            title: data.title,
            body: data.body,
            data: null,
            targetUserType: data.targetUserType === 'الطلاب' ? 3 : 2,
            targetSubscriptionPlanId: null
        }

        try {
            await dispatch(thunkAddNewNotification({ data: newData })).unwrap()
            dispatch(thunkGetAllNotifications({ pageNumber: 1 }));
            toast.success('تم إضافة الخطة بنجاح');
            reset();
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    };

    return (
        <section className='notification'>
            <Header text='الإشعارات' />
            <Container>
                <HeadTitle title='إدارة الإشعارات' />
                <div className='w-full flex flex-wrap'>
                    <div className='lg:w-7/12 xl:w-8/12'>
                        <FormProvider {...methods}>
                            <form className="flex flex-wrap w-full p-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="w-full md:w-6/12 p-2">
                                    <CustomInput
                                        type='text'
                                        label='عنوان الإشعار'
                                        placeholder='عنوان الإشعار'
                                        error={!!errors.title}
                                        errorText={errors.title?.message}
                                        {...register('title')}
                                    />
                                </div>

                                <div className='w-full md:w-6/12 p-2'>
                                    <SelectInput
                                        name='targetUserType'
                                        data={['الطلاب', 'اولياء الأمور']}
                                        label='اختر المستخدمين المستهدفين'
                                        placeholder='اختر المستخدمين المستهدفين'
                                        radius='md'
                                    />
                                </div>

                                <div className="w-full mt-3 p-2">
                                    {/* <CustomInput
                                    type='text'
                                    label='محتوى الإشعار'
                                    placeholder='محتوى الإشعار'
                                /> */}
                                    <CustomTextarea
                                        label='محتوى الإشعار'
                                        placeholder='محتوى الإشعار'
                                        error={!!errors.body}
                                        errorText={errors.body?.message}
                                        {...register('body')}
                                    />
                                </div>

                                <div className="w-full flex mt-10">
                                    <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                                        <CustomButton
                                            type='submit'
                                            text='إرسال الإشعار'
                                            radius='lg'
                                            variant='filled'
                                            color='var(--main-color)'
                                        />
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                    <div className="w-full lg:w-5/12 xl:w-4/12 p-4">
                        <SentNotifications />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Notification;