import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { X, MessageCircle, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const GOOGLE_SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; // Replace with actual URL

const cityMarkets = {
  Pune: [
    "Kharadi", "Hadapsar", "Magarpatta", "Ivy Estate", "Baner", "Wakad", "Aundh",
    "Pimple Saudagar", "Kalyani Nagar", "Viman Nagar", "Kothrud", "Shivaji Nagar",
    "Katraj", "Warje", "Undri", "Kondhwa", "Hinjewadi", "Pashan", "Bavdhan",
    "Sus", "Pimpri", "Chinchwad", "Nigdi"
  ],
  Mumbai: [
    "Dombivli", "Thane", "Mulund", "Ghatkopar", "Borivali", "Chembur", "Andheri",
    "Kandivali", "Malad", "Goregaon", "Dahisar", "Mira Road", "Bhandup", "Vikhroli",
    "Powai", "Kurla", "Vashi", "Kharghar", "Panvel", "Nerul", "Airoli",
    "Sanpada", "Kopar Khairane"
  ]
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  
  const [formData, setFormData] = useState({
    farmerName: "",
    address: "",
    phone: "",
    producerType: "",
    stallType: "",
    city: "",
    market: "",
    preferredDate: undefined as Date | undefined,
    notes: "",
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !showSuccess) {
        setIsOpen(true);
      }
    }, 10000);

    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('openChatbot', handleOpenChatbot);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, [isOpen, showSuccess]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName.trim()) newErrors.farmerName = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Valid 10-digit phone number required";
    if (!formData.producerType) newErrors.producerType = "Producer type is required";
    if (!formData.stallType) newErrors.stallType = "Stall type is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.market) newErrors.market = "Market is required";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReferenceId = () => {
    const date = format(new Date(), "yyyyMMdd");
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `WINGROW-${date}-${random}`;
  };

  const submitToGoogleSheets = async (data: any) => {
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      return { success: true };
    } catch (error) {
      console.error("Google Sheets submission error:", error);
      return { success: false, error };
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    const refId = generateReferenceId();

    const submissionData = {
      referenceId: refId,
      farmerName: formData.farmerName,
      address: formData.address,
      phone: formData.phone,
      producerType: formData.producerType,
      stallType: formData.stallType,
      city: formData.city,
      market: formData.market,
      preferredDate: formData.preferredDate ? format(formData.preferredDate, "yyyy-MM-dd") : "",
      notes: formData.notes,
      consent: formData.consent
    };

    const result = await submitToGoogleSheets(submissionData);

    if (result.success) {
      setReferenceId(refId);
      setShowSuccess(true);
      toast.success("Booking submitted successfully!");
    } else {
      toast.error("Submission failed. Please try again or contact us directly.");
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      farmerName: "",
      address: "",
      phone: "",
      producerType: "",
      stallType: "",
      city: "",
      market: "",
      preferredDate: undefined,
      notes: "",
      consent: false
    });
    setErrors({});
    setShowSuccess(false);
    setIsOpen(false);
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city, market: "" });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg z-50 hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-full max-w-md max-h-[600px] flex flex-col shadow-xl z-50 animate-scale-in">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">Wingrow Assistant - Book Your Stall</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-background">
        {showSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
            <p className="text-muted-foreground mb-4">Your reference ID:</p>
            <p className="text-xl font-mono font-bold text-primary mb-6">{referenceId}</p>
            <div className="bg-muted p-4 rounded-lg mb-6 text-left">
              <p className="font-semibold mb-2">Booking Summary:</p>
              <p className="text-sm"><strong>Name:</strong> {formData.farmerName}</p>
              <p className="text-sm"><strong>Phone:</strong> {formData.phone}</p>
              <p className="text-sm"><strong>Market:</strong> {formData.market}, {formData.city}</p>
              <p className="text-sm"><strong>Date:</strong> {formData.preferredDate ? format(formData.preferredDate, "PPP") : ""}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              We'll contact you soon to confirm your booking details.
            </p>
            <Button onClick={resetForm} className="w-full">Book Another Stall</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="farmerName">Farmer / Business Name *</Label>
              <Input
                id="farmerName"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                placeholder="Enter your name"
                className={errors.farmerName ? "border-destructive" : ""}
              />
              {errors.farmerName && <p className="text-xs text-destructive mt-1">{errors.farmerName}</p>}
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter your full address"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                placeholder="10-digit mobile number"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label>Producer Type *</Label>
              <Select value={formData.producerType} onValueChange={(value) => setFormData({ ...formData, producerType: value })}>
                <SelectTrigger className={errors.producerType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select producer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farmer">Farmer</SelectItem>
                  <SelectItem value="WSHG">Women Self-Help Group</SelectItem>
                  <SelectItem value="Food Processor">Food Processor</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.producerType && <p className="text-xs text-destructive mt-1">{errors.producerType}</p>}
            </div>

            <div>
              <Label>Stall Type *</Label>
              <Select value={formData.stallType} onValueChange={(value) => setFormData({ ...formData, stallType: value })}>
                <SelectTrigger className={errors.stallType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select stall type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Grains/Pulses">Grains/Pulses</SelectItem>
                  <SelectItem value="Millets">Millets</SelectItem>
                  <SelectItem value="Processed Foods">Processed Foods</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.stallType && <p className="text-xs text-destructive mt-1">{errors.stallType}</p>}
            </div>

            <div>
              <Label>Select City *</Label>
              <Select value={formData.city} onValueChange={handleCityChange}>
                <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                  <SelectValue placeholder="Choose city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>

            {formData.city && (
              <div>
                <Label>Select Market *</Label>
                <Select value={formData.market} onValueChange={(value) => setFormData({ ...formData, market: value })}>
                  <SelectTrigger className={errors.market ? "border-destructive" : ""}>
                    <SelectValue placeholder="Choose market location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityMarkets[formData.city as keyof typeof cityMarkets]?.map((market) => (
                      <SelectItem key={market} value={market}>{market}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.market && <p className="text-xs text-destructive mt-1">{errors.market}</p>}
              </div>
            )}

            <div>
              <Label>Preferred Market Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.preferredDate && "text-muted-foreground",
                      errors.preferredDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && <p className="text-xs text-destructive mt-1">{errors.preferredDate}</p>}
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requirements or questions?"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              />
              <label htmlFor="consent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to be contacted by Wingrow Market regarding my stall booking. *
              </label>
            </div>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

            <Button 
              onClick={handleSubmit} 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Chatbot;
