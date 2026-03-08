import { useState, useMemo } from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Property } from "@/data/properties";

interface BookingCardProps {
  property: Property;
}

const BookingCard = ({ property }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const nights = useMemo(() => {
    if (checkIn && checkOut) return differenceInDays(checkOut, checkIn);
    return 0;
  }, [checkIn, checkOut]);

  const subtotal = nights * property.price;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const canBook = checkIn && checkOut && nights > 0;

  const handleReserve = () => {
    if (canBook) setShowConfirmation(true);
  };

  const today = new Date();

  return (
    <>
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-baseline gap-1 mb-6">
          <span className="font-display text-2xl font-bold text-foreground">
            ${property.price}
          </span>
          <span className="text-muted-foreground text-sm">/ night</span>
        </div>

        {/* Date pickers */}
        <div className="rounded-xl border border-border overflow-hidden mb-4">
          <div className="grid grid-cols-2">
            {/* Check-in */}
            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
              <PopoverTrigger asChild>
                <button className="p-3 border-r border-b border-border text-left hover:bg-muted/50 transition-colors w-full">
                  <label className="text-xs font-semibold text-foreground uppercase block">
                    Check-in
                  </label>
                  <span className={cn("text-sm mt-0.5 block", checkIn ? "text-foreground" : "text-muted-foreground")}>
                    {checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    if (date && checkOut && date >= checkOut) setCheckOut(undefined);
                    setCheckInOpen(false);
                  }}
                  disabled={(date) => date < today}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Check-out */}
            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
              <PopoverTrigger asChild>
                <button className="p-3 border-b border-border text-left hover:bg-muted/50 transition-colors w-full">
                  <label className="text-xs font-semibold text-foreground uppercase block">
                    Checkout
                  </label>
                  <span className={cn("text-sm mt-0.5 block", checkOut ? "text-foreground" : "text-muted-foreground")}>
                    {checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={(date) => {
                    setCheckOut(date);
                    setCheckOutOpen(false);
                  }}
                  disabled={(date) => date <= (checkIn || today)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest counter */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <label className="text-xs font-semibold text-foreground uppercase block">
                Guests
              </label>
              <span className="text-sm text-muted-foreground">
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-medium text-foreground">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(property.guests, guests + 1))}
                disabled={guests >= property.guests}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Button
          onClick={handleReserve}
          disabled={!canBook}
          className="w-full rounded-xl py-3 font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Reserve
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-3">
          You won't be charged yet
        </p>

        {/* Price breakdown */}
        {nights > 0 && (
          <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${property.price} × {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span className="text-foreground">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span className="text-foreground">${serviceFee}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">${total}</span>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Check className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center font-display text-xl">
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your reservation has been submitted successfully.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border p-4 space-y-3 mt-2">
            <h4 className="font-semibold text-foreground text-sm">{property.title}</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-medium">Check-in</span>
                <span className="text-foreground">{checkIn && format(checkIn, "MMM d, yyyy")}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-medium">Checkout</span>
                <span className="text-foreground">{checkOut && format(checkOut, "MMM d, yyyy")}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-medium">Guests</span>
                <span className="text-foreground">{guests}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-medium">Total</span>
                <span className="text-foreground font-semibold">${total}</span>
              </div>
            </div>
          </div>

          <Button onClick={() => setShowConfirmation(false)} className="w-full mt-2 rounded-xl">
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingCard;
