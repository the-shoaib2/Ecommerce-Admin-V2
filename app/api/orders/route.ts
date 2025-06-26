import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, DatabaseOperations } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status"),
      customer: searchParams.get("customer"),
    }

    const orders = await dbOps.getOrders(filters)

    return NextResponse.json({
      success: true,
      data: orders,
      total: orders.length,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()

    // Validate required fields
    if (!body.customer || !body.items || !body.total) {
      return NextResponse.json({ success: false, error: "Customer, items, and total are required" }, { status: 400 })
    }

    const order = await dbOps.createOrder(body)

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: "Order created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 })
    }

    const result = await dbOps.updateOrder(_id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
