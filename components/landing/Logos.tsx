"use client"

import { motion } from "framer-motion"
import { Building2, Store, Wrench, Briefcase, GraduationCap, Stethoscope, Utensils, Plane } from "lucide-react"

const industries = [
    { icon: Building2, label: "Agencies" },
    { icon: Store, label: "E-commerce" },
    { icon: Wrench, label: "Service Biz" },
    { icon: Briefcase, label: "B2B SaaS" },
    { icon: GraduationCap, label: "Education" },
    { icon: Stethoscope, label: "Healthcare" },
    { icon: Utensils, label: "Restaurants" },
    { icon: Plane, label: "Travel" },
]

export function Logos() {
    return (
        <section className="py-10 bg-white border-b border-slate-50 overflow-hidden">
            <div className="container px-4 mx-auto text-center mb-8">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Trusted by businesses in every industry
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent"></div>

                {/* Scrolling Marquee (duplicated for seamless loop) */}
                <div className="flex animate-marquee whitespace-nowrap gap-16 px-8">
                    {[...industries, ...industries, ...industries].map((industry, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors">
                            <industry.icon className="w-6 h-6" />
                            <span className="font-bold text-lg">{industry.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
