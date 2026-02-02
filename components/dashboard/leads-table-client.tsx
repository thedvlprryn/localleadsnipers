"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Download, Share2, Search, MoreHorizontal, Trash2, Mail } from "lucide-react"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 rounded-lg bg-slate-50/50 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No leads found</h3>
                <p className="text-slate-500 max-w-sm mt-1 text-sm">
                    Your search history is empty. Start a new search to find prospects.
                </p>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-100/50">
                <div className="space-y-1">
                    <CardTitle>My Leads</CardTitle>
                    <CardDescription>Recently scraped businesses ({leads.length}).</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleExport} className="border-slate-200 text-slate-600 hover:bg-slate-50 h-9">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[800px]">
                        <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium w-[300px]">Company</th>
                                <th className="px-6 py-4 font-medium">Location</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Rating</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {leads.map((lead, index) => (
                                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0 border border-indigo-100">
                                                {(lead.business_name || "U").charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-slate-900 block truncate max-w-[200px]">{lead.business_name || "Unknown Company"}</span>
                                                <span className="text-xs text-slate-500 block truncate max-w-[200px]">{lead.industry || "Local Business"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                                        {lead.city || lead.state || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Mock Status Logic based on rating */}
                                        {(lead.rating && lead.rating >= 4.5) ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="font-medium text-slate-700">{lead.rating || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {lead.website && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" asChild>
                                                    <a href={lead.website} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                            )}

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Mail className="mr-2 h-4 w-4" /> Email Company
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
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
