import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase, DatabaseOperations } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const { searchParams } = new URL(request.url)
    const filters = {
      category: searchParams.get("category"),
      status: searchParams.get("status"),
      search: searchParams.get("search"),
    }

    const products = await dbOps.getProducts(filters)

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ success: false, error: "Name, price, and category are required" }, { status: 400 })
    }

    const product = await dbOps.createProduct(body)

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const result = await dbOps.updateProduct(_id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const dbOps = new DatabaseOperations(db)

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const result = await dbOps.deleteProduct(id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
