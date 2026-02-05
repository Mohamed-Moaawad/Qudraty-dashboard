import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


const ProfitsChart = () => {
    const data = [
        { month: 'يناير', الاشتراكات: 50, الدخل: 5 },
        { month: 'فبراير', الاشتراكات: 95, الدخل: 15 },
        { month: 'مارس', الاشتراكات: 90, الدخل: 13 },
        { month: 'أبريل', الاشتراكات: 110, الدخل: 23 },
        { month: 'مايو', الاشتراكات: 160, الدخل: 40 },
        { month: 'يونيو', الاشتراكات: 130, الدخل: 19 },
        { month: 'يوليو', الاشتراكات: 250, الدخل: 45 },
        { month: 'أغسطس', الاشتراكات: 150, الدخل: 15 },
        { month: 'سبتمبر', الاشتراكات: 125, الدخل: 26 },
        { month: 'أكتوبر', الاشتراكات: 250, الدخل: 50 },
        { month: 'نوفمبر', الاشتراكات: 150, الدخل: 20 },
        { month: 'ديسمبر', الاشتراكات: 160, الدخل: 160 },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                syncId="anyId"
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--main-color)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--main-color)" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="الاشتراكات" stroke="var(--main-color)" fill="url(#colorSubscriptions)" />
                <Area type="monotone" dataKey="الدخل" stroke="#82ca9d" fill="url(#colorIncome)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default ProfitsChart