import './users.css';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import HeadTitle from "../../components/headTitle/HeadTitle";
import CustomInput from "../../components/ui/inputs/CustomInput";
import getParentById from "../../store/users/thunk/getParentById";
import Container from "../../components/ui/Container";
import CustomButton from "../../components/ui/buttons/CustomButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Avatar, Table } from "@mantine/core";
import NotFoundData from '../../components/notFound/NotFoundData';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import SkeletonList from '../../components/skeleton/SkeletonList';


const ParentDetails = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { singleParent, loading } = useAppSelector((state) => state.users);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getParentById({ parentID: id }));
        }
    }, [id, dispatch]);

    return (
        <section className='user-details'>
            <Header text='إدارة المستخدمين' />
            <Container>
                <HeadTitle title='تفاصيل ولي الأمر :' />
                {loading === 'pending' && (
                    <div>
                        <SkeletonForm />
                        <SkeletonList />
                    </div>
                )}
                {!singleParent && (
                    <p>no user</p>
                )}
                {singleParent && loading === 'succeeded' && (
                    <div className="my-5">
                        <div className="w-full flex justify-center">
                            <Avatar src={'https://images.icon-icons.com/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png'} alt="user image" size={'xl'} />
                        </div>
                        <div className="flex flex-wrap my-5">
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='الأسم الأول'
                                    value={singleParent.parentName}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-6/12 p-4">
                                <CustomInput
                                    type='text'
                                    label='رقم الهاتف'
                                    value={singleParent.phoneNumber}
                                    readOnly
                                />
                            </div>

                            <div className="w-full my-8">
                                <HeadTitle title="مراقبة الطالب :" />
                                {singleParent.parentDashboardStudentInfos.length < 1 && (
                                    <NotFoundData text='لا يوجد طلاب مرتبطو بهذا الحساب' />
                                )}
                                {singleParent && singleParent.parentDashboardStudentInfos.length > 0 && (
                                    <div className="students-table flex justify-center">
                                        <Table highlightOnHover verticalSpacing="lg">
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th>الطالب</Table.Th>
                                                    <Table.Th>نوع الاشتراك</Table.Th>
                                                    <Table.Th>حالة الاشتراك </Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {singleParent.parentDashboardStudentInfos.map((student) => (
                                                    <Table.Tr key={student.studentId}
                                                        onClick={() => navigate(`/users/student-details/${student.studentId}`)}
                                                    >
                                                        <Table.Td>{student.name}</Table.Td>
                                                        <Table.Td>{student.subscriptionType}</Table.Td>
                                                        <Table.Td>{student.subscriptionStatus === 'Active' ? 'نشط' : 'غير نشط'}</Table.Td>
                                                    </Table.Tr>
                                                ))}
                                            </Table.Tbody>
                                        </Table>
                                    </div>
                                )}
                            </div>

                            <div className="forms-actions-btn w-full justify-end">
                                <div className="w-full md:w-4/12 lg:w-2/12">
                                    <CustomButton
                                        type='reset'
                                        text='حذف الحساب'
                                        radius='xl'
                                        variant='light'
                                        color='var(--danger-color)'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default ParentDetails;

// users/student-details/5f126ff8-87f1-4316-4995-08de108ea3de