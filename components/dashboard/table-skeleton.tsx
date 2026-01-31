import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function TableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                        <div className="flex justify-between">
                            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                        </div>
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-4 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                                <div className="h-3 w-20 bg-slate-50 rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
                            <div className="h-8 w-24 bg-slate-100 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
