import './SupportContacts.css';
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import HeadTitle from "../../components/headTitle/HeadTitle";
import Container from "../../components/ui/Container";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import thunkGetAllSupportContacts from '../../store/supportContacts/thunk/thunkGetAllSupportContacts';

const SupportContacts = () => {
    const dispatch = useAppDispatch();
    const { supportContacts, loading } = useAppSelector((state) => state.supportContacts);

    useEffect(() => {
        dispatch(thunkGetAllSupportContacts());
    }, [dispatch]);

    return (
        <section className='support-contacts'>
            <Header text="الدعم الفنى " />
            <Container>
                <HeadTitle title="إدارة الدعم الفنى" />

                {supportContacts.length > 0 && loading === 'succeeded' && (
                    <div className="tickets my-5 flex flex-wrap">
                        {supportContacts.map((contact) => (
                            <div key={contact.id} className="ticket w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                                <div className="flex justify-between items-center mb-5">
                                    <h4>{contact.contactMethod}</h4>
                                    {/* <span> 12:45 AM</span> */}
                                </div>
                                <h3>{contact.title}</h3>
                                {/* <p>المستخدم واجه مشكلة أثناء محاولة إنشاء حساب جديد. بعد إدخال البيانات والضغط على زر "تسجيل"، تظهر رسالة خطأ ولم يتم إنشاء الحساب.</p> */}
                                <div className="ticket-footer flex justify-between items-center mt-8">
                                    {/* <div className="user flex items-center gap-2">
                                        <Avatar src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" alt="user_image" />
                                        <p>عبدالعزيز</p>
                                    </div> */}
                                    <Link to={`${contact.id}`}>افتح التذكرة</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    )
};

export default SupportContacts;