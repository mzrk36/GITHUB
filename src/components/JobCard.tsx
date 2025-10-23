import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="h-full cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 border-border/50"
        onClick={onClick}
      >
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
            {job.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-sm">{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{job.salary}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              window.open(job.applyLink, "_blank");
            }}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JobCard;
