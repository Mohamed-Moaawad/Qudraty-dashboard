import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { BellPlus, BookA, BookOpenText, ChartColumn, CreditCard, FileChartColumn, Headset, LogOut, Megaphone, SquarePen, Trophy, Users, UserStar } from 'lucide-react';
import { useAppDispatch } from '../../hooks/hooks';
import { logOut } from '../../store/auth/authSlice';
import CustomButton from '../ui/buttons/CustomButton';

const Sidebar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        dispatch(logOut());
        navigate('/auth/login', { replace: true });
    }
    return (
        <aside className='p-5'>
            <nav className='flex flex-col gap-16'>
                <div className="logo">
                    <img src="/image/logo.png" alt="logo" />
                </div>
                <ul>
                    <li>
                        <NavLink to="/">
                            <FileChartColumn strokeWidth={2} />
                            الصفحة الرئيسة
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">
                            <Users strokeWidth={2} />
                            إدارة المستخدمين
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="support-team">
                            <UserCog strokeWidth={2} />
                            فريق الدعم
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/profits">
                            <ChartColumn strokeWidth={2} />
                            الأرباح
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/subjects">
                            <BookOpenText strokeWidth={2} />
                            المواد الدراسية
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/exams">
                            <BookA strokeWidth={2} />
                            الامتحانات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscriptions">
                            <CreditCard strokeWidth={2} />
                            الاشتراكات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/points-and-rewards">
                            <Trophy strokeWidth={2} />
                            النقاط والمكافآت
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reviews">
                            <UserStar strokeWidth={2} />
                            طلبات التقييم
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notification">
                            <BellPlus strokeWidth={2} />
                            الإشعارات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/support-contacts">
                            <Headset strokeWidth={2} />
                            الدعم الفنى
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/advertisement">
                            <Megaphone strokeWidth={2} />
                            الإعلانات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="aaaaa">
                            <SquarePen strokeWidth={2} />
                            تعديلات الموقع
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="logout">
                {/* <Link className='logout-btn' onClick={logOutHandler}>
                    <LogOut strokeWidth={2.5} />
                    تسجيل الخروج
                </Link> */}
                <CustomButton
                    type='button'
                    text='تسجيل الخروج'
                    icon={<LogOut strokeWidth={2.5} />}
                    radius='md'
                    variant='filled'
                    color='var(--danger-color)'
                    onClick={logOutHandler}
                />
            </div>
        </aside>
    );
};

export default Sidebar;