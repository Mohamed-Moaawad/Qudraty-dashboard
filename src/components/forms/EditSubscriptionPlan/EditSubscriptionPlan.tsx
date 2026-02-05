import { zodResolver } from "@hookform/resolvers/zod";
import { EditSubscriptionPlanSchema, type EditSubscriptionPlanType } from "../../../validations/EditSubscriptionPlanSchema";
import CustomInput from "../../ui/inputs/CustomInput";
import { useForm, type SubmitHandler } from "react-hook-form";
import CustomButton from "../../ui/buttons/CustomButton";
import FeatureList from "./FeatureList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import SkeletonForm from "../../skeleton/SkeletonForm";
import NotFoundData from "../../notFound/NotFoundData";
import thunkEditSubscriptionPlan from "../../../store/subscriptions/thunk/thunkEditSubscriptionPlan";
import toast from "react-hot-toast";
import thunkGetAllSubscriptionPlans from "../../../store/subscriptions/thunk/thunkGetAllSubscriptionPlans";

const EditSubscriptionPlan = ({ close }: { close: () => void }) => {
    const dispatch = useAppDispatch()
    const { singleSubscriptionPlan, loading } = useAppSelector((state) => state.subscriptions);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditSubscriptionPlanType>({
        mode: 'onChange',
        resolver: zodResolver(EditSubscriptionPlanSchema),
    });


    const [features, setFeatures] = useState<string[]>([]);

    const onSubmit: SubmitHandler<EditSubscriptionPlanType> = async (data) => {
        if (!singleSubscriptionPlan) return;
        const loadToast = toast.loading('جاري تعديل الخطة');
        const newPlan = {
            id: singleSubscriptionPlan.id,
            name: data.planName,
            price: data.planPrice,
            description: features.join(),
            durationInDays: singleSubscriptionPlan.durationInDays,
            isActive: singleSubscriptionPlan.isActive,
        }
        try {
            await dispatch(thunkEditSubscriptionPlan({ data: newPlan })).unwrap()
            dispatch(thunkGetAllSubscriptionPlans())
            close()
            toast.success('تم التعديل بنجاح');
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    };


    useEffect(() => {
        if (singleSubscriptionPlan) {
            const featuresArray = singleSubscriptionPlan.description
                .split(',')
                .map(f => f.trim());

            setFeatures(featuresArray);

            reset({
                planName: singleSubscriptionPlan.name,
                planPrice: singleSubscriptionPlan.price,
            });
            // setFeatures(singleSubscriptionPlan.features || []);
        }
    }, [singleSubscriptionPlan, reset])

    return (
        <form className="py-5"
            onSubmit={handleSubmit(onSubmit)}>
            {loading === 'pending' && (
                <SkeletonForm />
            )}
            {singleSubscriptionPlan && loading === 'succeeded' && (
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

                    <div className="flex flex-wrap mb-4">
                        <div className="w-6/12 flex">
                            <span>المدة بالأيام : </span>
                            <p>{singleSubscriptionPlan.durationInDays}</p>
                        </div>
                        <div className="w-6/12 flex">
                            <span>المدة بالأيام : </span>
                            <p>{singleSubscriptionPlan.durationInDays}</p>
                        </div>
                        <div className="w-6/12 flex">
                            <span>المدة بالأيام : </span>
                            <p>{singleSubscriptionPlan.durationInDays}</p>
                        </div>
                    </div>

                    <CustomButton
                        type="submit"
                        text="حفظ التعديلات"
                        radius="md"
                        variant="filled"
                    />
                </div>
            )}
            {!singleSubscriptionPlan && loading === 'succeeded' && (
                <NotFoundData text="لا توجد بيانات لعرضها" />
            )}
        </form>
    );
};

export default EditSubscriptionPlan;