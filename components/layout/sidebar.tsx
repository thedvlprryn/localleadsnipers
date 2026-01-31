"use client"

import { LayoutDashboard, Search, Megaphone, Settings, BarChart3, Database } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Lead Search", href: "/dashboard/search" },
    { icon: Database, label: "My Leads", href: "/dashboard/leads" },
    { icon: Megaphone, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-30">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">LocalLeadSnipers</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-slate-50 text-indigo-600 ring-1 ring-slate-200"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-sm">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">John Doe</span>
                        <span className="text-xs text-slate-500">Admin</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
