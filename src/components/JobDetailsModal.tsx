import { Job } from "@/types/job";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Briefcase, DollarSign, ExternalLink } from "lucide-react";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailsModal = ({ job, isOpen, onClose }: JobDetailsModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
          <DialogDescription>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-foreground">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-semibold">{job.salary}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Job Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>
        
        <div className="mt-8 flex gap-3">
          <Button
            className="flex-1 bg-gradient-primary hover:opacity-90"
            onClick={() => window.open(job.applyLink, "_blank")}
          >
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
