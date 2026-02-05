import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HomeChart = () => {

    const data = [
        { day: 'السبت', الاشتراكات: 2400 },
        { day: 'الأحد', الاشتراكات: 1398 },
        { day: 'الاثنين', الاشتراكات: 9800 },
        { day: 'الثلاثاء', الاشتراكات: 3908 },
        { day: 'الأربعاء', الاشتراكات: 4800 },
        { day: 'الخميس', الاشتراكات: 1000 },
        { day: 'الجمعة', الاشتراكات: 4300 },
    ];

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis tickMargin={20} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="الاشتراكات" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSubscriptions)" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
};

export default HomeChart;