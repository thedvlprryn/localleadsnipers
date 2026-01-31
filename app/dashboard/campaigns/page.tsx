import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus } from "lucide-react"

export default function CampaignsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
                    <p className="text-slate-500">Manage your outreach campaigns and automations.</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                    <CardDescription>You have no active campaigns running.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <Megaphone className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No campaigns yet</h3>
                        <p className="text-slate-500 max-w-sm mb-6">
                            Start reaching out to your leads automatically. Create a new campaign to setup email sequences.
                        </p>
                        <Button variant="outline">Create your first campaign</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
