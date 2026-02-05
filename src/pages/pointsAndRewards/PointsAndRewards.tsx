import './PointsAndRewards.css';
import Header from "../../components/header/Header";
import HeadTitle from "../../components/headTitle/HeadTitle";
import StatsCards from "../../components/StatsCards/StatsCards";
import Container from "../../components/ui/Container";
import CustomTable from '../../components/ui/tables/CustomTable';
import CustomLink from '../../components/ui/CustomLink';
import PointsList from '../../components/pointsAndRewards/PointsList';
import RewardsList from '../../components/pointsAndRewards/RewardsList';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import thunkGetLoyaltyReports from '../../store/reports/thunk/thunkGetLoyaltyReports';
import SkeletonStatsCards from '../../components/skeleton/SkeletonStatsCards';


const PointsAndRewards = () => {
    const dispatch = useAppDispatch()
    const { loyaltyReports, loading } = useAppSelector((state) => state.reports);

    useEffect(() => {
        dispatch(thunkGetLoyaltyReports());
    }, [dispatch])

    // const points = [
    //     {
    //         id: 1,
    //         title: "إكمال الامتحان",
    //         description: "نقاط تمنح عند إكمال أي امتحان يظهر للطالب داخل التطبيق",
    //         points: 10,
    //     },
    //     {
    //         id: 2,
    //         title: "الحصول على درجة كاملة",
    //         description: "نقاط تمنح عند الحصول على 100% في الامتحان",
    //         points: 50,
    //     },
    //     {
    //         id: 3,
    //         title: "مشاهدة فيديو تعليمي",
    //         description: "نقاط تمنح عند مشاهدة فيديو تعليمي داخل التطبيق",
    //         points: 5,
    //     },
    //     {
    //         id: 4,
    //         title: "إكمال مادة دراسية",
    //         description: "نقاط تمنح عند إكمال الطالب لمادة دراسية معينة",
    //         points: 100,
    //     },
    //     {
    //         id: 5,
    //         title: "إكمال مادة دراسية",
    //         description: "نقاط تمنح عند إكمال الطالب لمادة دراسية معينة",
    //         points: 100,
    //     },
    //     {
    //         id: 6,
    //         title: "إكمال مادة دراسية",
    //         description: "نقاط تمنح عند إكمال الطالب لمادة دراسية معينة",
    //         points: 100,
    //     },
    //     {
    //         id: 7,
    //         title: "تسجيل الدخول اليومي",
    //         description: "نقاط تمنح عند تسجيل الدخول بشكل يومي داخل التطبيق",
    //         points: 10,
    //     },
    //     {
    //         id: 8,
    //         title: "تسجيل الدخول اليومي",
    //         description: "نقاط تمنح عند تسجيل الدخول بشكل يومي داخل التطبيق",
    //         points: 10,
    //     },
    // ];

    const coupons = [
        {
            id: 1,
            name: "خصم العودة للمدرسة",
            coupon: "SCHOOL20",
            points: 200,
            discount: "35%",
            startDate: "2025-05-18",
            endDate: "2025-05-18",
        },
        {
            id: 2,
            name: "خصم العودة للمدرسة",
            code: "SCHOOL20",
            points: 100,
            discount: "20%",
            startDate: "2025-05-18",
            endDate: "2025-05-18",
        },
    ];


    return (
        <section className="points-and-rewards">
            <Header text="النقاط والمكافآت" />

            <Container>
                <HeadTitle title="إدارة النقاط والمكافآت" />
                {/* stats */}
                {loading === 'pending' && (
                    <SkeletonStatsCards />
                )}
                {loyaltyReports && loading == 'succeeded' && (
                    <StatsCards
                        card1={{
                            title: 'إجمالي النقاط الممنوحة',
                            numbers: loyaltyReports.totalGivenPoints
                        }}
                        card2={{
                            title: 'متوسط النقاط لكل طالب',
                            numbers: loyaltyReports.averagePointsPerStudent
                        }}
                        card3={{
                            title: 'النقاط المستبدلة',
                            numbers: -loyaltyReports.totalRedeemedPoints
                        }}
                    />
                )}

                <div className="flex flex-wrap justify-between mb-14">
                    <div className="w-full md:w-6/12 px-4">
                        <PointsList />
                    </div>

                    <div className="w-full md:w-6/12 px-4">
                        <RewardsList />
                    </div>
                </div>

                <HeadTitle title='إنشاء كوبون خصم'
                    component={<div className='head-title-component'>
                        <CustomLink
                            to='/points-and-rewards/coupons'
                        />
                    </div>}
                />
                <div className="mt-5">
                    <CustomTable
                        data={coupons}
                        columns={[
                            { key: 'id', label: 'ID' },
                            { key: 'name', label: 'اسم الكوبون' },
                            { key: 'coupon', label: 'رمز الكوبون' },
                            { key: 'points', label: 'عدد النقاط' },
                            { key: 'discount', label: 'نسبة الخصم' },
                            { key: 'startDate', label: 'تاريخ البداية' },
                            { key: 'endDate', label: 'تاريخ الانتهاء' },
                        ]}
                    />
                </div>
            </Container>
        </section>
    );
};

export default PointsAndRewards;