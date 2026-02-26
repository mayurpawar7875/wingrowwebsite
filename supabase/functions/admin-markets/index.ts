import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password, x-admin-username",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const adminPassword = req.headers.get("x-admin-password") || "";
  const adminUsername = req.headers.get("x-admin-username") || "";

  // Verify admin credentials
  const { data: settings } = await supabase
    .from("admin_settings")
    .select("setting_key, setting_value")
    .in("setting_key", ["admin_password", "admin_username"]);

  const stored: Record<string, string> = {};
  settings?.forEach((s: any) => { stored[s.setting_key] = s.setting_value; });

  if (adminUsername !== stored.admin_username || adminPassword !== stored.admin_password) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const resource = url.searchParams.get("resource") || "markets";
  const method = req.method;

  try {
    // ---- WOMEN MARKET SCHEDULE ----
    if (resource === "women_schedule") {
      if (method === "GET") {
        const { data, error } = await supabase
          .from("women_market_schedule")
          .select("*")
          .order("city")
          .order("date");
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await req.json();

      if (method === "POST") {
        const { data, error } = await supabase
          .from("women_market_schedule")
          .insert({
            city: body.city,
            date: body.date,
            day: body.day,
            venue: body.venue,
            slots_total: body.slots_total ?? 40,
            slots_remaining: body.slots_remaining ?? 40,
            is_active: body.is_active ?? true,
          })
          .select()
          .single();
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (method === "PUT") {
        const { data, error } = await supabase
          .from("women_market_schedule")
          .update({
            city: body.city,
            date: body.date,
            day: body.day,
            venue: body.venue,
            slots_total: body.slots_total,
            slots_remaining: body.slots_remaining,
            is_active: body.is_active,
          })
          .eq("id", body.id)
          .select()
          .single();
        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (method === "DELETE") {
        const { error } = await supabase.from("women_market_schedule").delete().eq("id", body.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ---- MARKETS (default) ----
    if (method === "GET") {
      const { data, error } = await supabase
        .from("markets")
        .select("*")
        .order("city")
        .order("market_name");

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    if (method === "POST") {
      const { data, error } = await supabase
        .from("markets")
        .insert({ city: body.city, market_name: body.market_name, is_active: body.is_active ?? true })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "PUT") {
      const { data, error } = await supabase
        .from("markets")
        .update({ city: body.city, market_name: body.market_name, is_active: body.is_active })
        .eq("id", body.id)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      const { error } = await supabase.from("markets").delete().eq("id", body.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
