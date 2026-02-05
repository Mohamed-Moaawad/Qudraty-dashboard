import { Controller, FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import CustomButton from "../ui/buttons/CustomButton";
import CustomInput from "../ui/inputs/CustomInput";
import CustomTextarea from "../ui/inputs/CustomTextarea";
import { AddNewAdvertisementSchema, type AddNewAdvertisementType } from "../../validations/AddNewAdvertisementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFile from "../ui/inputs/InputFile";
import toast from "react-hot-toast";
import thunkAddNewAdvertisement from "../../store/advertisement/thunk/thunkAddNewAdvertisement";
import thunkGetAllAdvertisement from "../../store/advertisement/thunk/thunkGetAllAdvertisement";
import { useAppDispatch } from "../../hooks/hooks";

const AddNewAdvertisementForm = ({ close }: { close: () => void }) => {

    const dispatch = useAppDispatch();

    const methods = useForm<AddNewAdvertisementType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewAdvertisementSchema),
    });

    const { register, handleSubmit, control, reset, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<AddNewAdvertisementType> = async (data) => {
        if (!data.imageFile) {
            toast.error("من فضلك ارفع صورة");
            return;
        }

        const loadToast = toast.loading('جاري الإضافة');
        try {

            const title = data.title;
            const description = data.description;
            const imageUrl = data.imageFile;
            const authorUrl = data.meetingUrl;
            const order = data.order;
            await dispatch(thunkAddNewAdvertisement({ title, description, imageUrl, authorUrl, order })).unwrap()
            close();
            reset();
            toast.success('تمت إضافة بنحاج');
            dispatch(thunkGetAllAdvertisement());
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <div className="w-full flex">
                    <div className="w-9/12 p-2">
                        <CustomInput
                            type="text"
                            label="العنوان"
                            placeholder="العنوان"
                            error={!!errors.title}
                            errorText={errors.title?.message}
                            {...register('title')}
                        />
                    </div>
                    <div className="w-3/12 p-2">
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
                <div className="w-full p-2">
                    <CustomTextarea
                        label="الوصف"
                        placeholder="الوصف"
                        error={!!errors.description}
                        errorText={errors.description?.message}
                        {...register('description')}
                    />
                </div>
                <div className="w-full p-2">
                    <Controller
                        name="imageFile"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputFile
                                label="رابط الصورة"
                                placeholder="رابط الصورة"
                                error={!!fieldState.error}
                                errorText={fieldState.error?.message}
                                value={field.value}
                                onChange={(file) => field.onChange(file)}
                            />
                        )}
                    />
                </div>
                <div className="w-full p-2">
                    <CustomInput
                        type="url"
                        label="رابط الاجتماع"
                        placeholder="رابط الاجتماع"
                        error={!!errors.meetingUrl}
                        errorText={errors.meetingUrl?.message}
                        {...register('meetingUrl')}
                    />
                </div>



                <div className="forms-actions-btn flex-wrap justify-end">
                    <div className="w-full sm:w-4/12">
                        <CustomButton
                            type="reset"
                            text="حذف"
                            radius="xl"
                            variant="light"
                            color="var(--danger-color)"
                        />
                    </div>
                    <div className="w-full sm:w-4/12">
                        <CustomButton
                            type="submit"
                            text="حفظ"
                            radius="xl"
                            variant="filled"
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddNewAdvertisementForm;