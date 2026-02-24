import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MSG91_AUTH_KEY = Deno.env.get("MSG91_AUTH_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BookingData {
  referenceId: string;
  name: string;
  phone: string;
  city: string;
  market: string;
  stallType: string;
  producerType: string;
  preferredDate: string;
  address: string;
  notes: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!MSG91_AUTH_KEY) {
      throw new Error("MSG91_AUTH_KEY is not configured");
    }

    const booking: BookingData = await req.json();
    console.log("Sending WhatsApp notification for booking:", booking.referenceId);

    const message = `🌾 *New Stall Booking*

📋 *Ref:* ${booking.referenceId}
👤 *Name:* ${booking.name}
📞 *Phone:* ${booking.phone}
🏙️ *City:* ${booking.city}
📍 *Market:* ${booking.market}
🏪 *Stall:* ${booking.stallType}
👨‍🌾 *Type:* ${booking.producerType}
📅 *Date:* ${booking.preferredDate}
🏠 *Address:* ${booking.address}
${booking.notes ? `📝 *Notes:* ${booking.notes}` : ""}`;

    // MSG91 WhatsApp API - Send message
    const response = await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authkey": MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        integrated_number: "919422594061",
        content_type: "text",
        payload: {
          messaging_product: "whatsapp",
          type: "text",
          text: {
            body: message,
          },
        },
        recipients: [
          {
            mobiles: "919422594061",
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("MSG91 WhatsApp response:", JSON.stringify(data));

    if (!response.ok) {
      throw new Error(`MSG91 API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending WhatsApp:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
