"use client"

import { LeadsTableClient } from "@/components/dashboard/leads-table-client"
import { motion } from "framer-motion"

const MOCK_LEADS = [
    {
        id: "1",
        business_name: "Tesla Inc.",
        industry: "Automotive",
        city: "Austin",
        state: "TX",
        rating: 4.8,
        website: "https://tesla.com",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        business_name: "SpaceX",
        industry: "Aerospace",
        city: "Hawthorne",
        state: "CA",
        rating: 4.9,
        website: "https://spacex.com",
        created_at: new Date().toISOString()
    },
    {
        id: "3",
        business_name: "Stripe",
        industry: "Fintech",
        city: "San Francisco",
        state: "CA",
        rating: 5.0,
        website: "https://stripe.com",
        created_at: new Date().toISOString()
    },
    {
        id: "4",
        business_name: "Airbnb",
        industry: "Hospitality",
        city: "San Francisco",
        state: "CA",
        rating: 4.7,
        website: "https://airbnb.com",
        created_at: new Date().toISOString()
    },
    {
        id: "5",
        business_name: "Vercel",
        industry: "Software",
        city: "San Francisco",
        state: "CA",
        rating: 4.9,
        website: "https://vercel.com",
        created_at: new Date().toISOString()
    }

]

export function AppPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 12 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            style={{ perspective: "1000px" }}
            className="relative mx-auto max-w-5xl"
        >
            <div className="relative rounded-xl bg-slate-900 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 shadow-2xl transform-gpu border border-slate-200/50 bg-white">
                <div className="rounded-md shadow-2xl overflow-hidden bg-white border border-slate-200">
                    <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                        </div>
                        <div className="ml-4 text-xs text-slate-400 font-medium">dashboard.leadaim.com</div>
                    </div>
                    {/* Live Component Preview */}
                    <div className="bg-slate-50/50">
                        <LeadsTableClient leads={MOCK_LEADS} />
                    </div>
                </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -top-24 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
            <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
        </motion.div>
    )
}
