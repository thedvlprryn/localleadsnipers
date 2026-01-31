import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    size?: "sm" | "md" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed",
                    // Size variants
                    size === "sm" && "px-3 py-1.5 text-sm rounded-md",
                    size === "md" && "px-4 py-2 text-sm rounded-lg",
                    size === "lg" && "px-6 py-3 text-base rounded-xl",
                    size === "icon" && "p-2 rounded-lg",
                    // Color variants
                    variant === "primary" && "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm border border-transparent",
                    variant === "secondary" && "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm",
                    variant === "outline" && "bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50",
                    variant === "ghost" && "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    variant === "danger" && "bg-red-600 text-white hover:bg-red-700 shadow-sm",
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
