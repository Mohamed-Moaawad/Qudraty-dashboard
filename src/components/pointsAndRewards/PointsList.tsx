import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AddNewPointForm from "../forms/pointsAndRewards/AddNewPointForm";
import HeadTitle from "../headTitle/HeadTitle";
import CustomIconButton from "../ui/buttons/CustomIconButton";
import CustomModal from "../ui/modals/CustomModal";

import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import thunkGetLoyaltyPoint from "../../store/loyalityPoint/thunkGetLoyaltyPoint";
import SkeletonList from "../skeleton/SkeletonList";


// type TPointsListType = {
//     points: {
//         id: number;
//         title: string;
//         description: string;
//         points: number;
//     }[]
// }

const PointsList = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const dispatch = useAppDispatch();
    const { loyaltyPoint, loading } = useAppSelector((state) => state.loyaltyPoint);
    console.log(loyaltyPoint);

    useEffect(() => {
        dispatch(thunkGetLoyaltyPoint())
    }, [dispatch]);

    return (
        <>
            <HeadTitle title="إدارة قواعد منح النقاط"
                component={<CustomIconButton
                    icon={<Plus />}
                    color="var(--main-color)"
                    onClick={open}
                    radius={5}
                    size="lg"
                />}
            />
            {loading === 'pending' && (
                <div>
                    <SkeletonList />
                    <SkeletonList />
                </div>
            )}
            {loyaltyPoint.length > 0 && loading === 'succeeded' && (
                <ul className='points-list'>
                    {loyaltyPoint.map((point) => (

                        <li key={point.id}>
                            <div className="text">
                                <h4>{point.eventTypeName}</h4>
                                <p>{point.eventType}</p>
                            </div>
                            <span>{point.points}</span>
                        </li>
                    ))}
                </ul>
            )}
            <CustomModal opened={opened} onClose={close} title="إدارة قواعد منح النقاط" >
                <AddNewPointForm />
            </CustomModal>
        </>
    )
}

export default PointsList