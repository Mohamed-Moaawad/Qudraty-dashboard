import CustomInput from '../ui/inputs/CustomInput';
import InputPassword from '../ui/inputs/InputPassword';
import CustomButton from '../ui/buttons/CustomButton';
import SelectInput from '../ui/selectInput/SelectInput';

import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTeamMemberSchema, type addTeamMemberType } from '../../validations/addTeamMemberSchema';

const AddMemberForm = () => {
    const methods = useForm<addTeamMemberType>({
        mode: 'onChange',
        resolver: zodResolver(addTeamMemberSchema),
    });
    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<addTeamMemberType> = (data) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form className='forms-component'
                onSubmit={handleSubmit(onSubmit)}
            >
                <CustomInput
                    type='text'
                    placeholder='الاسم الكامل'
                    error={!!errors.fullName}
                    errorText={errors.fullName?.message}
                    {...register('fullName')}
                />
                <div className="flex items-center justify-between gap-4">
                    <CustomInput
                        type='text'
                        placeholder='رقم الهاتف'
                        error={!!errors.phone}
                        errorText={errors.phone?.message}
                        {...register('phone')}
                    />
                    <SelectInput
                        name={'role'}
                        data={['مشرف', 'مراقب']}
                        placeholder='الدور'
                        radius='sm'
                    // error={errors.role?.message}
                    // {...register('role')}
                    />
                </div>
                <CustomInput
                    type='email'
                    placeholder='البريد الإلكتروني'
                    error={!!errors.email}
                    errorText={errors.email?.message}
                    {...register('email')}
                />
                <InputPassword
                    label='ddddddddddddddd'
                    placeholder='كلمه المرور '
                    error={!!errors.password}
                    errorText={errors.password?.message}
                    {...register('password')}
                />
                <div className="forms-actions-btn">
                    <CustomButton
                        type='reset'
                        text='حذف'
                        radius='xl'
                        variant='light'
                        color='var(--danger-color)'
                    />
                    <CustomButton
                        type='submit'
                        text='إضافة'
                        radius='xl'
                        variant='filled'
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default AddMemberForm