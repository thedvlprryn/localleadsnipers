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

export interface Lead {
    id: string
    company: string
    location: string
    email?: string | null
    website?: string | null
    phone?: string | null
    status?: string
    rating: number
    review_count: number
    created_at?: string
    address?: string
    category?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    google_maps_url?: string
}

interface LeadsTableClientProps {
    leads: Lead[]
}

export function LeadsTableClient({ leads }: LeadsTableClientProps) {

    const handleExport = () => {
        if (!leads || leads.length === 0) {
            toast.error("No leads to export!")
            return
        }

        // 1. Define CSV Headers
        const headers = [
            "Company Name",
            "Category",
            "Location",
            "Address",
            "Phone",
            "Email",
            "Website",
            "Facebook",
            "Instagram",
            "LinkedIn",
            "Rating",
            "Review Count",
            "Status"
        ]

        // 2. Convert Data to CSV Rows
        const csvContent = [
            headers.join(","), // Header Row
            ...leads.map(lead => {
                // Helper to escape commas and quotes (prevents broken CSVs)
                const safe = (text: string | number | null | undefined) => {
                    if (text === null || text === undefined) return '""'
                    return `"${String(text).replace(/"/g, '""')}"`
                }

                return [
                    safe(lead.company),
                    safe(lead.category),
                    safe(lead.location),
                    safe(lead.address),
                    safe(lead.phone),
                    safe(lead.email),
                    safe(lead.website),
                    safe(lead.facebook),
                    safe(lead.instagram),
                    safe(lead.linkedin),
                    safe(lead.rating),
                    safe(lead.review_count),
                    safe(lead.status)
                ].join(",")
            })
        ].join("\n")

        // 3. Trigger Download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`)
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
                    <table className="w-full text-sm text-left min-w-[1000px]">
                        <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium w-[300px]">Company</th>
                                <th className="px-6 py-4 font-medium w-[200px]">Location</th>
                                <th className="px-6 py-4 font-medium w-[200px]">Contact</th>
                                <th className="px-6 py-4 font-medium">Socials</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {leads.map((lead, index) => (
                                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0 border border-indigo-100">
                                                {(lead.company || "U").charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{lead.company}</span>
                                                {lead.category && (
                                                    <span className="text-xs text-slate-500 truncate max-w-[200px]">{lead.category}</span>
                                                )}
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                    <span className="text-xs font-medium text-slate-700">{lead.rating || "N/A"}</span>
                                                    <span className="text-xs text-slate-400">({lead.review_count || 0})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col max-w-[180px]">
                                            <span className="text-slate-900 font-medium truncate">{lead.location}</span>
                                            {lead.address && lead.address !== lead.location && (
                                                <span className="text-xs text-slate-500 truncate" title={lead.address}>{lead.address}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col space-y-1">
                                            {lead.phone && (
                                                <span className="text-xs text-slate-600 flex items-center gap-1.5">
                                                    📞 {lead.phone}
                                                </span>
                                            )}
                                            {lead.email && (
                                                <span className="text-xs text-slate-600 flex items-center gap-1.5 truncate max-w-[180px]" title={lead.email}>
                                                    ✉️ {lead.email}
                                                </span>
                                            )}
                                            {!lead.phone && !lead.email && <span className="text-xs text-slate-400">No contact info</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* Website Button */}
                                            {lead.website ? (
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50" asChild>
                                                    <a href={lead.website} target="_blank" rel="noopener noreferrer" title="Visit Website">
                                                        <span className="text-lg">🌍</span>
                                                    </a>
                                                </Button>
                                            ) : (
                                                <div className="h-7 w-7 flex items-center justify-center text-slate-200 cursor-not-allowed">
                                                    <span className="text-lg grayscale opacity-30">🌍</span>
                                                </div>
                                            )}

                                            {/* Google Maps Button */}
                                            {lead.google_maps_url ? (
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-green-600 hover:bg-green-50" asChild>
                                                    <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" title="Open in Google Maps">
                                                        <span className="text-lg">📍</span>
                                                    </a>
                                                </Button>
                                            ) : (
                                                <div className="h-7 w-7 flex items-center justify-center text-slate-200 cursor-not-allowed">
                                                    <span className="text-lg grayscale opacity-30">📍</span>
                                                </div>
                                            )}

                                            <div className="w-px h-4 bg-slate-200 mx-1"></div>

                                            {lead.facebook && (
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-[#1877F2] hover:bg-blue-50" asChild>
                                                    <a href={lead.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                                    </a>
                                                </Button>
                                            )}
                                            {lead.instagram && (
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-[#E4405F] hover:bg-pink-50" asChild>
                                                    <a href={lead.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                                    </a>
                                                </Button>
                                            )}
                                            {lead.linkedin && (
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-[#0A66C2] hover:bg-blue-50" asChild>
                                                    <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            </CardContent >
        </Card >
    )
}
