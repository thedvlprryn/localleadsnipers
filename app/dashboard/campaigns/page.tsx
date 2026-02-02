"use client"

import { EmptyState } from "@/components/ui/empty-state"
import { Megaphone } from "lucide-react"
import { toast } from "sonner"

export default function CampaignsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
                <p className="text-slate-500 mt-1">Manage your outreach campaigns.</p>
            </div>

            <div className="min-h-[400px] flex items-center justify-center">
                <div className="max-w-md w-full">
                    <EmptyState
                        icon={Megaphone}
                        title="No campaigns yet"
                        description="Create your first campaign to start reaching out to leads automatically."
                        actionLabel="Create Campaign"
                        onAction={() => toast("Campaign wizard coming soon!")}
                    />
                </div>
            </div>
        </div>
    )
}
