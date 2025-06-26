import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, DatabaseOperations } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"
    const metric = searchParams.get("metric")

    const analytics = await dbOps.getAnalytics(period)

    if (metric && analytics[metric]) {
      return NextResponse.json({
        success: true,
        data: analytics[metric],
      })
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      period,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}
