import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackFormData {
  type: "feedback";
  name: string;
  email?: string;
  phone?: string;
  market_visited: string;
  rating: number;
  feedback_message: string;
}

interface InvitationFormData {
  type: "invitation";
  contact_person_name: string;
  phone_number: string;
  email: string;
  organization_name: string;
  city: string;
  venue_address: string;
  expected_footfall?: string;
  preferred_dates: string;
  frequency: string;
  additional_notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FeedbackFormData | InvitationFormData = await req.json();

    let subject: string;
    let htmlContent: string;

    if (formData.type === "feedback") {
      // Visitor Feedback Email
      subject = `New Visitor Feedback - ${formData.market_visited}`;
      htmlContent = `
        <h2>New Visitor Feedback Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #f97316; margin-top: 0;">Visitor Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ""}
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
          <p><strong>Market Visited:</strong> ${formData.market_visited}</p>
          <p><strong>Rating:</strong> ${"⭐".repeat(formData.rating)} (${formData.rating}/5)</p>
        </div>
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0;">
          <h3 style="margin-top: 0;">Feedback Message</h3>
          <p style="white-space: pre-wrap;">${formData.feedback_message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This feedback was submitted through the Wingrow Market website.
        </p>
      `;
    } else {
      // Market Invitation Email
      subject = `New Market Invitation Request - ${formData.organization_name}`;
      htmlContent = `
        <h2>New Market Invitation Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #f97316; margin-top: 0;">Contact Information</h3>
          <p><strong>Contact Person:</strong> ${formData.contact_person_name}</p>
          <p><strong>Phone:</strong> ${formData.phone_number}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
        </div>
        <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #f97316; margin-top: 0;">Organization Details</h3>
          <p><strong>Organization:</strong> ${formData.organization_name}</p>
          <p><strong>City:</strong> ${formData.city}</p>
          ${formData.expected_footfall ? `<p><strong>Expected Footfall:</strong> ${formData.expected_footfall}</p>` : ""}
        </div>
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0;">
          <h3 style="margin-top: 0;">Venue Information</h3>
          <p><strong>Address:</strong></p>
          <p style="white-space: pre-wrap;">${formData.venue_address}</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #f97316; margin-top: 0;">Schedule</h3>
          <p><strong>Preferred Dates:</strong> ${formData.preferred_dates}</p>
          <p><strong>Frequency:</strong> ${formData.frequency}</p>
        </div>
        ${formData.additional_notes ? `
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Additional Notes</h3>
            <p style="white-space: pre-wrap;">${formData.additional_notes}</p>
          </div>
        ` : ""}
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This request was submitted through the Wingrow Market website.
        </p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Wingrow Market <onboarding@resend.dev>",
      to: ["wingrowagritech@gmail.com"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-form-notifications function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
