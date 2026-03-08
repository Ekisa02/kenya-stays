import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties, kenyanCities, type PropertyType } from "@/data/properties";

const propertyTypes: PropertyType[] = ["House", "Apartment", "Hotel", "Guesthouse"];
const amenityOptions = ["WiFi", "Pool", "Parking", "Kitchen", "Air Conditioning", "Gym", "Beach Access", "Spa"];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";

  const [city, setCity] = useState(initialCity);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleType = (type: PropertyType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (city && !p.city.toLowerCase().includes(city.toLowerCase()) && !p.location.toLowerCase().includes(city.toLowerCase())) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => p.amenities.includes(a))) return false;
      return true;
    });
  }, [city, priceRange, selectedTypes, selectedAmenities]);

  const activeFilterCount = (city ? 1 : 0) + (selectedTypes.length > 0 ? 1 : 0) + (selectedAmenities.length > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* City selector */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All cities</option>
            {kenyanCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Property type pills */}
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedTypes.includes(type)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/30"
              }`}
            >
              {type}
            </button>
          ))}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-auto flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price range: ${priceRange[0]} – ${priceRange[1]}+
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="range" min="0" max="500" step="10"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="flex-1 accent-primary"
                    />
                    <input
                      type="range" min="0" max="500" step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1 accent-primary"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {amenityOptions.map((a) => (
                      <button
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedAmenities.includes(a)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary/30"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setCity(""); setPriceRange([0, 500]); setSelectedTypes([]); setSelectedAmenities([]); }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "stay" : "stays"} found
          {city ? ` in ${city}` : " across Kenya"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-xl font-semibold text-foreground mb-2">No stays found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search a different city</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
