import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"

export async function LeadsTable() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-slate-500">Please log in to view your leads.</p>
                </CardContent>
            </Card>
        )
    }

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching leads:", error)
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-red-500">Failed to load leads.</p>
                </CardContent>
            </Card>
        )
    }

    if (!leads || leads.length === 0) {
        return (
            <Card>
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Star className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">No leads found</h3>
                    <p className="text-slate-500 max-w-sm mt-2">
                        Start your first search above to find business leads.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Leads</CardTitle>
                <CardDescription>Recently scraped businesses.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {leads.map((lead: any) => (
                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-slate-900 block">{lead.business_name || "Unknown Company"}</span>
                                        <span className="text-xs text-slate-500">{lead.industry || "Local Business"}</span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                        {lead.city || lead.state || "N/A"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium text-slate-900">{lead.rating || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {lead.website ? (
                                            <Button asChild size="sm" variant="outline">
                                                <a href={lead.website} target="_blank" rel="noopener noreferrer">
                                                    Visit Website
                                                    <ExternalLink className="w-3 h-3 ml-2" />
                                                </a>
                                            </Button>
                                        ) : (
                                            <span className="text-slate-400 text-xs italic">No Website</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
