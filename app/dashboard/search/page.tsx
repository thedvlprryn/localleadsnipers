import { SearchForm } from "@/components/dashboard/search-form"
import { EmptyState } from "@/components/ui/empty-state"
import { Search } from "lucide-react"

export default function SearchPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                    Find your next <span className="text-indigo-600">big client</span>.
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Search through millions of verified local businesses to find your ideal prospects in seconds.
                </p>
            </div>

            <SearchForm />

            <div className="w-full max-w-sm mx-auto opacity-50">
                {/* 
                  Using the EmptyState purely as a visual placeholder here if needed, 
                  but typically this page starts "empty". 
                  We can put a placeholder graphic below.
                */}
            </div>
        </div>
    )
}
