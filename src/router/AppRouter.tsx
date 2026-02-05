import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout';
//
import Auth from '../pages/auth/Auth';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Home from '../pages/home/Home';
import Users from '../pages/users/Users';
import StudentDetails from '../pages/users/StudentDetails';
import ParentDetails from '../pages/users/ParentDetails';
import Subscriptions from '../pages/subscriptions/Subscriptions';
import NotFound from '../pages/errorPages/NotFound';
import SupportTeamDetails from '../pages/supportTeam/SupportTeamDetails';
import Profits from '../pages/profits/Profits';
import Transactions from '../pages/profits/Transactions';
import TransactionDetails from '../pages/profits/TransactionDetails';
import Subjects from '../pages/subjects/Subjects';
import SubjectDetails from '../pages/subjects/SubjectDetails';
import Exams from '../pages/exams/Exams';
import FinalExamDetails from '../pages/exams/FinalExamDetails';
import PointsAndRewards from '../pages/pointsAndRewards/PointsAndRewards';
import Coupons from '../pages/pointsAndRewards/Coupons';
import CouponDetails from '../pages/pointsAndRewards/CouponDetails';
import Notification from '../pages/notification/Notification';
import Profile from '../pages/profile/Profile';
import UnAuthorized from '../pages/errorPages/UnAuthorized';
import ProtectedRoute from './ProtectedRoute';
import TopicDetails from '../pages/subjects/TopicDetails';
import Reviews from '../pages/reviews/Reviews';
import SupportContacts from '../pages/supportContacts/SupportContacts';
import SupportContactDetails from '../pages/supportContacts/SupportContactDetails';
import Advertisement from '../pages/advertisment/Advertisement';
import AdvertisementDetails from '../pages/advertisment/AdvertisementDetails';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<Auth />} >
                    <Route index element={<Navigate to={'login'} replace />} />
                    <Route path='login' element={<Login />} />
                    <Route path='forgot-password' element={<ForgotPassword />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Home />} />

                        <Route path='/users' element={<Users />} />
                        <Route path='/users/student-details/:id' element={<StudentDetails />} />
                        <Route path='/users/parent-details/:id' element={<ParentDetails />} />

                        {/* <Route path='/support-team' element={<SupportTeam />} /> */}
                        <Route path='/support-team/:id' element={<SupportTeamDetails />} />

                        <Route path='/profits' element={<Profits />} />
                        <Route path='/profits/transactions' element={<Transactions />} />
                        <Route path='/profits/transactions/:id' element={<TransactionDetails />} />

                        <Route path='/subjects' element={<Subjects />} />
                        <Route path='/subjects/:subjectId' element={<SubjectDetails />} />
                        <Route path='/subjects/:subjectId/:topicId' element={<TopicDetails />} />

                        <Route path='/exams' element={<Exams />} />
                        <Route path='/exams/:id' element={<FinalExamDetails />} />

                        <Route path='/subscriptions' element={<Subscriptions />} />

                        <Route path='/points-and-rewards' element={<PointsAndRewards />} />
                        <Route path='/points-and-rewards/coupons' element={<Coupons />} />
                        <Route path='/points-and-rewards/coupons/:id' element={<CouponDetails />} />

                        <Route path='/reviews' element={<Reviews />} />

                        <Route path='/notification' element={<Notification />} />

                        <Route path='/support-contacts' element={<SupportContacts />} />
                        <Route path='/support-contacts/:id' element={<SupportContactDetails />} />

                        <Route path='/advertisement' element={<Advertisement />} />
                        <Route path='/advertisement/:id' element={<AdvertisementDetails />} />

                        <Route path='/profile' element={<Profile />} />


                        <Route path='/unauthorized' element={<UnAuthorized />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;