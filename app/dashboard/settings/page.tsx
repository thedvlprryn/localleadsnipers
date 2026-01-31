import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" disabled value="user@example.com" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage your API keys for external integrations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900">Production Key</p>
                            <p className="text-sm text-slate-500 font-mono">pk_live_........................</p>
                        </div>
                        <Button variant="outline" size="sm">Reveal</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
