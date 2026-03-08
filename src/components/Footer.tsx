import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted/30 mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">StayKenya</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Discover extraordinary stays across Kenya. From Nairobi penthouses to Maasai Mara lodges.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/search?city=Nairobi" className="hover:text-foreground transition-colors">Nairobi</Link></li>
            <li><Link to="/search?city=Mombasa" className="hover:text-foreground transition-colors">Mombasa</Link></li>
            <li><Link to="/search?city=Lamu" className="hover:text-foreground transition-colors">Lamu</Link></li>
            <li><Link to="/search?city=Narok" className="hover:text-foreground transition-colors">Maasai Mara</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3">Hosting</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Become a Host</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Host Resources</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Community</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Help Center</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Safety</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Cancellation</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 StayKenya. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
