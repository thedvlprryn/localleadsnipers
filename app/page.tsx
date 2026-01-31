import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">LocalLeadSnipers</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 pt-2">Login</Link>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Automate Your <span className="text-indigo-600">B2B Lead Gen</span>.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Find verified local businesses in seconds. Stop manual scraping and start closing more deals today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/login">Get Started for Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
              <Link href="https://github.com/thedvlprryn/localleadsnipers" target="_blank">View on GitHub</Link>
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale">
            {/* Mock logos or placeholders */}
            <div className="font-bold text-xl text-slate-400">ACME Corp</div>
            <div className="font-bold text-xl text-slate-400">Global Tech</div>
            <div className="font-bold text-xl text-slate-400">Nebula Inc</div>
            <div className="font-bold text-xl text-slate-400">Fox Run</div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-50">
        © 2024 LocalLeadSnipers. All rights reserved.
      </footer>
    </div>
  )
}
