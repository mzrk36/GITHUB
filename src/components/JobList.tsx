import { Job } from "@/types/job";
import JobCard from "./JobCard";
import { Loader2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  onJobClick: (job: Job) => void;
}

const JobList = ({ jobs, loading, onJobClick }: JobListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-foreground mb-2">No jobs found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
      ))}
    </div>
  );
};

export default JobList;
