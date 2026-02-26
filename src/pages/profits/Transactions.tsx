import Header from "../../components/header/Header"
import HeadTitle from "../../components/headTitle/HeadTitle"
import Container from "../../components/ui/Container"
import PaginationTable from "../../components/ui/tables/PaginationTable"

const Transactions = () => {

    const subscriptionsUsers = [
        {
            id: 1,
            name: "محمد",
            TransactionDate: "2024-03-15",
            AmountPaid: 50,
            PaymentMethod: "Apple Pay",
            SubscriptionType: "الشهرية",
            DiscountCode: "_",
        },
        {
            id: 2,
            name: "يوسف احمد",
            TransactionDate: "2024-03-15",
            AmountPaid: 500,
            PaymentMethod: "Google Pay",
            SubscriptionType: "السنوية",
            DiscountCode: "NEW50",
        },
        {
            id: 3,
            name: "علي محمود",
            TransactionDate: "2024-04-01",
            AmountPaid: 100,
            PaymentMethod: "Visa",
            SubscriptionType: "الشهرية",
            DiscountCode: "SPRING10",
        },
        {
            id: 4,
            name: "سارة خالد",
            TransactionDate: "2024-04-02",
            AmountPaid: 900,
            PaymentMethod: "MasterCard",
            SubscriptionType: "السنوية",
            DiscountCode: "_",
        },
        {
            id: 5,
            name: "أحمد حسن",
            TransactionDate: "2024-04-05",
            AmountPaid: 50,
            PaymentMethod: "PayPal",
            SubscriptionType: "الشهرية",
            DiscountCode: "_",
        },
        {
            id: 6,
            name: "منى علي",
            TransactionDate: "2024-04-07",
            AmountPaid: 500,
            PaymentMethod: "Apple Pay",
            SubscriptionType: "السنوية",
            DiscountCode: "NEW50",
        },
        {
            id: 7,
            name: "كريم سامي",
            TransactionDate: "2024-04-10",
            AmountPaid: 75,
            PaymentMethod: "Google Pay",
            SubscriptionType: "الشهرية",
            DiscountCode: "_",
        },
        {
            id: 8,
            name: "مها إبراهيم",
            TransactionDate: "2024-04-12",
            AmountPaid: 600,
            PaymentMethod: "Visa",
            SubscriptionType: "السنوية",
            DiscountCode: "DISCOUNT20",
        },
        {
            id: 9,
            name: "مصطفى فتحي",
            TransactionDate: "2024-04-14",
            AmountPaid: 55,
            PaymentMethod: "MasterCard",
            SubscriptionType: "الشهرية",
            DiscountCode: "_",
        },
        {
            id: 10,
            name: "نهى محمد",
            TransactionDate: "2024-04-15",
            AmountPaid: 550,
            PaymentMethod: "PayPal",
            SubscriptionType: "السنوية",
            DiscountCode: "NEWUSER",
        },
        {
            id: 11,
            name: "إبراهيم طارق",
            TransactionDate: "2024-04-16",
            AmountPaid: 65,
            PaymentMethod: "Apple Pay",
            SubscriptionType: "الشهرية",
            DiscountCode: "_",
        },
        {
            id: 12,
            name: "فاطمة يوسف",
            TransactionDate: "2024-04-18",
            AmountPaid: 700,
            PaymentMethod: "Google Pay",
            SubscriptionType: "السنوية",
            DiscountCode: "SPRING20",
        },
    ];


    return (
        <section className="transactions">
            {/* header */}
            <Header text="تفاصيل الاشتراكات" />

            <Container>
                {/* Title */}
                <div className="w-full mt-10 mb-5">
                    <HeadTitle title=" تفاصيل الاشتراكات :" />
                </div>
                {/* Profits Table */}
                {/* Profits Table */}
                <PaginationTable
                    activePage={1}
                    onPageChange={() => { }}
                    totalPages={10}
                    data={subscriptionsUsers}
                    columns={[
                        { key: 'id', label: 'ID' },
                        { key: 'name', label: 'اسم الطالب' },
                        { key: 'TransactionDate', label: 'تاريخ العملية' },
                        { key: 'AmountPaid', label: 'المبلغ المدفوع' },
                        { key: 'PaymentMethod', label: 'طريقة الدفع' },
                        { key: 'SubscriptionType', label: 'نوع الاشتراك' },
                        { key: 'DiscountCode', label: 'كود الخصم' },
                    ]}
                />
            </Container>
        </section>
    )
}

export default Transactions