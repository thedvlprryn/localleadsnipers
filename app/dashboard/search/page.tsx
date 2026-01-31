import { SearchForm } from "@/components/dashboard/search-form"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Suspense } from "react"

export default function SearchPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Lead Search</h1>
                <p className="text-slate-500 mt-1">Find and manage your local business leads.</p>
            </div>

            {/* Analytics Section */}
            <Suspense fallback={<div className="h-32 bg-slate-100 rounded-xl animate-pulse" />}>
                <DashboardStats />
            </Suspense>

            {/* Search Section */}
            <SearchForm />

            {/* Results Section */}
            <Suspense fallback={<TableSkeleton />}>
                <LeadsTable />
            </Suspense>
        </div>
    )
}
