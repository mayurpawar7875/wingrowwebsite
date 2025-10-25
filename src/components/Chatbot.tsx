import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

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

const TOTAL_STEPS = 10;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  
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

  const [stepError, setStepError] = useState("");

  useEffect(() => {
    const handleOpenChatbot = (e?: CustomEvent) => {
      setIsOpen(true);
      setCurrentStep(0);
      
      // Prefill data if provided
      if (e && e.detail) {
        const prefillData: any = {};
        let skipToStep = 0;
        
        if (e.detail.city) {
          prefillData.city = e.detail.city;
          skipToStep = Math.max(skipToStep, 3);
        }
        if (e.detail.market) {
          prefillData.market = e.detail.market;
          skipToStep = Math.max(skipToStep, 4);
        }
        if (e.detail.preferredDate) {
          prefillData.preferredDate = new Date(e.detail.preferredDate);
          skipToStep = Math.max(skipToStep, 8);
        }
        
        setFormData(prev => ({ ...prev, ...prefillData }));
        // Skip to first unanswered step
        setCurrentStep(skipToStep);
      }
    };
    
    window.addEventListener('wingrow:openBooking', handleOpenChatbot as EventListener);
    window.addEventListener('openChatbot', handleOpenChatbot as EventListener);

    return () => {
      window.removeEventListener('wingrow:openBooking', handleOpenChatbot as EventListener);
      window.removeEventListener('openChatbot', handleOpenChatbot as EventListener);
    };
  }, []);

  // Focus management - return focus to trigger when dialog closes
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  const validateCurrentStep = (): boolean => {
    setStepError("");
    
    switch (currentStep) {
      case 0: // Greeting
        return true;
      case 1: // Farmer Name
        if (!formData.farmerName.trim()) {
          setStepError(t('nameRequired') || "Please enter your name");
          return false;
        }
        return true;
      case 2: // Phone
        if (!formData.phone.match(/^\d{10}$/)) {
          setStepError(t('validPhoneRequired') || "Please enter a 10-digit phone number");
          return false;
        }
        return true;
      case 3: // City
        if (!formData.city) {
          setStepError(t('cityRequired') || "Please select a city");
          return false;
        }
        return true;
      case 4: // Market
        if (!formData.market) {
          setStepError(t('marketRequired') || "Please select a market");
          return false;
        }
        return true;
      case 5: // Address
        if (!formData.address.trim()) {
          setStepError(t('addressRequired') || "Please enter your address");
          return false;
        }
        return true;
      case 6: // Producer Type
        if (!formData.producerType) {
          setStepError(t('producerTypeRequired') || "Please select producer type");
          return false;
        }
        return true;
      case 7: // Stall Type
        if (!formData.stallType) {
          setStepError(t('stallTypeRequired') || "Please select stall type");
          return false;
        }
        return true;
      case 8: // Preferred Date
        if (!formData.preferredDate) {
          setStepError(t('dateRequired') || "Please select a date");
          return false;
        }
        // Validate day of week based on city
        const dayOfWeek = formData.preferredDate.getDay();
        if (formData.city === 'Pune' && dayOfWeek === 1) {
          setStepError(t('puneClosedMonday'));
          return false;
        }
        if (formData.city === 'Mumbai' && (dayOfWeek === 1 || dayOfWeek === 2)) {
          setStepError(t('mumbaiClosedMondayTuesday'));
          return false;
        }
        return true;
      case 9: // Notes
        return true; // Optional
      case 10: // Consent
        if (!formData.consent) {
          setStepError(t('consentRequired') || "You must agree to be contacted");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const isDateDisabled = (date: Date) => {
    if (date < new Date()) return true;
    const dayOfWeek = date.getDay();
    if (formData.city === 'Pune' && dayOfWeek === 1) return true; // Monday
    if (formData.city === 'Mumbai' && (dayOfWeek === 1 || dayOfWeek === 2)) return true; // Mon-Tue
    return false;
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

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === TOTAL_STEPS) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setStepError("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {

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
      // Send email notification
      try {
        await supabase.functions.invoke('send-booking-email', {
          body: {
            referenceId: refId,
            name: formData.farmerName,
            phone: formData.phone,
            email: formData.address,
            city: formData.city,
            market: formData.market,
            stallSize: formData.stallType,
            preferredDates: formData.preferredDate ? format(formData.preferredDate, "yyyy-MM-dd") : "",
            hasElectricity: false,
            additionalRequirements: formData.notes
          }
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
      
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
    setStepError("");
    setShowSuccess(false);
    setCurrentStep(0);
    setIsOpen(false);
  };

  const bookAnother = () => {
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
    setStepError("");
    setShowSuccess(false);
    setCurrentStep(0);
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city, market: "" });
  };

  const renderStep = () => {
    if (showSuccess) {
      return (
        <div className="text-center py-8 px-4">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">{t('bookingSuccessful')}</h3>
          <p className="text-muted-foreground mb-4">{t('yourReferenceId')} <span className="font-mono font-bold text-primary">{referenceId}</span></p>
          <p className="text-sm text-muted-foreground mb-6">
            {t('bookingThankYou')}
          </p>
          <div className="flex gap-2">
            <Button onClick={handleClose} variant="outline" className="flex-1">{t('close')}</Button>
            <Button onClick={bookAnother} className="flex-1">{t('bookAnotherStall')}</Button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 0: // Greeting
        return (
          <div className="text-center py-8 px-4">
            <h3 className="text-xl font-semibold mb-4">{t('welcomeMessage')}</h3>
            <p className="text-muted-foreground mb-6">{t('startBooking')}</p>
            <Button onClick={handleNext} className="w-full">{t('start')}</Button>
          </div>
        );
      
      case 1: // Farmer Name
        return (
          <div className="space-y-4">
            <Label htmlFor="farmerName">{t('farmerName')} *</Label>
            <Input
              id="farmerName"
              value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              placeholder={t('enterYourName')}
              autoFocus
            />
          </div>
        );
      
      case 2: // Phone
        return (
          <div className="space-y-4">
            <Label htmlFor="phone">{t('phoneNumber')} *</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              placeholder={t('tenDigitNumber')}
              autoFocus
            />
          </div>
        );
      
      case 3: // City
        return (
          <div className="space-y-4">
            <Label>{t('selectCity')} *</Label>
            <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value, market: "" })}>
              <SelectTrigger>
                <SelectValue placeholder={t('chooseCity')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pune">{t('pune')}</SelectItem>
                <SelectItem value="Mumbai">{t('mumbai')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 4: // Market
        return (
          <div className="space-y-4">
            <Label>{t('selectMarket')} *</Label>
            <Select value={formData.market} onValueChange={(value) => setFormData({ ...formData, market: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('chooseMarket')} />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {cityMarkets[formData.city as keyof typeof cityMarkets]?.map((market) => (
                  <SelectItem key={market} value={market}>{market}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 5: // Address
        return (
          <div className="space-y-4">
            <Label htmlFor="address">{t('address')} *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={t('enterYourAddress')}
              rows={3}
              autoFocus
            />
          </div>
        );
      
      case 6: // Producer Type
        return (
          <div className="space-y-4">
            <Label>{t('producerType')} *</Label>
            <Select value={formData.producerType} onValueChange={(value) => setFormData({ ...formData, producerType: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectProducerType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Farmer">{t('producerFarmer')}</SelectItem>
                <SelectItem value="WSHG">{t('producerWSHG')}</SelectItem>
                <SelectItem value="Women Entrepreneur">Women Entrepreneur</SelectItem>
                <SelectItem value="Food Processor">{t('producerFoodProcessor')}</SelectItem>
                <SelectItem value="Other">{t('producerOther')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 7: // Stall Type
        return (
          <div className="space-y-4">
            <Label>{t('stallType')} *</Label>
            <Select value={formData.stallType} onValueChange={(value) => setFormData({ ...formData, stallType: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectStallType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegetables">{t('stallVegetables')}</SelectItem>
                <SelectItem value="Fruits">{t('stallFruits')}</SelectItem>
                <SelectItem value="Millets">{t('stallMillets')}</SelectItem>
                <SelectItem value="Processed Foods">{t('stallProcessedFoods')}</SelectItem>
                <SelectItem value="Other">{t('stallOther')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 8: // Preferred Date
        return (
          <div className="space-y-4">
            <Label>{t('preferredDate')} *</Label>
            <Calendar
              mode="single"
              selected={formData.preferredDate}
              onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
              disabled={isDateDisabled}
              initialFocus
              className="pointer-events-auto rounded-md border mx-auto"
            />
            {formData.city && (
              <p className="text-xs text-muted-foreground">
                {formData.city === 'Pune' ? t('puneMarketsOpen') : t('mumbaiMarketsOpen')}
              </p>
            )}
          </div>
        );
      
      case 9: // Notes
        return (
          <div className="space-y-4">
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('anySpecialRequirements')}
              rows={3}
              autoFocus
            />
          </div>
        );
      
      case 10: // Consent
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              />
              <label htmlFor="consent" className="text-sm leading-relaxed">
                {t('consent')} *
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 rounded-full text-base font-semibold"
        size="lg"
      >
        <CalendarIcon className="h-5 w-5 mr-2" />
        {t('bookYourStall')}
      </Button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) handleClose();
        setIsOpen(open);
      }}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <h3 className="font-semibold">{t('chatbotHeader')}</h3>
            </div>
          </div>

          {/* Progress Indicator */}
          {!showSuccess && currentStep > 0 && (
            <div className="px-6 pt-4 shrink-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{t('step')} {currentStep} of {TOTAL_STEPS}</span>
                <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderStep()}
            
            {/* Error Message */}
            {stepError && (
              <p className="text-sm text-destructive mt-4 p-3 bg-destructive/10 rounded-md">
                {stepError}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          {!showSuccess && currentStep > 0 && (
            <div className="p-4 border-t flex gap-2 shrink-0">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {t('back')}
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  t('submitting')
                ) : currentStep === TOTAL_STEPS ? (
                  t('submit')
                ) : (
                  <>
                    {t('next')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
