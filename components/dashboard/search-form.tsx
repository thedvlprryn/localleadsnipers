"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2, MapPin, Search as SearchIcon, X, Clock, Database, UserPlus, FileWarning, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LeadsTableClient, Lead } from "@/components/dashboard/leads-table-client"
import { Card, CardContent } from "@/components/ui/card"

interface SearchStats {
    total_scraped: number
    new_leads: number
    duplicate_leads_skipped: number
    credits_used: number
    credits_remaining: number
}

export function SearchForm() {
    const [keyword, setKeyword] = useState("")
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(false)
    const [leads, setLeads] = useState<Lead[] | null>(null)
    const [stats, setStats] = useState<SearchStats | null>(null)

    const router = useRouter()
    const supabase = createClient()

    const recentSearches = [
        "Dentists in London",
        "Gyms in New York",
        "Coffee Shops in Paris"
    ]

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!keyword || !city) {
            toast.error("Please fill in both fields")
            return
        }

        setLoading(true)
        setLeads([]) // Clear the table immediately
        setStats(null)

        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                toast.error("Please log in to search.")
                router.push("/login")
                return
            }

            const token = session.access_token

            const response = await fetch("/api/n8n/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ keyword, city }),
            })

            if (response.status === 401 || response.status === 403) {
                toast.error("Your session has timed out. Please refresh the page.")
                // Optional: redirect to login if session is truly invalid, but user might just need refresh
                // router.push("/login") 
                return
            }

            if (!response.ok) throw new Error("Search failed")

            const data = await response.json()
            console.log("[SearchForm] Raw Response:", data)

            if (data.success && data.data) {
                toast.success(data.message || "Leads found!")

                // Robust parsing for leads
                const rawLeads = data.data.leads || []
                const safeLeads: Lead[] = rawLeads.map((lead: any) => ({
                    id: lead.id || lead.place_id || Math.random().toString(),

                    // 🟢 CORE DATA (No Fallbacks)
                    company: lead.company_name || lead.business_name || 'Unknown Business',
                    location: lead.city || '',

                    // 🟢 CONTACT INFO (Strict Verification)
                    // If phone is too short or missing, set to null
                    phone: (lead.phone && lead.phone.length > 6) ? lead.phone : null,

                    // Check if email looks valid
                    email: (lead.email && lead.email.includes('@')) ? lead.email : null,

                    // 🟢 LINKS
                    // Ensure we use the specific map URL from the backend
                    google_maps_url: lead.google_maps_url || null,
                    website: (lead.website && lead.website.startsWith('http')) ? lead.website : null,
                    address: lead.address || null,
                    category: lead.category || null,

                    // 🟢 SOCIALS
                    facebook: lead.facebook || null,
                    instagram: lead.instagram || null,
                    linkedin: lead.linkedin || null,

                    rating: Number(lead.rating) || 0,
                    review_count: Number(lead.review_count) || 0,
                    status: 'Verified',
                    created_at: lead.created_at || new Date().toISOString()
                }))

                setLeads(safeLeads)
                setStats(data.data.statistics || null)
                router.refresh()
            } else {
                toast.success("Search started! We'll notify you when leads are ready.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Could not connect to search service.")
        } finally {
            setLoading(false)
        }
    }

    const fillSearch = (text: string) => {
        const [k, c] = text.split(" in ")
        if (k && c) {
            setKeyword(k)
            setCity(c)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 overflow-hidden h-14">
                        {/* Keyword Input */}
                        <div className="flex-1 flex items-center px-4">
                            <SearchIcon className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                            <div className="flex-1">
                                <Label htmlFor="keyword" className="sr-only">Keyword</Label>
                                <Input
                                    id="keyword"
                                    className="w-full bg-transparent border-none shadow-none focus-visible:ring-0 text-slate-900 placeholder:text-slate-500 text-sm font-medium h-full px-0"
                                    placeholder="What are you looking for? (e.g. Dentists)"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-slate-200"></div>

                        {/* City Input */}
                        <div className="flex-1 flex items-center px-4 relative">
                            <MapPin className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                            <div className="flex-1">
                                <Label htmlFor="city" className="sr-only">City</Label>
                                <Input
                                    id="city"
                                    className="w-full bg-transparent border-none shadow-none focus-visible:ring-0 text-slate-900 placeholder:text-slate-500 text-sm font-medium h-full px-0"
                                    placeholder="Where? (e.g. London)"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pr-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                size="icon"
                                className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-10 h-10 shrink-0"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Recent Searches Chips */}
                {!leads && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {recentSearches.map((search, i) => (
                            <button
                                key={i}
                                onClick={() => fillSearch(search)}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                            >
                                <Clock className="w-3 h-3 mr-1.5 text-slate-400" />
                                {search}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Section */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <div className="p-2 bg-indigo-50 rounded-full mb-2">
                                <Database className="w-4 h-4 text-indigo-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">Total Scraped</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.total_scraped}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <div className="p-2 bg-emerald-50 rounded-full mb-2">
                                <UserPlus className="w-4 h-4 text-emerald-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">New Leads</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.new_leads}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <div className="p-2 bg-amber-50 rounded-full mb-2">
                                <FileWarning className="w-4 h-4 text-amber-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">Duplicates</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.duplicate_leads_skipped}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <div className="p-2 bg-slate-100 rounded-full mb-2">
                                <CreditCard className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">Credits Left</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.credits_remaining}</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {leads && leads.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <LeadsTableClient leads={leads} />
                </div>
            )}
        </div>
    )
}
