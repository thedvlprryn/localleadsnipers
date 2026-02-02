"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 18 },
    { name: "Mar", total: 35 },
    { name: "Apr", total: 24 },
    { name: "May", total: 45 },
    { name: "Jun", total: 68 },
    { name: "Jul", total: 85 },
]

export function OverviewChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.1}
                    strokeWidth={2}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
