import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const invitationSchema = z.object({
  contact_person_name: z.string().min(2, "Name must be at least 2 characters"),
  phone_number: z.string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
  organization_name: z.string().min(2, "Organization name is required"),
  city: z.string().min(2, "City is required"),
  venue_address: z.string().min(10, "Please provide detailed venue address"),
  expected_footfall: z.string().optional(),
  preferred_dates: z.string().min(5, "Please specify preferred dates"),
  frequency: z.string().min(1, "Please select a frequency"),
  additional_notes: z.string().optional(),
  agree_to_contact: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type InvitationFormData = z.infer<typeof invitationSchema>;

interface MarketInvitationFormProps {
  onSuccess?: () => void;
}

const MarketInvitationForm = ({ onSuccess }: MarketInvitationFormProps = {}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      agree_to_contact: false,
      frequency: "",
    },
  });

  const agreeToContact = watch("agree_to_contact");

  const onSubmit = async (data: InvitationFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("market_invitations").insert({
        contact_person_name: data.contact_person_name,
        phone_number: data.phone_number,
        email: data.email,
        organization_name: data.organization_name,
        city: data.city,
        venue_address: data.venue_address,
        expected_footfall: data.expected_footfall || null,
        preferred_dates: data.preferred_dates,
        frequency: data.frequency,
        additional_notes: data.additional_notes || null,
        agree_to_contact: data.agree_to_contact,
      });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-form-notifications", {
          body: {
            type: "invitation",
            contact_person_name: data.contact_person_name,
            phone_number: data.phone_number,
            email: data.email,
            organization_name: data.organization_name,
            city: data.city,
            venue_address: data.venue_address,
            expected_footfall: data.expected_footfall || undefined,
            preferred_dates: data.preferred_dates,
            frequency: data.frequency,
            additional_notes: data.additional_notes || undefined,
          },
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the submission if email fails
      }

      toast.success(t('thankYouInvitation'), {
        description: t('excitedOpportunity'),
      });
      reset();
      clearErrors();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting invitation:", error);
      toast.error(t('failedInvitation'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
          <Label htmlFor="contact-person">{t('contactPersonName')} *</Label>
          <Input
            id="contact-person"
            {...register("contact_person_name")}
            placeholder={t('yourFullName')}
            className="mt-2"
          />
          {errors.contact_person_name && (
            <p className="text-sm text-destructive mt-1">{errors.contact_person_name.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invite-phone">{t('phoneNumber')} *</Label>
            <Input
              id="invite-phone"
              type="tel"
              {...register("phone_number")}
              placeholder={t('tenDigitNumber')}
              className="mt-2"
            />
            {errors.phone_number && (
              <p className="text-sm text-destructive mt-1">{errors.phone_number.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="invite-email">{t('email')} *</Label>
            <Input
              id="invite-email"
              type="email"
              {...register("email")}
              placeholder={t('enterEmail')}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="organization">{t('organizationName')} *</Label>
          <Input
            id="organization"
            {...register("organization_name")}
            placeholder={t('organizationName')}
            className="mt-2"
          />
          {errors.organization_name && (
            <p className="text-sm text-destructive mt-1">{errors.organization_name.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">{t('city')} *</Label>
            <Input
              id="city"
              {...register("city")}
              placeholder={t('cityName')}
              className="mt-2"
            />
            {errors.city && (
              <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="footfall">{t('expectedFootfall')}</Label>
            <Input
              id="footfall"
              {...register("expected_footfall")}
              placeholder={t('footfallPlaceholder')}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="venue-address">{t('venueAddress')} *</Label>
          <Textarea
            id="venue-address"
            {...register("venue_address")}
            placeholder={t('venueAddressPlaceholder')}
            className="mt-2 min-h-[80px]"
          />
          {errors.venue_address && (
            <p className="text-sm text-destructive mt-1">{errors.venue_address.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preferred-dates">{t('preferredDates')} *</Label>
            <Input
              id="preferred-dates"
              {...register("preferred_dates")}
              placeholder={t('preferredDatesPlaceholder')}
              className="mt-2"
            />
            {errors.preferred_dates && (
              <p className="text-sm text-destructive mt-1">{errors.preferred_dates.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="frequency">{t('frequency')} *</Label>
            <Controller
              name="frequency"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={t('selectFrequency')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One-time">{t('oneTime')}</SelectItem>
                    <SelectItem value="Weekly">{t('weekly')}</SelectItem>
                    <SelectItem value="Monthly">{t('monthly')}</SelectItem>
                    <SelectItem value="Festive/Seasonal">{t('festiveSeasonal')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.frequency && (
              <p className="text-sm text-destructive mt-1">{errors.frequency.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="notes">{t('additionalNotes')}</Label>
          <Textarea
            id="notes"
            {...register("additional_notes")}
            placeholder={t('specialRequirements')}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="invite-agree"
            checked={agreeToContact}
            onCheckedChange={(checked) => setValue("agree_to_contact", checked as boolean, { shouldValidate: true })}
          />
          <Label htmlFor="invite-agree" className="cursor-pointer leading-relaxed">
            {t('agreeToContact')} *
          </Label>
        </div>
        {errors.agree_to_contact && (
          <p className="text-sm text-destructive">{errors.agree_to_contact.message}</p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('sendInvitation')}
        </Button>
      </form>
  );
};

export default MarketInvitationForm;
