import './Reviews.css';
import { useEffect } from 'react';
import Header from "../../components/header/Header";
import HeadTitle from "../../components/headTitle/HeadTitle";
import Container from "../../components/ui/Container";
import CustomButton from '../../components/ui/buttons/CustomButton';
import thunkGetAllReviews from '../../store/reviews/thunk/thunkGetAllReviews';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import SkeletonCards from '../../components/skeleton/SkeletonCards';
import { Rating } from '@mantine/core';
import moment from 'moment';
import thunkEditReview from '../../store/reviews/thunk/thunkEditReview';
import { CircleCheckBig, CircleX } from 'lucide-react';


const Reviews = () => {
    const dispatch = useAppDispatch();
    const { rating, loading } = useAppSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(thunkGetAllReviews());
    }, [dispatch]);


    const deleteReview = async (id: string, isActive: boolean) => {
        await dispatch(thunkEditReview({ id, isActive })).unwrap();
        dispatch(thunkGetAllReviews());
    }
    const acceptReview = async (id: string, isActive: boolean) => {
        await dispatch(thunkEditReview({ id, isActive })).unwrap();
        dispatch(thunkGetAllReviews());
    }


    return (
        <section className='reviews'>
            <Header text="طلبات التقييم" />
            <Container>
                <HeadTitle title="إدارة طلبات التقييم" />

                {loading === 'pending' && (
                    <SkeletonCards />
                )}
                {rating.length > 0 && loading === 'succeeded' && (
                    <div className="flex flex-wrap">
                        {rating.map((rate) => (
                            <div key={rate.id} className="w-full sm:w-6/12 md:w-4/12 p-4 ">
                                <div className="review-card shadow-md">
                                    <div className='flex justify-between'>
                                        <h3>{rate.studentName}</h3>

                                        {rate.isActive ? (
                                            <CircleCheckBig color='var(--success-color)' />
                                        ) : (
                                            <CircleX color='var(--danger-color)' />
                                        )}
                                    </div>
                                    <h5>{moment(rate.created).format('YYYY-MM-DD')}</h5>
                                    <div className="stars">
                                        <span>({rate.stars})</span>
                                        <Rating value={rate.stars} readOnly />
                                    </div>
                                    <p>{rate.comment}</p>
                                    <div className="flex gap-4">
                                        <CustomButton
                                            type='button'
                                            text='قبول'
                                            radius='lg'
                                            variant='filled'
                                            color='var(--main-color)'
                                            onClick={() => acceptReview(rate.id, true)}
                                        />
                                        <CustomButton
                                            type='button'
                                            text='رفض'
                                            radius='lg'
                                            variant='light'
                                            color='var(--danger-color)'
                                            onClick={() => deleteReview(rate.id, false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </Container>
        </section>
    );
};

export default Reviews;