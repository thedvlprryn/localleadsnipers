import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Megaphone, TrendingUp, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of your lead generation performance.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Download Report</Button>
                    <Button>
                        <Search className="w-4 h-4 mr-2" />
                        Find New Leads
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Leads", value: "2,543", change: "+12.5%", icon: Users },
                    { label: "Active Campaigns", value: "12", change: "+4.1%", icon: Megaphone },
                    { label: "Conversion Rate", value: "3.2%", change: "+0.8%", icon: TrendingUp },
                    { label: "Revenue (Est)", value: "$45.2k", change: "+15.3%", icon: TrendingUp },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h4 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h4>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                                    {stat.change} from last month
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <stat.icon className="w-5 h-5 text-slate-400" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Leads</CardTitle>
                        <CardDescription>Latest prospects found matching your criteria.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 -mx-6 px-6 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                            {["T", "A", "G", "M", "S"][i]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">TechCorp Solutions {i + 1}</p>
                                            <p className="text-xs text-slate-500">San Francisco, CA • SaaS</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Campaign Performance</CardTitle>
                        <CardDescription>Email open rates by campaign</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6 mt-2">
                            {[
                                { name: "Cold Outreach Q1", val: 78, color: "bg-indigo-600" },
                                { name: "Follow-up Sequence", val: 45, color: "bg-blue-500" },
                                { name: "linkedin-connect", val: 62, color: "bg-sky-500" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-700 font-medium">{item.name}</span>
                                        <span className="text-slate-500">{item.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
