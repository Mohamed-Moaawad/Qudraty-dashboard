import { Notification, Pagination } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import SkeletonList from "../../components/skeleton/SkeletonList";
import NotFoundData from "../../components/notFound/NotFoundData";
import { useEffect, useState } from "react";
import thunkGetAllNotifications from "../../store/notification/thunk/thunkGetAllNotifications";
import moment from "moment";

const SentNotifications = () => {
    const dispatch = useAppDispatch();
    const { notifications, pageNumber, pageSize, totalPages, totalRecords, loading } = useAppSelector((state) => state.notifications)
    const [activePage, setActivePage] = useState(pageNumber || 1);
    useEffect(() => {
        dispatch(thunkGetAllNotifications({ pageNumber: activePage }))
    }, [dispatch, activePage])

    return (
        <div className="sent-notifications p-4">
            {loading === 'pending' && (
                <div>
                    <SkeletonList />
                    <SkeletonList />
                </div>
            )}
            {notifications.length > 0 && loading === 'succeeded' && (
                <div>

                    <div className="flex justify-between mb-4">
                        <h4>إجمالي السجلات : {totalRecords}</h4>
                        <h4> إجمالي الصفحات : {totalPages}</h4>
                        <h4>عدد الصفحة : {pageSize}</h4>
                    </div>

                    <div className="flex flex-col gap-5 w-full">
                        {notifications.map((notification) => (
                            <Notification key={notification.id} withCloseButton={false} className="w-full">
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                                    <span className="text-sm text-gray-500">{moment(notification.sentAt).format('YYYY/MM/DD')}</span>
                                </div>
                                <p className="text-gray-700 mb-3">{notification.body}</p>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <div>Total Recipients: <span className="font-medium">{notification.totalRecipients}</span></div>
                                    <div className="text-green-600">Success: <span className="font-medium">{notification.successCount}</span></div>
                                    <div className="text-red-600">Failed: <span className="font-medium">{notification.failureCount}</span></div>
                                </div>
                                <div className="w-full mt-5 text-gray-700">المستخدمين المستهدفين : <span className="font-medium">{notification.targetUserType === 'Student' ? 'الطلاب' : notification.targetUserType === 'Parent' ? 'اولياء الأمور' : 'الأدمن'}</span></div>
                                {/* <div className="w-full mt-5 text-gray-700">المستخدمين المستهدفين : <span className="font-medium">{notification.}</span></div> */}
                            </Notification>
                        ))}
                        {/* <Notification withCloseButton={false} className="w-full">
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">dsdsds</h3>
                                <span className="text-sm text-gray-500">dsdsddsd</span>
                            </div>
                            <p className="text-gray-700 mb-3">sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdssssssss</p>

                            <div className="flex justify-between text-sm text-gray-600">
                                <div>Total Recipients: <span className="font-medium">dsdsdsdsd</span></div>
                                <div className="text-green-600">Success: <span className="font-medium">dsds</span></div>
                                <div className="text-red-600">Failed: <span className="font-medium">dsds</span></div>
                            </div>
                        </Notification> */}

                    </div>
                    <div className="w-full mt-5 px-4">
                        <Pagination
                            total={totalPages}
                            value={activePage}
                            onChange={setActivePage}
                        />
                    </div>
                </div>
            )}
            {notifications.length === 0 && loading === 'succeeded' && (
                <NotFoundData text="لا توجد إشعارات" />
            )}
        </div>
    )
}

export default SentNotifications