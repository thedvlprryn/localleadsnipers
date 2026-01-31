import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-black text-slate-200">404</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Lost in the data?</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        We couldn't find the page you're looking for. Let's get you back to hunting for leads.
                    </p>
                </div>
                <Button asChild size="lg" className="h-12 px-8">
                    <Link href="/dashboard">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}
