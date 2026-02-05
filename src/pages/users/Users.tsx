//
import Header from '../../components/header/Header';
import StatsCards from '../../components/StatsCards/StatsCards';
import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';
import SelectInput from '../../components/ui/selectInput/SelectInput';
import PaginationTable from '../../components/ui/tables/PaginationTable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import thunkGetUsers from '../../store/users/thunk/thunkGetUsers';
import SkeletonTable from '../../components/skeleton/SkeletonTable';
import NotFoundImage from '../../components/notFound/NotFoundImage';
import thunkGetUsersReports from '../../store/reports/thunk/thunkGetUsersReports';
import SkeletonStatsCards from '../../components/skeleton/SkeletonStatsCards';

const Users = () => {
    const dispatch = useAppDispatch()
    const { users, pageNumber, totalPages, loading } = useAppSelector((state) => state.users);
    const [activePage, setActivePage] = useState(pageNumber || 1);

    const { usersReports, loading: userReportsLoading } = useAppSelector((state) => state.reports);


    // حالتين للفلاتر
    const [filterType, setFilterType] = useState<string | null>("الكل");
    const [filterStatus, setFilterStatus] = useState<string | null>("الكل");

    useEffect(() => {
        dispatch(thunkGetUsers({
            PageNumber: activePage,
            UserType: filterType === "الكل" ? null : filterType === "طالب" ? "Student" : "Parent",
            IsActive: filterStatus === "الكل" ? null : filterStatus === "نشط" ? true : filterStatus === "غير نشط" ? false : null
        }))
        dispatch(thunkGetUsersReports());
    }, [dispatch, activePage, filterType, filterStatus])


    // const [value, setValue] = useState<string | null>('');

    return (
        <section className='users-page'>
            {/* header */}
            <Header text='إدارة المستخدمين' />

            <Container>
                {/* stats */}
                {userReportsLoading === 'pending' && (
                    <SkeletonStatsCards />
                )}
                {usersReports && userReportsLoading == 'succeeded' && (
                    <StatsCards
                        card1={{
                            title: 'المستخدمين',
                            numbers: usersReports.totalUsers
                        }}
                        card2={{
                            title: 'عدد الطلاب',
                            numbers: usersReports.totalStudents
                        }}
                        card3={{
                            title: 'عدد أولياء الأمور',
                            numbers: usersReports.totalParents
                        }}
                        card4={{
                            title: 'معدل المستخدمين النشطين',
                            numbers: usersReports.totalActiveUsers
                        }}
                    />
                )}

                <div>
                    {/* Head Title */}
                    <HeadTitle
                        title='تقارير تفصيلية :'
                        component={
                            <div className='head-title-component'>
                                <SelectInput
                                    placeholder='النوع'
                                    data={[
                                        'الكل',
                                        'طالب',
                                        'ولي الامر',
                                    ]}
                                    radius='xl'
                                    value={filterType}
                                    onChange={(val) => setFilterType(val)}
                                />
                                <SelectInput
                                    placeholder='الحاله'
                                    data={[
                                        'الكل',
                                        'نشط',
                                        'غير نشط',
                                    ]}
                                    radius='xl'
                                    value={filterStatus}
                                    onChange={(val) => setFilterStatus(val)}
                                />
                            </div>
                        }
                    />

                    {/* table */}
                    {loading === 'pending' && (
                        <SkeletonTable />
                    )}
                    {loading === 'succeeded' && users.length > 0 && (
                        <div className='mt-10'>
                            <PaginationTable
                                data={users}
                                columns={[
                                    { key: 'fullName', label: 'الأسم' },
                                    {
                                        key: "userType",
                                        label: "نوع المستخدم",
                                        render: (row) =>
                                            row.userType === "Parent"
                                                ? "ولي أمر"
                                                : row.userType === "Student"
                                                    ? "طالب"
                                                    : row.userType,
                                    },
                                    { key: 'phoneNumber', label: 'رقم الهاتف' },
                                    {
                                        key: "isActive",
                                        label: "الحالة",
                                        render: (row) => (row.isActive ? "نشط ✅" : "غير نشط ❌"),
                                    },
                                    {
                                        key: "createdAt",
                                        label: "تاريخ التسجيل",
                                        render: (row) => row.createdAt.split("T")[0],
                                    },
                                ]}
                                totalPages={totalPages}
                                activePage={activePage}
                                onPageChange={setActivePage}
                                getLink={true}
                            />
                        </div>
                    )}
                    {users.length === 0 && (
                        <div className='py-5'>
                            <NotFoundImage text='لا يوجد بيانات لعرضها' />
                        </div>
                    )}
                </div>
            </Container>
        </section >
    )
}

export default Users;