"use client"

import { LayoutDashboard, Search, Megaphone, Settings, BarChart3, Database, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Lead Search", href: "/dashboard/search" },
    { icon: Database, label: "My Leads", href: "/dashboard/leads" },
    { icon: Megaphone, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

interface SidebarProps {
    userEmail?: string
}

export function Sidebar({ userEmail }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error("Error logging out")
        } else {
            toast.success("Logged out successfully")
            router.push("/")
            router.refresh()
        }
    }

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-30">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">LeadAim</span>
                </Link>
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
                                    ? "bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-100" // active
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900" // inactive
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-medium text-sm">
                            {userEmail?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-slate-900 truncate max-w-[100px]" title={userEmail}>{userEmail || "User"}</span>
                            <span className="text-xs text-slate-500">Admin</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </aside>
    )
}
