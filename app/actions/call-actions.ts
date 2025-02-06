"use server"

import { z } from "zod"
import twilio from "twilio"

const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/)

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function initiateCall(phoneNumber: string) {
  try {
    const validatedPhone = phoneSchema.parse(phoneNumber)

    //When the call is made, the call will follow the instructions specified at the url
    const call = await client.calls.create({
      url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.BASE_URL}/api/twiml`,
      to: validatedPhone,
      from: process.env.TWILIO_PHONE_NUMBER ?? ''
    })

    console.log(`Call initiated with SID: ${call.sid}`)
    return { success: true, message: "Call initiated successfully. You will receive a call shortly." }
  } catch (error) {
    console.error("Error initiating call:", error)
    return { success: false, message: "Failed to initiate call. Please check the phone number and try again." }
  }
} 
