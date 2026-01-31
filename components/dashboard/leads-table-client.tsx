"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Download, Share2, Search } from "lucide-react"
import { toast } from "sonner"

interface Lead {
    id: string
    business_name: string | null
    industry: string | null
    city: string | null
    state: string | null
    rating: number | null
    website: string | null
    created_at: string
}

interface LeadsTableClientProps {
    leads: Lead[]
}

export function LeadsTableClient({ leads }: LeadsTableClientProps) {

    const handleExport = () => {
        if (!leads || leads.length === 0) return

        // Create CSV Header
        const headers = ["Company", "Industry", "Location", "Rating", "Website", "Created At"]

        // Create CSV Rows
        const rows = leads.map(lead => [
            `"${lead.business_name || ''}"`,
            `"${lead.industry || ''}"`,
            `"${lead.city || ''} ${lead.state || ''}"`,
            `"${lead.rating || ''}"`,
            `"${lead.website || ''}"`,
            `"${lead.created_at || ''}"`
        ])

        const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")

        // Create Blob and Download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `leads-export-${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success("Leads exported successfully")
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied! Share this tool.")
    }

    if (!leads || leads.length === 0) {
        return (
            <Card>
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-200" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Ready to hunt?</h3>
                    <p className="text-slate-500 max-w-sm mt-2">
                        Enter a city above to start finding leads.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle>My Leads</CardTitle>
                    <CardDescription>Recently scraped businesses ({leads.length}).</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleExport} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Mobile Responsive Container */}
                <div className="rounded-md border border-slate-200 overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[600px]">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Company</th>
                                <th className="px-4 py-3 whitespace-nowrap">Location</th>
                                <th className="px-4 py-3 whitespace-nowrap">Rating</th>
                                <th className="px-4 py-3 text-right whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-slate-900 block truncate max-w-[200px]">{lead.business_name || "Unknown Company"}</span>
                                        <span className="text-xs text-slate-500 block truncate max-w-[200px]">{lead.industry || "Local Business"}</span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                                        {lead.city || lead.state || "N/A"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium text-slate-900">{lead.rating || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                        {lead.website ? (
                                            <Button asChild size="sm" variant="outline" className="h-8">
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
