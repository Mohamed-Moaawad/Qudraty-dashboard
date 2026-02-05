import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
// components
import CustomInput from "../../components/ui/inputs/CustomInput";
import InputPassword from "../../components/ui/inputs/InputPassword";
import CustomButton from '../../components/ui/buttons/CustomButton';
// Mantine ui
// lucide Icons
import { LockKeyhole, Mail } from 'lucide-react';

// React-hook-form & zod & zodResolver
import { useForm, type SubmitHandler } from "react-hook-form"
import { loginSchema, type loginType } from '../../validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
//
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// react-hot-toast
import toast from 'react-hot-toast';
import thunkAuthLogin from '../../store/auth/thunk/thunkAuthLogin';




const Login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();



    const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    // Login
    const onSubmit: SubmitHandler<loginType> = (data) => {
        console.log(data);
        dispatch(thunkAuthLogin(data)).unwrap()
            .then(async (userData) => {
                toast.success('Login successfully');
                console.log('Token', userData.accessToken);
                console.log('user', userData);
                navigate('/profile');
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage, {
                    style: {
                        backgroundColor: '#000',
                        color: '#fff',
                    }
                });
            });
    };

    return (
        <section className="login-page">
            <form className='shadow-sm rounded-sm w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>تسجيل الدخول</h2>
                <div className="flex flex-col gap-5">
                    <CustomInput
                        type="email"
                        label="بريد إلكتروني"
                        placeholder="بريد إلكتروني"
                        leftSection={<Mail strokeWidth={2} />}
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        {...register("email")}
                    />
                    <InputPassword
                        label="كلمة المرور"
                        placeholder="كلمة المرور"
                        icon={<LockKeyhole strokeWidth={2} />}
                        error={!!errors.password}
                        errorText={errors.password?.message}
                        {...register("password")}
                    />
                    <Link to='/auth/forgot-password'>هل نسيت كلمة السر؟</Link>

                    <CustomButton
                        type='submit'
                        text='تسجيل الدخول '
                        disabled={loading === 'pending' ? true : false}
                        loading={loading === 'pending' ? true : false}
                        size='md'
                        variant='filled'
                        radius='sm'
                    />
                </div>
            </form>
        </section>
    );
};

export default Login;