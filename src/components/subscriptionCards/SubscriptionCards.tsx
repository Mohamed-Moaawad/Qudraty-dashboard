import './SubscriptionCards.css';
import CustomButton from "../ui/buttons/CustomButton";

import { BadgeCheck, Pencil } from "lucide-react";
import { useDisclosure } from '@mantine/hooks';
import CustomModal from '../ui/modals/CustomModal';
import EditSubscriptionPlan from '../forms/EditSubscriptionPlan/EditSubscriptionPlan';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import thunkGetAllSubscriptionPlans from '../../store/subscriptions/thunk/thunkGetAllSubscriptionPlans';
import SkeletonPlanCards from '../skeleton/SkeletonPlanCards';
import thunkGetSingleSubscriptionPlan from '../../store/subscriptions/thunk/thunkGetSingleSubscriptionPlan';


const SubscriptionCards = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const dispatch = useAppDispatch();
    const { subscriptionPlans, loading } = useAppSelector((state) => state.subscriptions)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    const openEditModal = (planId: string) => {
        setSelectedPlanId(planId);
        open();
        dispatch(thunkGetSingleSubscriptionPlan({ id: planId }));
    };

    useEffect(() => {
        dispatch(thunkGetAllSubscriptionPlans());
    }, [dispatch])



    return (
        <div className="subscription-cards py-8">
            {loading === 'pending' && (
                <SkeletonPlanCards />
            )}
            {subscriptionPlans.length > 0 && loading === 'succeeded' && (
                <div className="flex flex-wrap">
                    {subscriptionPlans.map((plan) => (
                        <div key={plan.id} className="w-full md:w-6/12 lg:w-4/12 p-3">
                            <div className="subscription-card">
                                <span className='mark'>{plan.name}</span>
                                <h5 className='mark'>{plan.id}</h5>

                                <h4>{plan.price} ريال <sub>/{plan.name === 'Monthly' ? 'شهر ' : 'سنة '}</sub></h4>
                                <ul className='mt-4 mb-12'>
                                    {plan.description.split(',').map((text, idx) => (
                                        <li key={idx}>
                                            <BadgeCheck />
                                            {text}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap my-5 status">
                                    <div className="w-6/12 flex">
                                        <span>المدة بالأيام : </span>
                                        <p>{plan.durationInDays}</p>
                                    </div>
                                    <div className="w-6/12 flex">
                                        <span> الحالة : </span>
                                        <p>{plan.isActive ? ' نشط ✅ ' : ' غير نشط ❌ '}</p>
                                    </div>
                                </div>

                                <CustomButton
                                    type="button"
                                    text="تعديل الخطة"
                                    radius="sm"
                                    variant="filled"
                                    icon={<Pencil />}
                                    onClick={() => openEditModal(plan.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CustomModal opened={opened} onClose={close} title='تعديل الخطة'>
                <EditSubscriptionPlan close={close} />
            </CustomModal>
        </div>
    );
};

export default SubscriptionCards;