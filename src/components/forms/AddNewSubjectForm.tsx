import { zodResolver } from "@hookform/resolvers/zod";
import { addNewSubjectSchema, type addNewSubjectSchemaType } from "../../validations/AddNewSubjectSchema";
import CustomButton from "../ui/buttons/CustomButton";
import CustomInput from "../ui/inputs/CustomInput"
import SelectInput from "../ui/selectInput/SelectInput";


import { Controller, FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import thunkAddNewSubject from "../../store/subjects/thunk/thunkAddNewSubject";
import InputFile from "../ui/inputs/InputFile";
import thunkGetSubjectType from "../../store/subjectType/thunkGetSubjectType";
import { useEffect } from "react";

const AddNewSubjectForm = ({ close }: { close: () => void }) => {
    const dispatch = useAppDispatch();
    const { allSubjectType } = useAppSelector((state) => state.subjectType)
    const { loading } = useAppSelector((state) => state.subjects)

    const methods = useForm<addNewSubjectSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(addNewSubjectSchema),
    })

    const { register, handleSubmit, control, reset, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<addNewSubjectSchemaType> = async (data) => {
        console.log(data);
        const subjectType = allSubjectType.filter((item) => item.name === data.curriculum)
        const newData = {
            subjectName: data.subjectName,
            image: data.image,
            subjectDescription: data.subjectDescription,
            curriculum: subjectType[0].id,
        }
        await dispatch(thunkAddNewSubject(newData));
        reset();
        close();
    }

    useEffect(() => {
        dispatch(thunkGetSubjectType());
    }, [dispatch])

    const subjectsName = allSubjectType.map((item) => item.name);

    return (
        <FormProvider {...methods}>
            <form className="forms-component"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CustomInput
                    type="text"
                    label="اسم المادة"
                    placeholder="اسم المادة"
                    error={!!errors.subjectName}
                    errorText={errors.subjectName?.message}
                    {...register('subjectName')}
                />
                <CustomInput
                    type="text"
                    label="وصف المادة"
                    placeholder="وصف المادة"
                    error={!!errors.subjectDescription}
                    errorText={errors.subjectDescription?.message}
                    {...register('subjectDescription')}
                />
                <SelectInput
                    name={"curriculum"}
                    data={subjectsName}
                    placeholder="المنهج"
                    radius="md"
                />

                <Controller
                    name='image'
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputFile
                            placeholder="ارفع الصورة هنا"
                            label="الصورة"
                            error={!!fieldState.error}
                            errorText={fieldState.error?.message}
                            value={field.value}
                            onChange={(file) => field.onChange(file)}
                        />
                    )}
                />

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
                        loading={loading === 'pending' ? true : false}
                    // disabled
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default AddNewSubjectForm