import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Coins, Building2, MapPin } from "lucide-react"

export async function DashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Default values
    let credits = 0;
    let totalCompanies = 0;
    let latestSearch = "N/A";

    if (user) {
        // 1. Fetch Total Credits
        const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single()

        if (profile) {
            credits = profile.credits
        }

        // 2. Fetch Companies Found
        const { count } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)

        totalCompanies = count || 0;

        // 3. Fetch Latest Search
        const { data: latestLead } = await supabase
            .from('leads')
            .select('city')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        if (latestLead) {
            latestSearch = latestLead.city || "N/A"
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Credits</p>
                        <h4 className="text-3xl font-bold text-slate-900 mt-2">{credits}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Coins className="w-6 h-6 text-indigo-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Companies Found</p>
                        <h4 className="text-3xl font-bold text-slate-900 mt-2">{totalCompanies}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-emerald-600" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Latest Search</p>
                        <h4 className="text-3xl font-bold text-slate-900 mt-2 truncate max-w-[150px]">{latestSearch}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
