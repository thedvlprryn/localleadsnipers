"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "Where does the data come from?",
        answer: "We aggregate data from multiple high-quality business sources in real-time, verifying emails and phone numbers as we go to ensure maximum accuracy."
    },
    {
        question: "Can I export to Excel?",
        answer: "Yes! You can export your verified leads to CSV with a single click, which is compatible with Excel, Google Sheets, and most CRM platforms."
    },
    {
        question: "Is there a free trial?",
        answer: "Absolutely. When you sign up, you get 10 free credits to test our search and verification quality. No credit card required."
    },
    {
        question: "Do credits roll over?",
        answer: "On our monthly plans, unused credits roll over for up to 3 months. Data is yours forever once exported."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto max-w-3xl">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-semibold text-slate-900 text-lg">{faq.question}</span>
                                {openIndex === i ? (
                                    <Minus className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
