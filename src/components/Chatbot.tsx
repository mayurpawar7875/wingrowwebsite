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
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
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
    const handleOpenChatbot = (e?: CustomEvent) => {
      setIsOpen(true);
      
      // Prefill data if provided
      if (e && e.detail) {
        setFormData(prev => ({
          ...prev,
          city: e.detail.city || prev.city,
          market: e.detail.market || prev.market,
          producerType: e.detail.producerType || prev.producerType,
          stallType: e.detail.stallType || prev.stallType,
          preferredDate: e.detail.date ? new Date(e.detail.date) : prev.preferredDate
        }));
      }
    };
    
    window.addEventListener('openChatbot', handleOpenChatbot as EventListener);

    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot as EventListener);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName.trim()) newErrors.farmerName = t('nameRequired');
    if (!formData.address.trim()) newErrors.addressRequired = t('addressRequired');
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = t('validPhoneRequired');
    if (!formData.producerType) newErrors.producerType = t('producerTypeRequired');
    if (!formData.stallType) newErrors.stallType = t('stallTypeRequired');
    if (!formData.city) newErrors.city = t('cityRequired');
    if (!formData.market) newErrors.market = t('marketRequired');
    if (!formData.preferredDate) newErrors.preferredDate = t('dateRequired');
    if (!formData.consent) newErrors.consent = t('consentRequired');

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
      toast.error(t('fillAllFields'));
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
      toast.success(t('submissionSuccess'));
    } else {
      toast.error(t('submissionFailed'));
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
        className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 rounded-full text-base font-semibold"
        size="lg"
      >
        <CalendarIcon className="h-5 w-5 mr-2" />
        {t('bookYourStall')}
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-full max-w-md max-h-[600px] flex flex-col shadow-xl z-50 animate-scale-in">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <h3 className="font-semibold">{t('chatbotHeader')}</h3>
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
            <h3 className="text-2xl font-bold mb-2">{t('bookingSuccessful')}</h3>
            <p className="text-muted-foreground mb-4">{t('yourReferenceId')}</p>
            <p className="text-xl font-mono font-bold text-primary mb-6">{referenceId}</p>
            <div className="bg-muted p-4 rounded-lg mb-6 text-left">
              <p className="font-semibold mb-2">{t('bookingSummary')}</p>
              <p className="text-sm"><strong>{t('summaryName')}:</strong> {formData.farmerName}</p>
              <p className="text-sm"><strong>{t('summaryPhone')}:</strong> {formData.phone}</p>
              <p className="text-sm"><strong>{t('summaryMarket')}:</strong> {formData.market}, {formData.city}</p>
              <p className="text-sm"><strong>{t('summaryDate')}:</strong> {formData.preferredDate ? format(formData.preferredDate, "PPP") : ""}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t('bookingThankYou')}
            </p>
            <Button onClick={resetForm} className="w-full">{t('bookAnother')}</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="farmerName">{t('farmerName')} *</Label>
              <Input
                id="farmerName"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                placeholder={t('enterYourName')}
                className={errors.farmerName ? "border-destructive" : ""}
              />
              {errors.farmerName && <p className="text-xs text-destructive mt-1">{errors.farmerName}</p>}
            </div>

            <div>
              <Label htmlFor="address">{t('address')} *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t('enterYourAddress')}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="phone">{t('phoneNumber')} *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                placeholder={t('tenDigitNumber')}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label>{t('producerType')} *</Label>
              <Select value={formData.producerType} onValueChange={(value) => setFormData({ ...formData, producerType: value })}>
                <SelectTrigger className={errors.producerType ? "border-destructive" : ""}>
                  <SelectValue placeholder={t('selectProducerType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farmer">{t('producerFarmer')}</SelectItem>
                  <SelectItem value="WSHG">{t('producerWSHG')}</SelectItem>
                  <SelectItem value="Food Processor">{t('producerFoodProcessor')}</SelectItem>
                  <SelectItem value="Other">{t('producerOther')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.producerType && <p className="text-xs text-destructive mt-1">{errors.producerType}</p>}
            </div>

            <div>
              <Label>{t('stallType')} *</Label>
              <Select value={formData.stallType} onValueChange={(value) => setFormData({ ...formData, stallType: value })}>
                <SelectTrigger className={errors.stallType ? "border-destructive" : ""}>
                  <SelectValue placeholder={t('selectStallType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetables">{t('stallVegetables')}</SelectItem>
                  <SelectItem value="Fruits">{t('stallFruits')}</SelectItem>
                  <SelectItem value="Grains/Pulses">{t('stallGrainsPulses')}</SelectItem>
                  <SelectItem value="Millets">{t('stallMillets')}</SelectItem>
                  <SelectItem value="Processed Foods">{t('stallProcessedFoods')}</SelectItem>
                  <SelectItem value="Other">{t('stallOther')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.stallType && <p className="text-xs text-destructive mt-1">{errors.stallType}</p>}
            </div>

            <div>
              <Label>{t('selectCity')} *</Label>
              <Select value={formData.city} onValueChange={handleCityChange}>
                <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                  <SelectValue placeholder={t('chooseCity')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pune">{t('pune')}</SelectItem>
                  <SelectItem value="Mumbai">{t('mumbai')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>

            {formData.city && (
              <div>
                <Label>{t('selectMarket')} *</Label>
                <Select value={formData.market} onValueChange={(value) => setFormData({ ...formData, market: value })}>
                  <SelectTrigger className={errors.market ? "border-destructive" : ""}>
                    <SelectValue placeholder={t('chooseMarket')} />
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
              <Label>{t('preferredDate')} *</Label>
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
                    {formData.preferredDate ? format(formData.preferredDate, "PPP") : t('pickDate')}
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
              <Label htmlFor="notes">{t('notes')}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t('anySpecialRequirements')}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              />
              <label htmlFor="consent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('consent')} *
              </label>
            </div>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

            <Button 
              onClick={handleSubmit} 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submitBooking')}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Chatbot;
