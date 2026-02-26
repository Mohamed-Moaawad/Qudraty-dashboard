import './TransactionsDetails.css';
import Header from "../../components/header/Header"
import HeadTitle from "../../components/headTitle/HeadTitle"
import Container from "../../components/ui/Container"
import CustomInput from "../../components/ui/inputs/CustomInput"

const TransactionDetails = () => {
    const status = true;
    return (
        <section className='transaction-details'>
            {/* header */}
            <Header text="تفاصيل الاشتراك" />

            <Container>
                {/* Head Title */}
                <HeadTitle title="تفاصيل الاشتراك :" />
                {/* transaction details */}
                <div className="page-details">
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="اسم الطالب"
                            value="محمد احمد"
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="الحالة"
                            value={status ? 'Active' : 'Expired'}
                            leftSection={status ? "✅" : "❌"}
                            error={!status}
                            readOnly
                        />
                    </div>

                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="تاريخ البداية"
                            value="6/7/2025"
                            leftSection={"📆"}
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="تاريخ الانتهاء"
                            value="6/8/2025"
                            leftSection={"📆"}
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="تاريخ العملية"
                            value="6/7/2025"
                            leftSection={"📆"}
                            readOnly
                        />
                    </div>

                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="نوع الاشتراك"
                            value="شهري"
                            leftSection={"🌐"}
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="طريقة الدفع"
                            value="Apple Pay"
                            leftSection={"💳"}
                            readOnly
                        />
                    </div>

                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="المبلغ المدفوع"
                            value="2000 .رس"
                            leftSection={'💸'}
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-5">
                        <CustomInput
                            type="text"
                            label="كود الخصم"
                            value="NEW50"
                            leftSection={'🏷️'}
                            readOnly
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default TransactionDetails;