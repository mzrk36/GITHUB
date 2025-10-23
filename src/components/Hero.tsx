import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface HeroProps {
  onSearch: (keyword: string, location: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("keyword") as string;
    const location = formData.get("location") as string;
    onSearch(keyword, location);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Next{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            Discover thousands of job openings from top companies worldwide
          </p>
          
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl shadow-card-hover">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="keyword"
                  placeholder="Job title, keywords, or company"
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="location"
                  placeholder="City, state, or remote"
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" className="h-12 px-8 bg-gradient-primary hover:opacity-90">
                Search Jobs
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
