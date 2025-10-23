import { Job } from "@/types/job";
import { jobService } from "@/services/database";

// Legacy Google Sheets function (kept for fallback)
const SHEET_ID = "1GMraEjH5o-ngXmgbozb_PPzc1jJVUJ7Io0epzkXnue4";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export async function fetchJobsFromSheet(): Promise<Job[]> {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Parse Google Sheets JSON response (it's wrapped in a function call)
    const jsonString = text.substring(47).slice(0, -2);
    const data = JSON.parse(jsonString);
    
    const rows = data.table.rows;
    
    // Skip header row and map to Job objects
    // Columns: A=Title, B=Company, E=Location, F=Type, G=Salary (skip C, D)
    const jobs: Job[] = rows.slice(1).map((row: any, index: number) => {
      const cells = row.c;
      
      return {
        id: `job-${index}`,
        title: cells[0]?.v || "Untitled Position",
        company: cells[1]?.v || "Company Name",
        location: cells[4]?.v || "Remote", // Column E (index 4)
        type: cells[5]?.v || "Full-time", // Column F (index 5)
        salary: cells[6]?.v || "Competitive", // Column G (index 6)
        description: cells[0]?.v ? `Join ${cells[1]?.v || "our team"} as a ${cells[0]?.v}. We're looking for talented individuals to help us grow.` : "",
        applyLink: cells[7]?.v || "#", // Column H if available
      };
    }).filter((job: Job) => job.title && job.company);
    
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs from Google Sheets:", error);
    return [];
  }
}

// New Supabase-based function
export async function fetchJobsFromSupabase(): Promise<Job[]> {
  try {
    const supabaseJobs = await jobService.getAllJobs();
    
    // Convert Supabase job format to our Job interface
    const jobs: Job[] = supabaseJobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.employment_type,
      salary: job.salary_min && job.salary_max 
        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
        : job.salary_min 
        ? `$${job.salary_min.toLocaleString()}+`
        : "Competitive",
      description: job.description,
      applyLink: job.website_url || "#",
      requirements: job.requirements,
      benefits: job.benefits,
      remoteOption: job.remote_option,
      postedDate: job.posted_date,
      applicationDeadline: job.application_deadline,
      contactEmail: job.contact_email,
    }));
    
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs from Supabase:", error);
    // Fallback to Google Sheets if Supabase fails
    return fetchJobsFromSheet();
  }
}

// Main function that tries Supabase first, falls back to Google Sheets
export async function fetchJobs(): Promise<Job[]> {
  try {
    return await fetchJobsFromSupabase();
  } catch (error) {
    console.error("Supabase fetch failed, falling back to Google Sheets:", error);
    return fetchJobsFromSheet();
  }
}

// Search jobs function
export async function searchJobs(query: string, location?: string): Promise<Job[]> {
  try {
    const supabaseJobs = await jobService.searchJobs(query, location);
    
    // Convert Supabase job format to our Job interface
    const jobs: Job[] = supabaseJobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.employment_type,
      salary: job.salary_min && job.salary_max 
        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
        : job.salary_min 
        ? `$${job.salary_min.toLocaleString()}+`
        : "Competitive",
      description: job.description,
      applyLink: job.website_url || "#",
      requirements: job.requirements,
      benefits: job.benefits,
      remoteOption: job.remote_option,
      postedDate: job.posted_date,
      applicationDeadline: job.application_deadline,
      contactEmail: job.contact_email,
    }));
    
    return jobs;
  } catch (error) {
    console.error("Error searching jobs:", error);
    return [];
  }
}
