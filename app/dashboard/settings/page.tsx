"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, CreditCard, Key, Bell, Shield } from "lucide-react"
import { useState } from "react"

const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general")

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-slate-500">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${activeTab === tab.id
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile</CardTitle>
                                    <CardDescription>
                                        This is how others will see you on the site.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" placeholder="johndoe" defaultValue="rayen_dev" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="john@example.com" defaultValue="rayen@leadaim.com" disabled />
                                    </div>
                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appearance</CardTitle>
                                    <CardDescription>
                                        Customize the look of the dashboard.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Dark Mode</Label>
                                            <p className="text-sm text-slate-500">Use dark theme for the dashboard</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    {activeTab === "billing" && (
                        <div className="space-y-6">
                            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CreditCard className="h-5 w-5 text-amber-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-amber-800">Free Plan Active</h3>
                                        <div className="mt-2 text-sm text-amber-700">
                                            <p>You are currently on the free plan with limited credits.</p>
                                        </div>
                                        <div className="mt-4">
                                            <Button size="sm" variant="outline" className="border-amber-200 bg-white text-amber-800 hover:bg-amber-50">
                                                Upgrade to Pro
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "api" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>API Keys</CardTitle>
                                    <CardDescription>
                                        Manage your API keys for external access.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Secret Key</Label>
                                        <div className="flex gap-2">
                                            <Input readOnly type="password" value="sk_live_xxxxxxxxxxxxxxxx" className="font-mono text-xs" />
                                            <Button variant="outline">Reveal</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>
                                        Configure how you receive alerts.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                                            <span>Email Notifications</span>
                                            <span className="font-normal leading-snug text-slate-500">
                                                Receive emails about new leads.
                                            </span>
                                        </Label>
                                        <Switch id="email-notifs" defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
