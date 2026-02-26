import { Plus } from "lucide-react";
import Header from "../../components/header/Header";
import HeadTitle from "../../components/headTitle/HeadTitle";
import CustomButton from "../../components/ui/buttons/CustomButton";
import Container from "../../components/ui/Container";
import PaginationTable from "../../components/ui/tables/PaginationTable";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "../../components/ui/modals/CustomModal";
import AddNewCouponForm from "../../components/forms/AddNewCouponForm";


const Coupons = () => {
    const [opened, { open, close }] = useDisclosure(false);

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
        <section>
            <Header text="النقاط والمكافآت" />

            <Container>
                <HeadTitle title="الكوبون"
                    component={
                        <CustomButton
                            type="button"
                            text="إنشاء كوبون"
                            icon={<Plus />}
                            radius="xl"
                            variant="light"
                            onClick={open}
                        />
                    }
                />
                <div className="mt-5">
                    <PaginationTable
                        activePage={1}
                        onPageChange={() => { }}
                        totalPages={10}
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
            <CustomModal opened={opened} onClose={close} title="إضافة كوبون">
                <AddNewCouponForm />
            </CustomModal>
        </section>
    )
}

export default Coupons