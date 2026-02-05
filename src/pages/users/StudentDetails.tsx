import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Header from '../../components/header/Header';
import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomInput from '../../components/ui/inputs/CustomInput';
import CustomButton from '../../components/ui/buttons/CustomButton';
import { Avatar } from '@mantine/core';
import getStudentById from '../../store/users/thunk/getStudentById';
import moment from 'moment';
import NotFoundImage from '../../components/notFound/NotFoundImage';
import SkeletonForm from '../../components/skeleton/SkeletonForm';


const StudentDetails = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { singleStudent, loading } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (id) {
            dispatch(getStudentById({ studentID: id }));
        }
    }, [id, dispatch]);

    return (
        <section className='user-details'>
            <Header text='إدارة المستخدمين' />
            <Container>
                <HeadTitle title='تفاصيل الطالب ' />
                {loading === 'pending' && (
                    <div>
                        <SkeletonForm />
                    </div>
                )}
                {!singleStudent && loading !== 'pending' && (
                    <NotFoundImage text='لم يتم العثور على هذا المستخدم' />
                )}
                {singleStudent && (
                    <div className="my-5">
                        <div className="w-full flex justify-center">
                            <Avatar src={'https://images.icon-icons.com/1859/PNG/512/student3_117884.png'} alt="user image" size={'xl'} />
                        </div>
                        <div className="flex flex-wrap my-5">
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='الاسم الأول'
                                    value={singleStudent.name}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='رقم الهاتف'
                                    value={singleStudent.phoneNumber}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='email'
                                    label='البريد الالكترونى'
                                    value='email'
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='ولى الامر'
                                    value={singleStudent.parentName}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='نوع الاشتراك'
                                    value={singleStudent.subscribtionType}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='حاله الاشتراك '
                                    value={singleStudent.subscriptionStatus}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='تاريخ بدايه الاشتراك'
                                    value={moment(singleStudent.subscriptionStartDate).format('YYYY/MM/DD')}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='تاريخ نهايه الاشتراك '
                                    value={moment(singleStudent.subscriptionEndDate).format('YYYY/MM/DD')}
                                    readOnly
                                />
                            </div>

                            <div className="forms-actions-btn w-full justify-end">
                                <div className="w-full md:w-4/12 lg:w-2/12">
                                    <CustomButton
                                        type='reset'
                                        text='حذف الحساب'
                                        radius='xl'
                                        variant='light'
                                        color='var(--danger-color)'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default StudentDetails;