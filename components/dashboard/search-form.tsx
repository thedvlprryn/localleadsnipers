"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function SearchForm() {
    const [keyword, setKeyword] = useState("")
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!keyword || !city) {
            toast.error("Please fill in both keyword and city")
            return
        }

        try {
            setLoading(true)

            // Get current user
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error("You must be logged in to search")
                setLoading(false)
                return
            }

            // Send to N8N Webhook
            const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    keyword: keyword,
                    city: city,
                }),
            })

            if (response.ok) {
                toast.success("Leads found!")
                setKeyword("")
                setCity("")
                router.refresh()
            } else if (response.status === 402) {
                toast.error("Insufficient Credits")
            } else {
                toast.error("Search failed")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while communicating with the server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find New Leads</CardTitle>
                <CardDescription>Enter a niche and location to start scraping local business leads.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSearch} className="flex gap-4 items-end">
                    <div className="space-y-2 flex-1">
                        <label htmlFor="keyword" className="text-sm font-medium text-slate-700">Keyword (Niche)</label>
                        <Input
                            id="keyword"
                            placeholder="e.g. Dentists, Plumbers"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2 flex-1">
                        <label htmlFor="city" className="text-sm font-medium text-slate-700">City / Location</label>
                        <Input
                            id="city"
                            placeholder="e.g. San Francisco, CA"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-40">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-2" />
                                Find Leads
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
