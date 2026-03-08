import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { kenyanCities } from "@/data/properties";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();

  const filteredCities = kenyanCities.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl border border-border bg-card shadow-hero overflow-hidden">
        {/* Location */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Where</label>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search destinations"
              value={city}
              onChange={(e) => { setCity(e.target.value); setShowCities(true); }}
              onFocus={() => setShowCities(true)}
              onBlur={() => setTimeout(() => setShowCities(false), 200)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          {showCities && filteredCities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-border bg-card shadow-card-hover p-2"
            >
              {filteredCities.map((c) => (
                <button
                  key={c}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  onMouseDown={() => { setCity(c); setShowCities(false); }}
                >
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {c}, Kenya
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Check In */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Check in</label>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Add dates</span>
          </div>
        </div>

        {/* Check Out */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Check out</label>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Add dates</span>
          </div>
        </div>

        {/* Guests + Search */}
        <div className="flex items-center gap-3 p-4">
          <div className="flex-1 cursor-pointer">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Guests</label>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add guests</span>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
