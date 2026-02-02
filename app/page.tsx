import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { Hero } from "@/components/landing/Hero"
import { Logos } from "@/components/landing/Logos"
import { Features } from "@/components/landing/Features"
import { Steps } from "@/components/landing/Steps"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Sticky Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">LeadAim</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 pt-2 transition-colors">Login</Link>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all shadow-md shadow-indigo-500/20">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <Hero />
        <Logos />
        <Features />
        <Pricing />
        <Steps />
        <FAQ />

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
          </div>

          <div className="container px-4 mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Ready to start hunting?
            </h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-10">
              Join thousands of agencies automating their B2B lead generation today.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl border border-indigo-400/30">
              <Link href="/login">
                Get Started for Free
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">L</span>
                </div>
                <span className="font-bold text-slate-900 text-lg">LeadAim</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The #1 B2B lead generation tool for agencies and growth teams. Real-time verification, instant exports.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">GitHub</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2024 LeadAim Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
