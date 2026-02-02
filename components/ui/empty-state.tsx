import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    actionLabel?: string
    onAction?: () => void
    actionHref?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, actionHref }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-slate-500 max-w-sm mb-6 text-sm">{description}</p>
            {actionLabel && (
                <Button onClick={onAction} asChild={!!actionHref}>
                    {actionHref ? <a href={actionHref}>{actionLabel}</a> : actionLabel}
                </Button>
            )}
        </div>
    )
}
