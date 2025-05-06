import { NextResponse } from 'next/server';

export async function GET() {
  // Simple health check endpoint for container health monitoring
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}