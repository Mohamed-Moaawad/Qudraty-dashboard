import './Home.css';
import { useEffect } from 'react';
import { MoveUp } from 'lucide-react';

import Header from '../../components/header/Header';
import Circles from '../../components/circles/Circles';
import HomeChart from '../../components/charts/HomeChart';

import CustomTable from '../../components/ui/tables/CustomTable';
import Container from '../../components/ui/Container';
import StatsCards from '../../components/StatsCards/StatsCards';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomLink from '../../components/ui/CustomLink';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import thunkGetUsers from '../../store/users/thunk/thunkGetUsers';
import SkeletonStatsCards from '../../components/skeleton/SkeletonStatsCards';
import thunkGetEducationReports from '../../store/reports/thunk/thunkGetEducationReports';

const Home = () => {
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users);
    const { educationReports, loading: EducationReportsLoading } = useAppSelector((state) => state.reports);

    useEffect(() => {
        dispatch(thunkGetUsers({ PageNumber: 1, }));
        dispatch(thunkGetEducationReports());
    }, [dispatch])

    return (
        <section className='home-page'>
            {/* header */}
            <Header text='الصفحة الرئيسية' />

            <Container>
                {/* stats */}
                {EducationReportsLoading === 'pending' && (
                    <SkeletonStatsCards />
                )}
                {educationReports && EducationReportsLoading == 'succeeded' && (
                    <StatsCards
                        card1={{
                            title: 'عدد المستخدمين',
                            numbers: educationReports.totalStudents
                        }}
                        card2={{
                            title: 'المواد الدراسية',
                            numbers: educationReports.totalSubjects
                        }}
                        card3={{
                            title: 'عدد المشتركين',
                            numbers: educationReports.totalSubscriptions
                        }}
                        card4={{
                            title: 'متوسط التقييمات',
                            numbers: educationReports.averageRatingStars
                        }}
                    />
                )}


                {/* stats data */}
                <div className="stats-data pt-5">
                    <div className="flex flex-wrap">
                        <div className="chart-container w-full lg:w-7/12 mt-5">
                            <div className="chart-box">
                                <div className="text">
                                    <h4 className='text-title'>الاشتراكات</h4>
                                    <div className="total-mony">
                                        <h5> 7.864 ر.س</h5>
                                        <div className="percentage">
                                            <MoveUp size={16} />
                                            <span>2.1%</span>
                                            <p>مقارنة بالأسبوع الماضي</p>
                                        </div>
                                        <p>الاشتراكات من 1 إلى 12 مايو 2025</p>
                                    </div>
                                </div>
                                {/* Chart */}
                                <div className="px-2 mt-5">
                                    <HomeChart />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-5/12 mt-5">
                            <div className="circles-box">
                                <div className='text'>
                                    <h4 className='text-title'>توزيع الاشتراكات</h4>
                                    <p>مقارنة خطط الاشتراك بين المستخدمين</p>
                                </div>
                                {/* Circles */}
                                <Circles
                                    sm='10'
                                    smText='مميزة'
                                    md='20'
                                    mdText='احترافية'
                                    lg='70'
                                    lgText='مجانية'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Head Title */}
                <HeadTitle title='المستخدمين :'
                    component={
                        <CustomLink to='/users' />
                    }
                />
                {/* table */}
                <div className="w-full mt-5">
                    <CustomTable
                        data={users}
                        columns={[
                            { key: 'fullName', label: 'الأسم' },
                            { key: 'userType', label: 'نوع المستخدم' },
                            { key: 'phoneNumber', label: 'رقم الهاتف' },
                            {
                                key: "isActive",
                                label: "الحالة",
                            },
                            {
                                key: "createdAt",
                                label: "تاريخ التسجيل",
                            },
                        ]}
                    />
                </div>
            </Container>
        </section>
    );
};

export default Home;