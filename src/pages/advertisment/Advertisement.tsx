import './Advertisement.css';
import { useEffect } from 'react';
import Header from '../../components/header/Header';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomButton from '../../components/ui/buttons/CustomButton';
import Container from '../../components/ui/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import thunkGetAllAdvertisement from '../../store/advertisement/thunk/thunkGetAllAdvertisement';
import SkeletonCards from '../../components/skeleton/SkeletonCards';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../components/notFound/NotFoundImage';
import { useDisclosure } from '@mantine/hooks';
import CustomModal from '../../components/ui/modals/CustomModal';
import AddNewAdvertisementForm from '../../components/forms/AddNewAdvertisementForm';

const Advertisement = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const dispatch = useAppDispatch();
    const { advertisement, loading } = useAppSelector((state) => state.advertisement);

    useEffect(() => {
        dispatch(thunkGetAllAdvertisement())
    }, [dispatch]);

    return (
        <section className='advertisement'>
            {/* header */}
            <Header text='الإعلانات' />

            <Container>
                <HeadTitle title='المستخدمين :'
                    component={
                        <CustomButton
                            type='button'
                            text='إضافة اعلان جديد '
                            radius='xl'
                            variant='light'
                            icon={<Plus />}
                            onClick={open}
                        />
                    }
                />
                {loading === 'pending' && (
                    <SkeletonCards />
                )}
                {advertisement.length > 0 && loading === 'succeeded' && (
                    <div className="flex flex-wrap">
                        {advertisement.map((item) => (
                            <div key={item.id} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-2">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

                                    {/* الصورة */}
                                    <div className='w-full p-4'>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>

                                    {/* محتوى الكارد */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <Link
                                            to={item.id}
                                            className="text-[var(--main-color)]"
                                        >
                                            تفاصيل الأعلان
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {advertisement.length === 0 && loading === 'succeeded' && (
                    <NotFoundImage text='لا توجد اعلانات' />
                )}

                <CustomModal opened={opened} onClose={close} size='md' title='إضافة اعلان جديد'>
                    <AddNewAdvertisementForm close={close} />
                </CustomModal>
            </Container>
        </section>
    );
};

export default Advertisement;