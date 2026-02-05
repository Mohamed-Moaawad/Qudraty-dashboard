import { Link } from "react-router-dom";
import CustomButton from "../../components/ui/buttons/CustomButton";
import CustomInput from "../../components/ui/inputs/CustomInput"
import { ChevronLeft, Mail } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordSchema, type forgotPasswordType } from "../../validations/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";


// Mantine ui
// import { IconArrowRightCircle, IconMail } from '@tabler/icons-react';

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<forgotPasswordType>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit: SubmitHandler<forgotPasswordType> = (data) => {
        console.log(data);
    }

    return (
        <div className="forgot-password">
            <form className="shadow-sm rounded-sm w-full sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>نسيت كلمة السر؟</h2>
                <p className="head-text">لإعادة تعيين كلمة المرور الخاصة بك، يرجى إدخال عنوان بريدك الإلكتروني</p>
                <div className="flex flex-col gap-5">
                    <CustomInput
                        type='email'
                        placeholder="بريد إلكتروني"
                        leftSection={<Mail strokeWidth={2} />}
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        {...register('email')}
                    />
                    <CustomButton
                        type="submit"
                        text="ارسال"
                        size="md"
                        disabled={false}
                        loading={false}
                        variant='filled'
                        radius='sm'
                    />
                    <div className="back-btn flex justify-center">
                        <Link to="/auth/login" className="flex items-center">
                            العودة لتسجيل الدخول
                            <ChevronLeft size={30} strokeWidth={1.50} />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword