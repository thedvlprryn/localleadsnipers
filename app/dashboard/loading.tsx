import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-slate-500 mt-4 text-sm font-medium">Loading Dashboard...</p>
        </div>
    )
}
