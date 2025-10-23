import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobList from "@/components/JobList";
import JobDetailsModal from "@/components/JobDetailsModal";
import Footer from "@/components/Footer";
import { Job } from "@/types/job";
import { fetchJobs } from "@/utils/fetchJobs";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [keyword, location, jobs]);

  const loadJobs = async () => {
    setLoading(true);
    const fetchedJobs = await fetchJobs();
    setJobs(fetchedJobs);
    setFilteredJobs(fetchedJobs);
    setLoading(false);
  };

  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      const matchesKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase());
      const matchesLocation =
        !location || job.location.toLowerCase().includes(location.toLowerCase());
      return matchesKeyword && matchesLocation;
    });
    setFilteredJobs(filtered);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            All Job Openings
          </h1>
          
          <div className="max-w-4xl mx-auto bg-card p-6 rounded-2xl shadow-card mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>

          <JobList
            jobs={filteredJobs}
            loading={loading}
            onJobClick={handleJobClick}
          />
        </div>
      </section>

      <Footer />
      
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Jobs;
