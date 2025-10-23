import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'

type Job = Database['public']['Tables']['jobs']['Row']
type JobInsert = Database['public']['Tables']['jobs']['Insert']
type JobUpdate = Database['public']['Tables']['jobs']['Update']

type UserProfile = Database['public']['Tables']['user_profiles']['Row']
type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']

type JobApplication = Database['public']['Tables']['job_applications']['Row']
type JobApplicationInsert = Database['public']['Tables']['job_applications']['Insert']

// Job Services
export const jobService = {
  // Get all jobs
  async getAllJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get job by ID
  async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Search jobs
  async searchJobs(query: string, location?: string): Promise<Job[]> {
    let queryBuilder = supabase
      .from('jobs')
      .select('*')
      .or(`title.ilike.%${query}%,company.ilike.%${query}%,description.ilike.%${query}%`)
    
    if (location) {
      queryBuilder = queryBuilder.ilike('location', `%${location}%`)
    }
    
    const { data, error } = await queryBuilder.order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Create job (admin only)
  async createJob(job: JobInsert): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .insert(job)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update job (admin only)
  async updateJob(id: string, updates: JobUpdate): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete job (admin only)
  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// User Profile Services
export const profileService = {
  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Create user profile
  async createUserProfile(profile: UserProfileInsert): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Upsert user profile (create or update)
  async upsertUserProfile(profile: UserProfileInsert): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile, { onConflict: 'user_id' })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Job Application Services
export const applicationService = {
  // Get user's applications
  async getUserApplications(userId: string): Promise<JobApplication[]> {
    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        jobs (
          id,
          title,
          company,
          location
        )
      `)
      .eq('user_id', userId)
      .order('applied_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Apply for job
  async applyForJob(application: JobApplicationInsert): Promise<JobApplication> {
    const { data, error } = await supabase
      .from('job_applications')
      .insert(application)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Check if user has applied for job
  async hasUserApplied(userId: string, jobId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('job_applications')
      .select('id')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },

  // Update application status
  async updateApplicationStatus(applicationId: string, status: string): Promise<JobApplication> {
    const { data, error } = await supabase
      .from('job_applications')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// File Upload Services
export const fileService = {
  // Upload resume
  async uploadResume(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/resume.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Delete resume
  async deleteResume(userId: string): Promise<void> {
    const { error } = await supabase.storage
      .from('resumes')
      .remove([`${userId}/resume.pdf`])
    
    if (error) throw error
  }
}
