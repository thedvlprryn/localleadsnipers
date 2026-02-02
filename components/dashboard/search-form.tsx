"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2, MapPin, Search as SearchIcon, X, Clock } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SearchForm() {
    const [keyword, setKeyword] = useState("")
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

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
        try {
            const response = await fetch("/api/n8n/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword, city }),
            })

            if (!response.ok) throw new Error("Search failed")

            toast.success("Search started! We'll notify you when leads are ready.")
            router.refresh()
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
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
                <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 overflow-hidden h-14">
                    {/* Keyword Input */}
                    <div className="flex-1 flex items-center px-4">
                        <SearchIcon className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                        <div className="flex-1">
                            <Label htmlFor="keyword" className="sr-only">Keyword</Label>
                            <input
                                id="keyword"
                                className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-500 focus:ring-0 text-sm font-medium outline-none h-full"
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
                            <input
                                id="city"
                                className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-500 focus:ring-0 text-sm font-medium outline-none h-full"
                                placeholder="Where? (e.g. London)"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        {/* Clear Button (optional logic could go here) */}
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
        </div>
    )
}
