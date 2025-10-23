import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About JobFinder
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              JobFinder is your trusted partner in career advancement. We connect talented
              professionals with their dream opportunities at leading companies worldwide.
              Our platform simplifies the job search process, making it easier than ever to
              find positions that match your skills, experience, and career goals.
            </p>
          </motion.div>
        </div>
      </section>

      <About />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Mission
            </h2>
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <p className="text-muted-foreground leading-relaxed mb-4">
                At JobFinder, we believe that everyone deserves to find meaningful work that
                aligns with their passions and expertise. Our mission is to bridge the gap
                between exceptional talent and outstanding opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to providing a seamless, user-friendly platform that empowers
                job seekers to take control of their career journey while helping companies
                discover the perfect candidates for their teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
