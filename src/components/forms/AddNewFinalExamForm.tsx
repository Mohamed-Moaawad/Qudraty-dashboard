import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import CustomButton from "../ui/buttons/CustomButton"
import CustomInput from "../ui/inputs/CustomInput"
import SelectInput from "../ui/selectInput/SelectInput"
import { AddNewExamSchema, type AddNewExamSchemaType } from "../../validations/AddNewExamSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomTextarea from "../ui/inputs/CustomTextarea"
import { useAppDispatch } from "../../hooks/hooks"
import thunkAddNewFinalExam from "../../store/exams/thunk/FinalExam/thunkAddNewFinalExam";
import toast from "react-hot-toast"
import thunkGetFinalExam from "../../store/exams/thunk/FinalExam/thunkGetFinalExam"


type TAddNewFinalExamForm = {
    subjects: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        type: string;
        isActive: boolean;
    }[];
    close: () => void;
}

const AddNewFinalExamForm = ({ subjects, close }: TAddNewFinalExamForm) => {

    const methods = useForm<AddNewExamSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(AddNewExamSchema),
        defaultValues: {
            examName: '',
            description: '',
            subjectId: '',  // لازم يكون موجود
        }
    });
    const { register, handleSubmit, reset, formState: { errors }, } = methods;

    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<AddNewExamSchemaType> = async (data) => {
        console.log(data);
        const sendData = {
            title: data.examName,
            description: data.description,
            subjectId: data.subjectId,
        }
        const loadingToast = toast.loading('جاري اضافة الدرس...');
        await dispatch(thunkAddNewFinalExam({ data: sendData })).unwrap()
            .then(() => {
                toast.success('تم اضافة الدرس بنجاح!');
                reset();
                close();
                dispatch(thunkGetFinalExam({}));
            })
            .catch((err) => [
                toast.error(`حدث خطأ: ${err}`)
            ]).finally(() => {
                toast.dismiss(loadingToast); // بس يقفل Loading
            });
    };

    return (
        <FormProvider {...methods}>
            <form className="forms-component"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CustomInput
                    type="text"
                    label="اسم الامتحان"
                    placeholder="اسم الامتحان"
                    error={!!errors.examName}
                    errorText={errors.examName?.message}
                    {...register('examName')}
                />
                <CustomTextarea
                    label='وصف الأمتحان'
                    placeholder='وصف الأمتحان'
                    error={!!errors.description}
                    errorText={errors.description?.message}
                    {...register('description')}
                />
                <SelectInput
                    name="subjectId"
                    label="المادة"
                    data={subjects.map(subject => ({
                        label: subject.name,
                        value: subject.id
                    }))}
                    placeholder="المادة"
                    radius="sm"
                />
                {/* Buttons */}
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
        </FormProvider>
    );
};

export default AddNewFinalExamForm;