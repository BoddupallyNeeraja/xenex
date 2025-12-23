import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { validateContactSubmission, sanitizeContactSubmission } from '@/lib/validations/contact'
import type { ContactSubmissionRequest, ContactSubmissionResponse } from '@/lib/types/contact'

/**
 * POST /api/contact
 * 
 * Handles contact form submissions
 * 
 * Security:
 * - Server-side validation
 * - Input sanitization
 * - Rate limiting ready (can be added)
 * - Uses service role key (bypasses RLS) or anon key with proper RLS policies
 * 
 * @param request - HTTP request with contact form data
 * @returns JSON response with success/error status
 */
export async function POST(request: Request): Promise<NextResponse<ContactSubmissionResponse>> {
  try {
    // Parse request body
    let body: ContactSubmissionRequest
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          error: 'Invalid request format'
        },
        { status: 400 }
      )
    }

    // Validate input data
    const validationErrors = validateContactSubmission(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: validationErrors.map(e => `${e.field}: ${e.message}`).join(', '),
          details: JSON.stringify(validationErrors)
        },
        { status: 400 }
      )
    }

    // Sanitize data
    const sanitizedData = sanitizeContactSubmission(body)

    // Get Supabase configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database configuration error',
          error: 'Missing Supabase environment variables'
        },
        { status: 500 }
      )
    }

    // Use direct REST API call to bypass client library issues
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sanitizedData)
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('Supabase REST API error:', responseData)
        
        let errorMessage = 'Failed to save submission'
        let statusCode = response.status || 500

        if (responseData.code === 'PGRST116' || responseData.message?.includes('does not exist')) {
          errorMessage = 'Database table not found. Please contact administrator.'
        } else if (responseData.code === '42501' || responseData.message?.includes('permission denied')) {
          errorMessage = 'Permission denied. Please check database permissions.'
          statusCode = 403
        } else if (responseData.code === '23505') {
          errorMessage = 'A submission with this email already exists.'
          statusCode = 409
        } else if (responseData.message) {
          errorMessage = responseData.message
        }

        return NextResponse.json(
          {
            success: false,
            message: errorMessage,
            error: responseData.message || 'Database error',
            details: responseData.details || responseData.hint
          },
          { status: statusCode }
        )
      }

      // Success response
      const insertedData = Array.isArray(responseData) ? responseData[0] : responseData
      
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your submission has been received.',
          data: insertedData
        },
        { status: 201 }
      )

    } catch (fetchError: any) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to connect to database',
          error: fetchError.message || 'Network error'
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    // Handle unexpected errors
    console.error('Unexpected error in contact API:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: error.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/contact
 * 
 * Health check endpoint
 * Can be used to verify API is working
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Contact API is operational',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  )
}
