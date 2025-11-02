// @ts-nocheck
// Supabase edge functions run on Deno. Type checking in the editor can flag Deno globals
// and remote module imports; disable TS checking for this file to avoid editor errors.
import { serve } from 'https://deno.fresh.run/std@0.168.0/http/server.ts'

const GOOGLE_PLACES_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')
const WINGROW_PLACE_ID = Deno.env.get('WINGROW_PLACE_ID')

async function fetchGoogleReviews() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${WINGROW_PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}`
    )
    const data = await response.json()
    
    if (!data.result?.reviews) {
      throw new Error('No reviews found')
    }

    return data.result.reviews.map((review: any) => ({
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time,
      profileUrl: review.profile_photo_url,
      reviewUrl: review.author_url
    }))
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    throw error
  }
}

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      })
    }

    const reviews = await fetchGoogleReviews()
    
    return new Response(JSON.stringify({ reviews }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})