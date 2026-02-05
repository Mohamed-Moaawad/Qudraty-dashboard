import CustomButton from "../ui/buttons/CustomButton";
import CustomInput from "../ui/inputs/CustomInput";

import { useForm, type SubmitHandler } from "react-hook-form";
import { AddNewCouponSchema, type AddNewCouponType } from "../../validations/AddNewCouponSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddNewCouponForm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<AddNewCouponType>({
        mode: "onChange",
        resolver: zodResolver(AddNewCouponSchema),
    });

    const onSubmit: SubmitHandler<AddNewCouponType> = (data) => console.log(data);


    return (
        <form className="forms-component"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full">
                <CustomInput
                    type="text"
                    label="اسم الكوبون"
                    placeholder="اسم الكوبون"
                    error={!!errors.couponName}
                    errorText={errors.couponName?.message}
                    {...register('couponName')}
                />
            </div>

            <div className="flex items-center justify-between gap-4">
                <CustomInput
                    type="text"
                    label="عدد النقاط المطلوبة"
                    placeholder="عدد النقاط المطلوبة"
                    error={!!errors.countPoints}
                    errorText={errors.countPoints?.message}
                    {...register('countPoints')}
                />

                <CustomInput
                    type="text"
                    label="قيمة الخصم"
                    placeholder="قيمة الخصم"
                    error={!!errors.discountValue}
                    errorText={errors.discountValue?.message}
                    {...register('discountValue')}
                />
            </div>

            <div className="flex items-center justify-between gap-4">
                <CustomInput
                    type="text"
                    label="تاريخ البداية"
                    placeholder="DD/MM/YYYY"
                    error={!!errors.startDate}
                    errorText={errors.startDate?.message}
                    {...register('startDate')}
                />

                <CustomInput
                    type="text"
                    label="تاريخ الانتهاء"
                    placeholder="DD/MM/YYYY"
                    error={!!errors.endDate}
                    errorText={errors.endDate?.message}
                    {...register('endDate')}
                />
            </div>

            <div className="forms-actions-btn">
                <CustomButton
                    type="reset"
                    text="حذف"
                    radius="lg"
                    variant="light"
                    color="var(--danger-color)"
                />
                <CustomButton
                    type="submit"
                    text="إضافة"
                    radius="lg"
                    variant="filled"
                    color="var(--main-color)"
                />
            </div>
        </form>
    );
};

export default AddNewCouponForm;