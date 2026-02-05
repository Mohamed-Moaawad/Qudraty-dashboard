import CustomButton from "../../ui/buttons/CustomButton";
import CustomInput from "../../ui/inputs/CustomInput";

import { useForm, type SubmitHandler } from "react-hook-form";
import { AddNewRewardSchema, type AddNewRewardType } from "../../../validations/AddNewRewardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../hooks/hooks";
import toast from "react-hot-toast";
import thunkAddNewCalmTime from "../../../store/calmTime/thunk/thunkAddNewCalmTime";
import CustomTextarea from "../../ui/inputs/CustomTextarea";
import InputFile from "../../ui/inputs/InputFile";
import thunkGetAllCalmTime from "../../../store/calmTime/thunk/thunkGetAllCalmTime";


const AddNewRewardForm = ({ close }: { close: () => void }) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<AddNewRewardType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewRewardSchema),
    })
    const onSubmit: SubmitHandler<AddNewRewardType> = async (data) => {
        const loadToast = toast.loading('جاري الإضافة');
        try {
            const newData = {
                title: data.title,
                description: data.description,
                media: data.media,
                order: data.order,
            }
            await dispatch(thunkAddNewCalmTime(newData)).unwrap();
            dispatch(thunkGetAllCalmTime());
            close()
            toast.success('تمت إضافة بنحاج');
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    };

    const handleFileChange = (file: File | null) => {
        setValue("media", file || undefined, { shouldValidate: true });
    };
    return (
        <form className="forms-component"
            onSubmit={handleSubmit(onSubmit)}
        >
            <CustomInput
                type="text"
                label="العنوان"
                placeholder="العنوان"
                error={!!errors.title}
                errorText={errors.title?.message}
                {...register('title')}
            />
            <CustomTextarea
                label="النص"
                placeholder="النص"
                error={!!errors.description}
                errorText={errors.description?.message}
                {...register('description')}
            />
            <div className="w-full flex">
                <div className="w-6/12 p-2">
                    <InputFile
                        label={"الصورة (اختياري)"}
                        placeholder="اختر صورة"
                        error={!!errors.media}
                        errorText={errors.media?.message}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="w-6/12 p-2">
                    <CustomInput
                        type="number"
                        label="الترتيب"
                        placeholder="الترتيب"
                        error={!!errors.order}
                        errorText={errors.order?.message}
                        {...register('order', { valueAsNumber: true })}
                    />
                </div>
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
    )
}

export default AddNewRewardForm