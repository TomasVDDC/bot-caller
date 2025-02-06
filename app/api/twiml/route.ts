import { NextResponse } from 'next/server'
import twilio from 'twilio'
import { headers } from 'next/headers'

export async function POST() {
  const headersList = await headers()
  const twilioSignature = headersList.get('x-twilio-signature')
  const url = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.BASE_URL}/api/twiml`
  
  // Validate the request is coming from Twilio
  const requestIsValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    twilioSignature!,
    url,
    {} // Add request body if you're expecting parameters
  )

  if (!requestIsValid) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello! Thank you for testing this application.</Say>
</Response>`

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
} 