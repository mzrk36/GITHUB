import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobList from "@/components/JobList";
import JobDetailsModal from "@/components/JobDetailsModal";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Job } from "@/types/job";
import { fetchJobsFromSheet } from "@/utils/fetchJobs";

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    const fetchedJobs = await fetchJobsFromSheet();
    setJobs(fetchedJobs);
    setFilteredJobs(fetchedJobs);
    setLoading(false);
  };

  const handleSearch = (keyword: string, location: string) => {
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
      <Hero onSearch={handleSearch} />
      
      <section id="jobs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Job Openings
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse through {filteredJobs.length} available positions
            </p>
          </div>
          
          <JobList
            jobs={filteredJobs}
            loading={loading}
            onJobClick={handleJobClick}
          />
        </div>
      </section>

      <About />
      <Footer />
      
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
