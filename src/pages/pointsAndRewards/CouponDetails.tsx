import Header from "../../components/header/Header";
import CustomButton from "../../components/ui/buttons/CustomButton";
import Container from "../../components/ui/Container";
import CustomInput from "../../components/ui/inputs/CustomInput";

const CouponDetails = () => {
    return (
        <section>
            <Header text="تفاصيل الكوبون" />
            <Container>
                <form className="flex flex-wrap w-full">
                    <div className="w-full p-4">
                        <CustomInput
                            type="text"
                            label="اسم الكوبون"
                            value=" خصم العودة للمدرسة"
                            readOnly
                        />
                    </div>
                    <div className="w-full p-4">
                        <CustomInput
                            type="text"
                            label="رمز الكوبون"
                            value=" خصم العودة للمدرسة"
                            leftSection="🎁"
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type="text"
                            label="تاريخ البداية"
                            leftSection="📅"
                            value="6/7/2025"
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type="text"
                            label="تاريخ الانتهاء"
                            leftSection="📅"
                            value="6/8/2015"
                            readOnly
                        />
                    </div>
                    <div className="w-full p-4">
                        <CustomInput
                            type="text"
                            label=" نوع الخصم"
                            value="نسبة مئوية (%)"
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type="text"
                            label="عدد النقاط المطلوبة"
                            value="100"
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type="text"
                            label="قيمة الخصم"
                            value="20"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex justify-end mt-10">
                        <div className="w-full sm:w-6/12 md:w-3/12 lg:w-2/12">
                            <CustomButton
                                type="button"
                                text="حذف"
                                radius="lg"
                                variant="filled"
                                color="var(--danger-color)"
                            />
                        </div>
                    </div>
                </form>
            </Container>
        </section>
    );
};

export default CouponDetails;