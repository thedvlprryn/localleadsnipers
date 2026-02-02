"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/mo",
        description: "Perfect for testing the waters.",
        features: ["10 Credits / month", "Basic Search", "3-day data retention", "Community Support"],
        cta: "Start for Free",
        href: "/login",
        popular: false
    },
    {
        name: "Pro",
        price: "$49",
        period: "/mo",
        description: "For agencies scaling up.",
        features: ["Unlimited Search", "Export to CSV", "Unlimited data retention", "Priority Support", "API Access"],
        cta: "Get Pro",
        href: "/login",
        popular: true
    }
]

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section className="py-24 bg-slate-50">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Simple, transparent pricing.
                    </motion.h2>
                    <p className="text-slate-500 text-lg mb-8">
                        No hidden fees. Cancel anytime.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative w-14 h-8 bg-indigo-100 rounded-full p-1 transition-colors hover:bg-indigo-200 focus:outline-none ring-2 ring-transparent focus:ring-indigo-500"
                        >
                            <motion.div
                                className="w-6 h-6 bg-indigo-600 rounded-full shadow-sm"
                                animate={{ x: isYearly ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
                            Yearly <span className="text-emerald-600 text-xs font-bold ml-1">-20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className={`relative bg-white rounded-2xl p-8 shadow-xl border ${plan.popular ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                            <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                <span className="text-slate-500 ml-2">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-indigo-600" />
                                        </div>
                                        <span className="text-slate-600 text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild className={`w-full h-12 text-base font-semibold ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}>
                                <Link href={plan.href}>{plan.cta}</Link>
                            </Button>

                            {/* Border Beam Effect Attempt (simplified CSS for now) */}
                            {plan.popular && (
                                <div className="absolute inset-0 rounded-2xl pointer-events-none border border-indigo-500/50 animate-pulse"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
