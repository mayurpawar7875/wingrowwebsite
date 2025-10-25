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
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  market_visited: z.string().min(1, "Please select a market"),
  rating: z.number().min(1, "Please select a rating").max(5),
  feedback_message: z.string().min(10, "Feedback must be at least 10 characters"),
  agree_to_contact: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const VisitorFeedbackForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      agree_to_contact: false,
      market_visited: "",
    },
  });

  const agreeToContact = watch("agree_to_contact");

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("visitor_feedback").insert({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        market_visited: data.market_visited,
        rating: data.rating,
        feedback_message: data.feedback_message,
        agree_to_contact: data.agree_to_contact,
      });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-form-notifications", {
          body: {
            type: "feedback",
            name: data.name,
            email: data.email || undefined,
            phone: data.phone || undefined,
            market_visited: data.market_visited,
            rating: data.rating,
            feedback_message: data.feedback_message,
          },
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the submission if email fails
      }

      toast.success(t('thankYouFeedback'), {
        description: t('appreciateFeedback'),
      });
      reset();
      clearErrors();
      setSelectedRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(t('failedFeedback'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border animate-fade-in">
      <h3 className="text-2xl font-bold mb-2">{t('visitorFeedback')}</h3>
      <p className="text-muted-foreground mb-6">{t('shareExperience')}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="visitor-name">{t('yourName')} *</Label>
          <Input
            id="visitor-name"
            {...register("name")}
            placeholder={t('yourFullName')}
            className="mt-2"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="visitor-email">{t('email')}</Label>
            <Input
              id="visitor-email"
              type="email"
              {...register("email")}
              placeholder={t('enterEmail')}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="visitor-phone">{t('phoneNumber')}</Label>
            <Input
              id="visitor-phone"
              type="tel"
              {...register("phone")}
              placeholder={t('tenDigitNumber')}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="market-visited">{t('marketVisited')} *</Label>
          <Controller
            name="market_visited"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t('selectMarketVisited')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharadi, Pune">Kharadi, Pune</SelectItem>
                  <SelectItem value="Hadapsar, Pune">Hadapsar, Pune</SelectItem>
                  <SelectItem value="Magarpatta, Pune">Magarpatta, Pune</SelectItem>
                  <SelectItem value="Baner, Pune">Baner, Pune</SelectItem>
                  <SelectItem value="Thane, Mumbai">Thane, Mumbai</SelectItem>
                  <SelectItem value="Mulund, Mumbai">Mulund, Mumbai</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.market_visited && (
            <p className="text-sm text-destructive mt-1">{errors.market_visited.message}</p>
          )}
        </div>

        <div>
          <Label>{t('rating')} *</Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setSelectedRating(star);
                  setValue("rating", star, { shouldValidate: true });
                }}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredStar || selectedRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="visitor-feedback">{t('feedbackMessage')} *</Label>
          <Textarea
            id="visitor-feedback"
            {...register("feedback_message")}
            placeholder={t('tellUs')}
            className="mt-2 min-h-[120px]"
          />
          {errors.feedback_message && (
            <p className="text-sm text-destructive mt-1">{errors.feedback_message.message}</p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="visitor-agree"
            checked={agreeToContact}
            onCheckedChange={(checked) => setValue("agree_to_contact", checked as boolean, { shouldValidate: true })}
          />
          <Label htmlFor="visitor-agree" className="cursor-pointer leading-relaxed">
            {t('agreeToContact')} *
          </Label>
        </div>
        {errors.agree_to_contact && (
          <p className="text-sm text-destructive">{errors.agree_to_contact.message}</p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submitFeedback')}
        </Button>
      </form>
    </div>
  );
};

export default VisitorFeedbackForm;
