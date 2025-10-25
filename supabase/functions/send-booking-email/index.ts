import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  market: string;
  stallSize: string;
  preferredDates: string;
  hasElectricity: boolean;
  additionalRequirements?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Received booking data:", bookingData);

    const emailHtml = `
      <h1>New Stall Booking Request</h1>
      <h2>Reference ID: ${bookingData.referenceId}</h2>
      
      <h3>Farmer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${bookingData.name}</li>
        <li><strong>Phone:</strong> ${bookingData.phone}</li>
        <li><strong>Email:</strong> ${bookingData.email}</li>
      </ul>
      
      <h3>Stall Details:</h3>
      <ul>
        <li><strong>City:</strong> ${bookingData.city}</li>
        <li><strong>Market:</strong> ${bookingData.market}</li>
        <li><strong>Stall Size:</strong> ${bookingData.stallSize}</li>
        <li><strong>Preferred Dates:</strong> ${bookingData.preferredDates}</li>
        <li><strong>Electricity Required:</strong> ${bookingData.hasElectricity ? 'Yes' : 'No'}</li>
        ${bookingData.additionalRequirements ? `<li><strong>Additional Requirements:</strong> ${bookingData.additionalRequirements}</li>` : ''}
      </ul>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "WinGrow Bookings <onboarding@resend.dev>",
        to: ["wingrowagritech@gmail.com"],
        subject: `New Stall Booking - ${bookingData.referenceId}`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending booking email:", error);
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
