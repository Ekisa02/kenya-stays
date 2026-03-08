import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Share, Wifi, Car, Waves, Dumbbell, UtensilsCrossed, Wind, Users, Bed, Bath } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";
import { properties, reviews } from "@/data/properties";

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  Pool: <Waves className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
  Kitchen: <UtensilsCrossed className="h-5 w-5" />,
  "Air Conditioning": <Wind className="h-5 w-5" />,
};

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const propertyReviews = reviews.filter((r) => r.propertyId === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="font-display text-2xl font-bold text-foreground">Property not found</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Back + Title */}
        <div className="mb-4">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{property.title}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-foreground text-foreground" />
                  <span className="font-medium text-foreground">{property.rating}</span>
                  <span>· {property.reviewCount} reviews</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <Share className="h-4 w-4" /> Share
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <Heart className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-8"
        >
          <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host + quick info */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {property.type} hosted by {property.hostName}
                </h2>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {property.guests} guests</span>
                  <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms} bedroom{property.bedrooms > 1 ? "s" : ""}</span>
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms} bath{property.bathrooms > 1 ? "s" : ""}</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-lg">
                {property.hostName[0]}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm text-foreground">
                    <span className="text-muted-foreground">{amenityIcons[a] || <Wifi className="h-5 w-5" />}</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                <Star className="inline h-5 w-5 fill-foreground text-foreground mr-1" />
                {property.rating} · {property.reviewCount} reviews
              </h3>
              <div className="space-y-4">
                {propertyReviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm">
                        {review.userName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.userName}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                        <span className="text-sm font-medium text-foreground">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
                {propertyReviews.length === 0 && (
                  <p className="text-sm text-muted-foreground">No reviews yet for this property.</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <BookingCard property={property} />
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
