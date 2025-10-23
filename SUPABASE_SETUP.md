# Supabase Integration Setup

## Overview
Supabase has been successfully integrated into your JobSpot Connect application alongside Clerk authentication. This provides a powerful backend-as-a-service solution for your job platform.

## What's Been Added

### 1. **Supabase Client Configuration**
- Created `src/lib/supabase.ts` with client setup
- Supports both `VITE_` and `REACT_APP_` environment variable prefixes
- Includes comprehensive TypeScript types for database schema

### 2. **Database Services**
- **Job Service**: CRUD operations for job listings
- **Profile Service**: User profile management
- **Application Service**: Job application tracking
- **File Service**: Resume upload functionality

### 3. **Context Provider**
- `SupabaseProvider` in `src/contexts/SupabaseContext.tsx`
- Manages authentication state and provides database access
- Integrated with existing Clerk authentication

### 4. **Enhanced Job Functionality**
- Updated `fetchJobs` utility to use Supabase with Google Sheets fallback
- Enhanced Job type with additional Supabase fields
- Search functionality for jobs

### 5. **Database Schema**
The following tables are expected in your Supabase database:

#### `jobs` table:
```sql
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  salary_min INTEGER,
  salary_max INTEGER,
  employment_type TEXT DEFAULT 'Full-time',
  remote_option BOOLEAN DEFAULT false,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  application_deadline TIMESTAMP WITH TIME ZONE,
  contact_email TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `user_profiles` table:
```sql
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  experience_level TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `job_applications` table:
```sql
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  job_id UUID NOT NULL REFERENCES jobs(id),
  status TEXT DEFAULT 'applied',
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);
```

## Environment Setup

Make sure your `.env` file contains:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Or alternatively:
```
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Database Setup Instructions

### 1. **Create Tables in Supabase**
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands above to create the tables

### 2. **Set up Row Level Security (RLS)**
```sql
-- Enable RLS on all tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Jobs: Allow everyone to read, only authenticated users to write
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (true);
CREATE POLICY "Jobs are insertable by authenticated users" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- User profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid()::text = user_id);

-- Job applications: Users can only access their own applications
CREATE POLICY "Users can view own applications" ON job_applications FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own applications" ON job_applications FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own applications" ON job_applications FOR UPDATE USING (auth.uid()::text = user_id);
```

### 3. **Set up Storage Bucket (for resumes)**
1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `resumes`
3. Set it to public if you want public access to resumes

## Features Available

### ✅ **Job Management**
- Fetch jobs from Supabase database
- Search jobs by title, company, description
- Filter by location
- Fallback to Google Sheets if Supabase fails

### ✅ **User Profiles**
- Create and update user profiles
- Store skills, experience, contact info
- Resume upload functionality

### ✅ **Job Applications**
- Track job applications
- Store cover letters and resume URLs
- Application status management

### ✅ **Authentication Integration**
- Works alongside Clerk authentication
- User-specific data access
- Secure API calls

## Testing the Integration

1. **Visit the Dashboard**: Go to `/dashboard` after signing in
2. **Check Database Status**: The dashboard includes a Supabase connection test
3. **Test Job Loading**: Visit `/jobs` to see jobs loaded from Supabase
4. **Verify Environment Variables**: The test component shows which variables are set

## API Usage Examples

### Fetch Jobs
```typescript
import { jobService } from '@/services/database';

// Get all jobs
const jobs = await jobService.getAllJobs();

// Search jobs
const searchResults = await jobService.searchJobs('developer', 'remote');
```

### User Profile Management
```typescript
import { profileService } from '@/services/database';

// Create or update profile
const profile = await profileService.upsertUserProfile({
  user_id: 'user123',
  full_name: 'John Doe',
  email: 'john@example.com',
  skills: ['React', 'TypeScript', 'Node.js']
});
```

### Job Applications
```typescript
import { applicationService } from '@/services/database';

// Apply for a job
const application = await applicationService.applyForJob({
  user_id: 'user123',
  job_id: 'job-uuid',
  cover_letter: 'I am interested in this position...'
});
```

## Next Steps

1. **Set up your Supabase database** with the provided SQL schema
2. **Configure Row Level Security** for data protection
3. **Add sample data** to test the functionality
4. **Customize the database schema** based on your specific needs
5. **Implement additional features** like job posting, company profiles, etc.

## Troubleshooting

### Common Issues:
- **Connection failed**: Check your environment variables
- **Table doesn't exist**: Run the SQL schema creation commands
- **Permission denied**: Check your RLS policies
- **Jobs not loading**: Verify the `jobs` table has data

The integration provides a solid foundation for building a full-featured job platform with user management, job listings, and application tracking!
