import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import AddNewRewardForm from '../forms/pointsAndRewards/AddNewRewardForm';
import HeadTitle from '../headTitle/HeadTitle'
import CustomIconButton from '../ui/buttons/CustomIconButton'
import CustomModal from '../ui/modals/CustomModal';

import { useDisclosure } from '@mantine/hooks';
import { Plus, Trash2 } from 'lucide-react'
import thunkGetAllCalmTime from '../../store/calmTime/thunk/thunkGetAllCalmTime';
import SkeletonList from '../skeleton/SkeletonList';
import NotFoundData from '../notFound/NotFoundData';
import moment from 'moment';
import thunkDeleteCalmTime from '../../store/calmTime/thunk/thunkDeleteCalmTime';
import toast from 'react-hot-toast';

const RewardsList = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useAppDispatch();
    const { calmTime, loading } = useAppSelector((state) => state.calmTime);

    const deleteCalmTime = async (id: string) => {
        const loadToast = toast.loading('جاري الإضافة');
        try {
            await dispatch(thunkDeleteCalmTime({ id })).unwrap();
            dispatch(thunkGetAllCalmTime());
            close()
            toast.success('تمت الإضافة بنجاح');
        } catch (error) {
            toast.success(`حدث خطأ : ${error}`);
        } finally {
            toast.dismiss(loadToast);
        }
    }

    useEffect(() => {
        dispatch(thunkGetAllCalmTime());
    }, [dispatch])
    return (
        <>
            <HeadTitle title="إدارة لحظات الهدوء"
                component={
                    <CustomIconButton
                        icon={<Plus />}
                        color="var(--main-color)"
                        onClick={open}
                        radius={5}
                        size="lg"
                    />
                }
            />
            {loading === 'pending' && (
                <div>
                    <SkeletonList />
                    <SkeletonList />
                </div>
            )}
            {calmTime.length > 0 && loading === 'succeeded' && (
                <ul className='rewards-list'>
                    {calmTime.map((item) => (
                        <li
                            key={item.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="w-ull flex justify-end p-2">
                                <CustomIconButton
                                    icon={<Trash2 />}
                                    color='var(--danger-color)'
                                    radius={4}
                                    size='lg'
                                    onClick={() => deleteCalmTime(item.id)}
                                />
                            </div>
                            {/* image */}
                            {item.mediaUrl && (
                                <div className="h-40 w-full flex justify-center overflow-hidden">
                                    <img
                                        src={item.mediaUrl}
                                        alt={item.title}
                                        className="w-12/12 object-contain h-full"
                                    />
                                </div>
                            )}

                            {/* content */}
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-lg">{item.title}</h4>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${item.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {item.isActive ? 'نشط' : 'غير نشط'}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">
                                    {item.description}
                                </p>

                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>الترتيب: {item.order}</span>
                                    <span>
                                        {moment(item.created).format('YYYY/MM/YY')}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {calmTime.length === 0 && loading === 'succeeded' && (
                <NotFoundData text='لا توجد لحظات هدوء' />
            )}
            <CustomModal opened={opened} onClose={close} title="إدارة لحظات الهدوء" >
                <AddNewRewardForm close={close} />
            </CustomModal>
        </>
    )
}

export default RewardsList