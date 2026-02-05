import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const SubscriptionsChart = () => {

    // const data = [
    //     { name: "Jan", currentYear: 12000, lastYear: 8000 },
    //     { name: "Feb", currentYear: 10000, lastYear: 12000 },
    //     { name: "Mar", currentYear: 15000, lastYear: 10000 },
    //     { name: "Apr", currentYear: 22000, lastYear: 11000 },
    //     { name: "May", currentYear: 28000, lastYear: 15000 },
    //     { name: "Jun", currentYear: 20000, lastYear: 22000 },
    //     { name: "Jul", currentYear: 23000, lastYear: 27000 },
    // ]
    const data = [
        { name: "يناير", هذا_العام: 12000, العام_الماضي: 8000 },
        { name: "فبراير", هذا_العام: 10000, العام_الماضي: 12000 },
        { name: "مارس", هذا_العام: 15000, العام_الماضي: 10000 },
        { name: "أبريل", هذا_العام: 22000, العام_الماضي: 11000 },
        { name: "مايو", هذا_العام: 28000, العام_الماضي: 15000 },
        { name: "يونيو", هذا_العام: 10000, العام_الماضي: 22000 },
        { name: "يوليو", هذا_العام: 2000, العام_الماضي: 27000 },
        { name: "أغسطس", هذا_العام: 19000, العام_الماضي: 20000 },
        { name: "سبتمبر", هذا_العام: 20000, العام_الماضي: 13000 },
        { name: "أكتوبر", هذا_العام: 24000, العام_الماضي: 3200 },
        { name: "نوفمبر", هذا_العام: 22000, العام_الماضي: 11000 },
        { name: "ديسمبر", هذا_العام: 30000, العام_الماضي: 14000 },
    ]

    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="هذا_العام" stroke="#82ca9d" fill='#82ca9d' strokeDasharray="1" />
                    <Line type="monotone" dataKey="العام_الماضي" stroke="#8884d8" fill='#8884d8' strokeDasharray="8 5" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default SubscriptionsChart