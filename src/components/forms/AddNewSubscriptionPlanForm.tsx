import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import FeatureList from "./EditSubscriptionPlan/FeatureList";
import { EditSubscriptionPlanSchema, type EditSubscriptionPlanType } from "../../validations/EditSubscriptionPlanSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CustomInput from "../ui/inputs/CustomInput";
import CustomButton from "../ui/buttons/CustomButton";
import toast from "react-hot-toast";
import thunkAddSubscriptionPlan from "../../store/subscriptions/thunk/thunkAddSubscriptionPlan";
import thunkGetAllSubscriptionPlans from "../../store/subscriptions/thunk/thunkGetAllSubscriptionPlans";

const AddNewSubscriptionPlanForm = ({ close }: { close: () => void }) => {
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<EditSubscriptionPlanType>({
        mode: 'onChange',
        resolver: zodResolver(EditSubscriptionPlanSchema),
    });

    const [features, setFeatures] = useState<string[]>([]);

    const onSubmit: SubmitHandler<EditSubscriptionPlanType> = async (data) => {
        const loadToast = toast.loading('جاري تعديل الخطة');
        const newPlan = {
            name: data.planName,
            price: data.planPrice,
            description: features.join(),
            durationInDays: 30,
        }
        try {
            await dispatch(thunkAddSubscriptionPlan({ data: newPlan })).unwrap();
            dispatch(thunkGetAllSubscriptionPlans());
            close()
            toast.success('تم إضافة الخطة بنجاح');
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
        console.log(newPlan)
        // try {
        //     // await dispatch(thunkEditSubscriptionPlan({ data: newPlan })).unwrap()
        //     // dispatch(thunkGetAllSubscriptionPlans())
        //     toast.success('تم التعديل بنجاح');
        // } catch (error) {
        //     toast.success(`حدث خطأ : ${error}`);
        // } finally {
        //     toast.dismiss(loadToast);
        // }

    };


    return (
        <form className="py-5"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <div className="flex flex-wrap justify-between gap-2 mb-5">
                    <div className="w-7/12">
                        <CustomInput
                            type='text'
                            label='نظام الخطه :'
                            error={!!errors.planName}
                            errorText={errors.planName?.message}
                            {...register('planName')}
                        />
                    </div>
                    <div className="w-4/12">
                        <CustomInput
                            type='number'
                            label='السعر :'
                            error={!!errors.planPrice}
                            errorText={errors.planPrice?.message}
                            {...register('planPrice', { valueAsNumber: true })}
                        />
                    </div>
                </div>

                <FeatureList features={features} setFeatures={setFeatures} />


                <CustomButton
                    type="submit"
                    text="حفظ التعديلات"
                    radius="md"
                    variant="filled"
                />
            </div>
        </form>
    );
};

export default AddNewSubscriptionPlanForm;