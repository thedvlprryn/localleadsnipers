import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { LeadsTableClient } from "@/components/dashboard/leads-table-client"

export async function LeadsTable() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-slate-500">Please log in to view your leads.</p>
                </CardContent>
            </Card>
        )
    }

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching leads:", error)
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-center text-red-500">Failed to load leads.</p>
                </CardContent>
            </Card>
        )
    }

    return <LeadsTableClient leads={leads || []} />
}
