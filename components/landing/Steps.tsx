"use client"

import { motion } from "framer-motion"
import { Search, Filter, Download } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Search",
        description: "Enter your target niche and location."
    },
    {
        icon: Filter,
        title: "Filter",
        description: "Select the best leads by rating or industry."
    },
    {
        icon: Download,
        title: "Export",
        description: "Download verified leads instantly."
    }
]

export function Steps() {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        How it Works
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col items-center text-center bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl"
                            >
                                <div className="w-24 h-24 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center mb-8 relative z-10">
                                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
                                        <step.icon className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full text-white flex items-center justify-center font-bold text-sm border-4 border-white">
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-500">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
