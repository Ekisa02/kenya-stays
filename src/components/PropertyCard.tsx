import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/property/${property.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <button
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm transition-colors hover:bg-background"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-foreground" />
          </button>
          <div className="absolute left-3 top-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
            {property.type}
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-body text-sm font-semibold text-foreground truncate pr-2">
              {property.location}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
              <span className="text-sm font-medium text-foreground">{property.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate">{property.title}</p>
          <p className="text-sm text-muted-foreground">
            {property.guests} guests · {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""} · {property.bathrooms} bath{property.bathrooms > 1 ? "s" : ""}
          </p>
          <p className="text-sm text-foreground">
            <span className="font-semibold">${property.price}</span>{" "}
            <span className="text-muted-foreground">/ night</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
