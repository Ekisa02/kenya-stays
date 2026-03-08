import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-kenya.jpg";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties, kenyanCities } from "@/data/properties";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Kenya coastline" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        </div>
        <div className="relative container mx-auto px-4 pt-20 pb-32 md:pt-28 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-4 drop-shadow-lg">
              Discover Kenya
            </h1>
            <p className="font-body text-lg md:text-xl text-card/90 max-w-xl mx-auto drop-shadow">
              From coastal villas to savanna lodges — find your perfect stay in the heart of East Africa
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Explore Cities */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Explore Kenya
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {kenyanCities.map((city) => (
            <Link
              key={city}
              to={`/search?city=${city}`}
              className="flex items-center gap-2 shrink-0 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-card transition-all hover:shadow-card-hover hover:border-primary/30"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Featured Stays
        </h2>
        <p className="text-muted-foreground mb-8">
          Hand-picked properties loved by travelers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-primary p-10 md:p-16 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            Share your space with the world
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            List your property on StayKenya and earn income while sharing Kenya's beauty with travelers from around the globe.
          </p>
          <button className="rounded-xl bg-background text-foreground px-8 py-3 font-semibold text-sm transition-transform hover:scale-105 active:scale-95">
            Start Hosting
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
