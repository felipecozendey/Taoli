import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface UpdateAccessData {
  role: string
  is_nutritionist: boolean
  is_trainer: boolean
  is_psychologist: boolean
}

export interface DashboardMetrics {
  totalUsers: number
  totalProfessionals: number
  totalClients: number
  totalLinks: number
}

export interface AuditLog {
  id: string
  action: string
  details: any
  created_at: string
  admin: { name: string | null; email: string | null } | null
  target_user: { name: string | null; email: string | null } | null
}

/**
 * Fetches platform-wide statistics using optimized database count queries.
 */
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const [usersRes, profsRes, clientsRes, linksRes] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'professional'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
      supabase
        .from('professional_client_links')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
    ])

    if (usersRes.error) throw usersRes.error
    if (profsRes.error) throw profsRes.error
    if (clientsRes.error) throw clientsRes.error
    if (linksRes.error) throw linksRes.error

    return {
      totalUsers: usersRes.count || 0,
      totalProfessionals: profsRes.count || 0,
      totalClients: clientsRes.count || 0,
      totalLinks: linksRes.count || 0,
    }
  } catch (error: any) {
    console.error('Error fetching dashboard metrics:', error)
    throw new Error(error.message || 'Failed to fetch dashboard metrics')
  }
}

/**
 * Fetches all user profiles from the database, ordered by creation date (newest first).
 */
export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error: any) {
    console.error('Error fetching all profiles:', error)
    throw new Error(error.message || 'Failed to fetch profiles')
  }
}

/**
 * Updates a specific user's role and specialties in the database.
 */
export const updateUserAccess = async (userId: string, data: UpdateAccessData): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        role: data.role,
        is_nutritionist: data.is_nutritionist,
        is_trainer: data.is_trainer,
        is_psychologist: data.is_psychologist,
      })
      .eq('id', userId)

    if (error) throw error
  } catch (error: any) {
    console.error('Error updating user access:', error)
    throw new Error(error.message || 'Failed to update user access')
  }
}

/**
 * Fetches audit logs including the admin and target user information.
 */
export const getAuditLogs = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<{ data: AuditLog[]; count: number }> => {
  try {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('audit_logs')
      .select(
        `
        id,
        action,
        details,
        created_at,
        admin:profiles!audit_logs_admin_id_fkey(name, email),
        target_user:profiles!audit_logs_target_user_id_fkey(name, email)
      `,
        { count: 'exact' },
      )
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    // Workaround for Supabase type generation with joined foreign keys
    return {
      data: (data as unknown as AuditLog[]) || [],
      count: count || 0,
    }
  } catch (error: any) {
    console.error('Error fetching audit logs:', error)
    throw new Error(error.message || 'Failed to fetch audit logs')
  }
}
