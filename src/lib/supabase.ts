import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          description: string
          requirements: string[]
          benefits: string[]
          salary_min: number | null
          salary_max: number | null
          employment_type: string
          remote_option: boolean
          posted_date: string
          application_deadline: string | null
          contact_email: string | null
          website_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          description: string
          requirements?: string[]
          benefits?: string[]
          salary_min?: number | null
          salary_max?: number | null
          employment_type?: string
          remote_option?: boolean
          posted_date?: string
          application_deadline?: string | null
          contact_email?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          description?: string
          requirements?: string[]
          benefits?: string[]
          salary_min?: number | null
          salary_max?: number | null
          employment_type?: string
          remote_option?: boolean
          posted_date?: string
          application_deadline?: string | null
          contact_email?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          email: string
          phone: string | null
          location: string | null
          bio: string | null
          skills: string[]
          experience_level: string | null
          resume_url: string | null
          linkedin_url: string | null
          github_url: string | null
          portfolio_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          email: string
          phone?: string | null
          location?: string | null
          bio?: string | null
          skills?: string[]
          experience_level?: string | null
          resume_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          location?: string | null
          bio?: string | null
          skills?: string[]
          experience_level?: string | null
          resume_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          user_id: string
          job_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          applied_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
