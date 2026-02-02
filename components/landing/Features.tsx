"use client"

import { motion } from "framer-motion"
import { Search, ShieldCheck, Download, Code2, Rocket, Globe } from "lucide-react"

const features = [
    {
        icon: Search,
        title: "Precision Search",
        description: "Filter opportunities by city, niche, rating, and industry to find your perfect leads."
    },
    {
        icon: ShieldCheck,
        title: "Verified Data",
        description: "We verify every lead in real-time. Say goodbye to bounced emails and disconnected numbers."
    },
    {
        icon: Download,
        title: "Instant Export",
        description: "Download your leads as CSV files in one click. Ready for your CRM or cold outreach tools."
    },
    {
        icon: Code2,
        title: "API Access",
        description: "Connect our search engine directly to your application with our robust REST API."
    },
    {
        icon: Rocket,
        title: "High Performance",
        description: "Built on a modern stack to ensure lightning-fast search results, every single time."
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Access local business data from supported countries around the world."
    }
]

export function Features() {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Everything you need to <span className="text-indigo-400">scale</span>.
                    </motion.h2>
                    <motion.p
                        className="text-slate-400 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Powerful tools designed to automate your lead generation workflow.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/30 transition-colors">
                                <feature.icon className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
