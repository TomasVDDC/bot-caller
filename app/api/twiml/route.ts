import { NextResponse } from 'next/server'

export async function POST() {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello! Thank you for testing this application.</Say>
</Response>`

  return new NextResponse(twiml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
} 