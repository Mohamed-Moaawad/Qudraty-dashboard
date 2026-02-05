import CustomButton from "../../ui/buttons/CustomButton";
import CustomInput from "../../ui/inputs/CustomInput";

import { useForm, type SubmitHandler } from "react-hook-form";
import { AddNewPointSchema, type AddNewPointType } from "../../../validations/AddNewPointSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const AddNewPointForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddNewPointType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewPointSchema),
    });

    const onSubmit: SubmitHandler<AddNewPointType> = (data) => console.log(data);

    return (
        <form className="forms-component" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex items-center justify-between">
                <div className="w-8/12">
                    <CustomInput
                        type="text"
                        label="اسم المهمة"
                        placeholder="اسم المهمة"
                        error={!!errors.taskName}
                        errorText={errors.taskName?.message}
                        {...register('taskName')}
                    />
                </div>
                <div className="w-3/12">
                    <CustomInput
                        type="number"
                        label="النقاط"
                        placeholder="5"
                        error={!!errors.points}
                        errorText={errors.points?.message}
                        {...register('points', { valueAsNumber: true })}
                    />
                </div>
            </div>

            <div className="w-full">
                <CustomInput
                    type="text"
                    label="الوصف"
                    placeholder="الوصف"
                    error={!!errors.description}
                    errorText={errors.description?.message}
                    {...register('description')}
                />
            </div>

            <div className="forms-actions-btn">
                <CustomButton
                    type="reset"
                    text="حذف"
                    radius="xl"
                    variant="light"
                    color="var(--danger-color)"
                />
                <CustomButton
                    type="submit"
                    text="إضافة"
                    radius="xl"
                    variant="filled"
                />
            </div>
        </form>
    );
};

export default AddNewPointForm;