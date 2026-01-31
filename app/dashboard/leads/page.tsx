import { LeadsTable } from "@/components/dashboard/leads-table"

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">My Leads</h1>
                <p className="text-slate-500 mt-1">Manage and export your collected leads.</p>
            </div>
            <LeadsTable />
        </div>
    )
}
