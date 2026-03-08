import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export type PropertyType = "House" | "Apartment" | "Hotel" | "Guesthouse";

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  price: number;
  images: string[];
  amenities: string[];
  type: PropertyType;
  rating: number;
  reviewCount: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  hostName: string;
  hostAvatar: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Skyline Penthouse with Panoramic Views",
    description: "Wake up above the clouds in this stunning penthouse overlooking the Nairobi skyline. Floor-to-ceiling windows, contemporary African art, and a private rooftop terrace make this the ultimate urban retreat. Walking distance to Westlands restaurants and nightlife.",
    location: "Westlands, Nairobi",
    city: "Nairobi",
    price: 185,
    images: [property1],
    amenities: ["WiFi", "Parking", "Pool", "Gym", "Kitchen", "Air Conditioning", "Workspace"],
    type: "Apartment",
    rating: 4.9,
    reviewCount: 127,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "James Kariuki",
    hostAvatar: "",
  },
  {
    id: "2",
    title: "Safari Lodge in Maasai Mara",
    description: "Experience the magic of the African savanna from this authentic safari lodge. Watch the Great Migration from your private veranda, enjoy bush dinners under the stars, and fall asleep to the sounds of the wild. An unforgettable Kenyan adventure.",
    location: "Maasai Mara, Narok",
    city: "Narok",
    price: 320,
    images: [property2],
    amenities: ["WiFi", "Restaurant", "Safari Tours", "Pool", "Spa"],
    type: "Hotel",
    rating: 4.95,
    reviewCount: 89,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Wanjiku Mwangi",
    hostAvatar: "",
  },
  {
    id: "3",
    title: "Beachfront Villa with Infinity Pool",
    description: "Paradise found on the shores of Diani Beach. This luxurious villa features a private infinity pool overlooking the Indian Ocean, tropical gardens, and direct beach access. Perfect for families or groups seeking the ultimate beach getaway.",
    location: "Diani Beach, Kwale",
    city: "Mombasa",
    price: 450,
    images: [property3],
    amenities: ["WiFi", "Pool", "Beach Access", "Kitchen", "Parking", "BBQ", "Garden"],
    type: "House",
    rating: 4.85,
    reviewCount: 64,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    hostName: "Hassan Omar",
    hostAvatar: "",
  },
  {
    id: "4",
    title: "Swahili Heritage Suite in Lamu",
    description: "Step back in time in this beautifully restored Swahili townhouse on Lamu Island. Carved wooden doors, handwoven textiles, and ocean breezes create an atmosphere of timeless elegance. Explore the UNESCO World Heritage old town on foot.",
    location: "Lamu Old Town, Lamu",
    city: "Lamu",
    price: 120,
    images: [property4],
    amenities: ["WiFi", "Breakfast", "Rooftop Terrace", "Air Conditioning"],
    type: "Guesthouse",
    rating: 4.8,
    reviewCount: 203,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Fatima Ali",
    hostAvatar: "",
  },
  {
    id: "5",
    title: "Ocean-View Penthouse in Nyali",
    description: "Modern luxury meets coastal charm in this spectacular Mombasa penthouse. Watch dhows sail across the Indian Ocean from your private terrace while enjoying contemporary African design and world-class amenities.",
    location: "Nyali, Mombasa",
    city: "Mombasa",
    price: 210,
    images: [property5],
    amenities: ["WiFi", "Pool", "Gym", "Parking", "Kitchen", "Air Conditioning", "Concierge"],
    type: "Apartment",
    rating: 4.7,
    reviewCount: 56,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "Daniel Ochieng",
    hostAvatar: "",
  },
  {
    id: "6",
    title: "Enchanted Forest Treehouse",
    description: "Disconnect and recharge in this magical treehouse nestled in the Aberdare Forest. Fairy lights, glass walls, and the sounds of nature create a one-of-a-kind eco-luxury experience. Spot elephants and rare birds from your elevated deck.",
    location: "Aberdare Forest, Nyeri",
    city: "Nyeri",
    price: 175,
    images: [property6],
    amenities: ["WiFi", "Breakfast", "Nature Walks", "Fireplace", "Bird Watching"],
    type: "House",
    rating: 4.92,
    reviewCount: 41,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Grace Wambui",
    hostAvatar: "",
  },
];

export const reviews: Review[] = [
  { id: "r1", propertyId: "1", userName: "Sarah M.", avatar: "", rating: 5, comment: "Absolutely stunning views! The penthouse was immaculate and the location couldn't be better. James was a fantastic host.", date: "2026-02-15" },
  { id: "r2", propertyId: "1", userName: "Tom K.", avatar: "", rating: 5, comment: "Best stay in Nairobi. The rooftop terrace is incredible for sundowners.", date: "2026-01-28" },
  { id: "r3", propertyId: "2", userName: "Emily R.", avatar: "", rating: 5, comment: "A once-in-a-lifetime experience. We saw the Big Five from the lodge!", date: "2026-02-20" },
  { id: "r4", propertyId: "3", userName: "Michael O.", avatar: "", rating: 5, comment: "The pool overlooking the ocean is paradise. Our family had the best vacation here.", date: "2026-01-10" },
  { id: "r5", propertyId: "4", userName: "Anna L.", avatar: "", rating: 4, comment: "So charming and authentic. Lamu is a hidden gem and this suite captures its soul.", date: "2026-02-05" },
  { id: "r6", propertyId: "6", userName: "David N.", avatar: "", rating: 5, comment: "Pure magic. Falling asleep in the trees with fairy lights was unforgettable.", date: "2026-03-01" },
];

export const kenyanCities = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Lamu", "Narok", "Nyeri", "Malindi", "Nanyuki", "Diani"
];
