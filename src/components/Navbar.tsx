import { Link } from "react-router-dom";
import { Search, Globe, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            StayKenya
          </span>
        </Link>

        {/* Center search pill - desktop */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1.5 shadow-card transition-shadow hover:shadow-card-hover">
          <button className="px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-full transition-colors">
            Anywhere
          </button>
          <div className="h-6 w-px bg-border" />
          <button className="px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-full transition-colors">
            Any week
          </button>
          <div className="h-6 w-px bg-border" />
          <button className="px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-full transition-colors">
            Add guests
          </button>
          <Link to="/search" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Search className="h-4 w-4" />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex text-sm font-medium">
            Become a Host
          </Button>
          <Link to="/search" className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border">
            <Search className="h-4 w-4 text-foreground" />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 hover:shadow-card transition-shadow cursor-pointer">
            <Menu className="h-4 w-4 text-foreground" />
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
