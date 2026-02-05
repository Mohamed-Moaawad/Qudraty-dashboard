import './Profile.css';
import Header from '../../components/header/Header';
import HeadTitle from '../../components/headTitle/HeadTitle';
import Container from '../../components/ui/Container';
import CustomInput from '../../components/ui/inputs/CustomInput';
import InputPassword from '../../components/ui/inputs/InputPassword';
import { Avatar } from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';


const Profile = () => {
    const { user } = useAppSelector((state) => state.auth);


    return (
        <section className='profile'>
            <Header text='الملف الشخصي' />
            <Container>
                <HeadTitle title='تعديل الملف الشخصي' />
                <div className="flex justify-center mb-5">
                    <Avatar src={
                        user?.roles.includes('Admin') ?
                            'https://images.icon-icons.com/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png'
                            :
                            'https://images.icon-icons.com/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png'
                    } alt="user image"
                        size={'xl'}
                    />
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='الاسم'
                            value={user?.fullName || 'no name'}
                            readOnly
                        />
                    </div>
                    <div className="w-full sm:w-6/12 p-4">
                        <CustomInput
                            type='email'
                            label='البريد الالكترونى'
                            value={user?.email || 'no email'}
                            readOnly
                        />
                    </div>
                    <div className="w-full sm:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='الدور'
                            value={user?.roles[0] || 'no roles'}
                            readOnly
                        />
                    </div>
                    <div className="w-full sm:w-6/12 p-4">
                        <InputPassword
                            label='كلمة المرور'
                            placeholder='كلمة المرور'
                            error={false}
                            errorText=''
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Profile;