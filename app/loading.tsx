
import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">
                    Loading your workspace...
                </p>
            </div>
        </div>
    )
}
