import { useState } from "react"

import ProfitsChart from "../../components/charts/ProfitsChart"
import Header from "../../components/header/Header"
import HeadTitle from "../../components/headTitle/HeadTitle"
import StatsCards from "../../components/StatsCards/StatsCards"
import CustomButton from "../../components/ui/buttons/CustomButton"
import Container from "../../components/ui/Container"
import SelectInput from "../../components/ui/selectInput/SelectInput"
import CustomTable from "../../components/ui/tables/CustomTable"
import CustomLink from "../../components/ui/CustomLink"

const Profits = () => {
    const [value, setValue] = useState<string | null>('')
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
        }
    ];

    return (
        <section className="profits">
            {/* Header */}
            <Header text="الأرباح" />

            <Container>
                {/* stats */}
                <StatsCards
                    card1={{
                        title: 'إجمالي الأرباح',
                        numbers: '25,000 ريال'
                    }}
                    card2={{
                        title: 'عدد العمليات',
                        numbers: '350'
                    }}
                    card3={{
                        title: 'عدد المشتركين الجدد',
                        numbers: '120'
                    }}
                />

                {/* head title*/}
                <HeadTitle title="لوحة الأرباح"
                    component={
                        <div className='head-title-component'>
                            <SelectInput
                                data={[
                                    'اليوم',
                                    'هذا الأسبوع',
                                    'هذا الشهر',
                                    'هذا العام',
                                ]}
                                placeholder="التاريخ"
                                radius="xl"
                                value={value}
                                onChange={(val) => setValue(val)}
                            />
                            <div>
                                <CustomButton
                                    type="button"
                                    text="تحميل التقرير"
                                    radius="xl"
                                    variant="default"
                                    icon={<img src="/image/icons-excel.png" alt="excel" />}
                                />
                            </div>
                        </div>
                    }
                />
                {/* Chart */}
                <div className="w-full my-12">
                    <ProfitsChart />
                </div>
                <div className="w-full mt-10 mb-5">

                    <HeadTitle
                        title="تقارير تفصيلية :"
                        component={
                            <CustomLink to='/profits/transactions' />
                        }
                    />
                </div>
                {/* Profits Table */}
                <CustomTable
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

export default Profits