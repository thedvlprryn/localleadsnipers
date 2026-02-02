import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Megaphone, TrendingUp, Search, Calendar, ArrowUpRight, ArrowDownRight, CreditCard, Activity } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OverviewChart } from "@/components/dashboard/overview-chart"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // 1. Fetch Total Leads
    const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // 2. Fetch Recent Leads
    const { data: recentLeads } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your leads.</p>
                </div>
                <div className="flex gap-3">
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/20">
                        <Link href="/dashboard/leads">
                            <Search className="w-4 h-4 mr-2" />
                            Find New Leads
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Leads</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <h4 className="text-3xl font-bold text-slate-900">{totalLeads || 0}</h4>
                                    <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        <ArrowUpRight className="w-3 h-3 mr-1" />
                                        12%
                                    </span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <Users className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-[60%] rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Active Campaigns</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h4 className="text-3xl font-bold text-slate-900">0</h4>
                                <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    No Data
                                </span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <Megaphone className="w-5 h-5 text-slate-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h4 className="text-3xl font-bold text-slate-900">--</h4>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Credits Remaining</p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <h4 className="text-3xl font-bold text-slate-900">∞</h4>
                                <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    Free Plan
                                </span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <CreditCard className="w-5 h-5 text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Lead Generation Performance</CardTitle>
                        <CardDescription>Leads collected over the last 7 months</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Leads</CardTitle>
                        <CardDescription>Latest prospects found matching your criteria.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentLeads && recentLeads.length > 0 ? (
                                recentLeads.map((lead, i) => (
                                    <div key={lead.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 -mx-6 px-6 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                                                {(lead.business_name || "U").charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate block max-w-[150px]">
                                                    {lead.business_name || "Unknown Company"}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate block max-w-[150px]">
                                                    {lead.city || "Unknown City"}
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                                            <Link href="/dashboard/leads"><ArrowUpRight className="w-4 h-4 text-slate-400" /></Link>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-slate-500 text-sm">No leads found yet.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
