import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, DatabaseOperations } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status"),
      search: searchParams.get("search"),
    }

    const customers = await dbOps.getCustomers(filters)

    return NextResponse.json({
      success: true,
      data: customers,
      total: customers.length,
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 })
    }

    const customer = await dbOps.createCustomer(body)

    return NextResponse.json(
      {
        success: true,
        data: customer,
        message: "Customer created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating customer:", error)
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 })
    }
    return NextResponse.json({ success: false, error: "Failed to create customer" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json({ success: false, error: "Customer ID is required" }, { status: 400 })
    }

    const result = await dbOps.updateCustomer(_id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
    })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ success: false, error: "Failed to update customer" }, { status: 500 })
  }
}
