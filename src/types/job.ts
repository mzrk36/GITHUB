export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  applyLink: string;
  // Additional fields from Supabase
  requirements?: string[];
  benefits?: string[];
  remoteOption?: boolean;
  postedDate?: string;
  applicationDeadline?: string;
  contactEmail?: string;
}
