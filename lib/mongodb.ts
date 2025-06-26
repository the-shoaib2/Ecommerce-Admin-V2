import { MongoClient, type Db, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "ecommerce_admin"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export const collections = {
  products: "products",
  orders: "orders",
  customers: "customers",
  categories: "categories",
  users: "users",
  analytics: "analytics",
}

// Database operations
export class DatabaseOperations {
  private db: Db

  constructor(db: Db) {
    this.db = db
  }

  // Products operations
  async getProducts(filters: any = {}) {
    const collection = this.db.collection(collections.products)
    const query: any = {}

    if (filters.category) {
      query.category = filters.category
    }
    if (filters.status) {
      query.status = filters.status
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ]
    }

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async createProduct(productData: any) {
    const collection = this.db.collection(collections.products)
    const product = {
      ...productData,
      sales: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await collection.insertOne(product)
    return { ...product, _id: result.insertedId }
  }

  async updateProduct(id: string, updateData: any) {
    const collection = this.db.collection(collections.products)
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
    )
    return result
  }

  async deleteProduct(id: string) {
    const collection = this.db.collection(collections.products)
    return await collection.deleteOne({ _id: new ObjectId(id) })
  }

  // Orders operations
  async getOrders(filters: any = {}) {
    const collection = this.db.collection(collections.orders)
    const query: any = {}

    if (filters.status) {
      query.status = filters.status
    }
    if (filters.customer) {
      query.$or = [
        { "customer.name": { $regex: filters.customer, $options: "i" } },
        { "customer.email": { $regex: filters.customer, $options: "i" } },
      ]
    }

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async createOrder(orderData: any) {
    const collection = this.db.collection(collections.orders)
    const order = {
      ...orderData,
      orderId: this.generateOrderId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await collection.insertOne(order)
    return { ...order, _id: result.insertedId }
  }

  async updateOrder(id: string, updateData: any) {
    const collection = this.db.collection(collections.orders)
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
  }

  // Customers operations
  async getCustomers(filters: any = {}) {
    const collection = this.db.collection(collections.customers)
    const query: any = {}

    if (filters.status) {
      query.status = filters.status
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { email: { $regex: filters.search, $options: "i" } },
      ]
    }

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async createCustomer(customerData: any) {
    const collection = this.db.collection(collections.customers)
    const customer = {
      ...customerData,
      orders: 0,
      totalSpent: 0,
      status: "new",
      joinedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await collection.insertOne(customer)
    return { ...customer, _id: result.insertedId }
  }

  async updateCustomer(id: string, updateData: any) {
    const collection = this.db.collection(collections.customers)
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
  }

  // Categories operations
  async getCategories(filters: any = {}) {
    const collection = this.db.collection(collections.categories)
    const query: any = {}

    if (filters.status) {
      query.status = filters.status
    }

    return await collection.find(query).sort({ name: 1 }).toArray()
  }

  async createCategory(categoryData: any) {
    const collection = this.db.collection(collections.categories)
    const category = {
      ...categoryData,
      products: 0,
      slug: categoryData.name.toLowerCase().replace(/\s+/g, "-"),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await collection.insertOne(category)
    return { ...category, _id: result.insertedId }
  }

  async updateCategory(id: string, updateData: any) {
    const collection = this.db.collection(collections.categories)
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
  }

  async deleteCategory(id: string) {
    const collection = this.db.collection(collections.categories)
    return await collection.deleteOne({ _id: new ObjectId(id) })
  }

  // Analytics operations
  async getAnalytics(period = "30d") {
    const ordersCollection = this.db.collection(collections.orders)
    const productsCollection = this.db.collection(collections.products)
    const customersCollection = this.db.collection(collections.customers)

    const dateFilter = this.getDateFilter(period)

    // Get revenue data
    const revenueData = await ordersCollection
      .aggregate([
        { $match: { createdAt: { $gte: dateFilter }, status: { $in: ["completed", "shipped"] } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total" },
            totalOrders: { $sum: 1 },
            avgOrderValue: { $avg: "$total" },
          },
        },
      ])
      .toArray()

    // Get customer data
    const customerData = await customersCollection
      .aggregate([
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: 1 },
            newCustomers: {
              $sum: {
                $cond: [{ $gte: ["$createdAt", dateFilter] }, 1, 0],
              },
            },
          },
        },
      ])
      .toArray()

    // Get product data
    const productData = await productsCollection
      .aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            lowStockProducts: {
              $sum: {
                $cond: [{ $lt: ["$stock", 20] }, 1, 0],
              },
            },
            outOfStockProducts: {
              $sum: {
                $cond: [{ $eq: ["$stock", 0] }, 1, 0],
              },
            },
          },
        },
      ])
      .toArray()

    // Get top selling products
    const topProducts = await productsCollection.find({}).sort({ sales: -1 }).limit(5).toArray()

    return {
      revenue: revenueData[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 },
      customers: customerData[0] || { totalCustomers: 0, newCustomers: 0 },
      products: productData[0] || { totalProducts: 0, lowStockProducts: 0, outOfStockProducts: 0 },
      topProducts,
    }
  }

  private getDateFilter(period: string): Date {
    const now = new Date()
    switch (period) {
      case "7d":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case "30d":
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      case "90d":
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }
  }

  private generateOrderId(): string {
    const prefix = "ORD"
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}-${timestamp}${random}`
  }
}

// Initialize database indexes
export async function initializeDatabase() {
  const { db } = await connectToDatabase()

  // Create indexes for better performance
  await db.collection(collections.products).createIndex({ name: "text", description: "text" })
  await db.collection(collections.products).createIndex({ category: 1 })
  await db.collection(collections.products).createIndex({ status: 1 })
  await db.collection(collections.products).createIndex({ sku: 1 }, { unique: true })
  await db.collection(collections.products).createIndex({ createdAt: -1 })

  await db.collection(collections.orders).createIndex({ orderId: 1 }, { unique: true })
  await db.collection(collections.orders).createIndex({ "customer.email": 1 })
  await db.collection(collections.orders).createIndex({ status: 1 })
  await db.collection(collections.orders).createIndex({ createdAt: -1 })

  await db.collection(collections.customers).createIndex({ email: 1 }, { unique: true })
  await db.collection(collections.customers).createIndex({ status: 1 })
  await db.collection(collections.customers).createIndex({ joinedAt: -1 })

  await db.collection(collections.categories).createIndex({ slug: 1 }, { unique: true })
  await db.collection(collections.categories).createIndex({ status: 1 })

  console.log("Database indexes created successfully")
}

// Database schemas and interfaces
export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  salePrice?: number
  category: string
  sku: string
  stock: number
  status: "active" | "inactive" | "draft"
  images: string[]
  tags: string[]
  weight?: number
  dimensions?: string
  seoTitle?: string
  seoDescription?: string
  featured: boolean
  onSale: boolean
  sales: number
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id?: string
  orderId: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    total: number
  }>
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: string
  billingAddress: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  _id?: string
  name: string
  email: string
  phone: string
  address: string
  orders: number
  totalSpent: number
  status: "active" | "inactive" | "vip" | "new"
  joinedAt: Date
  lastOrderAt?: Date
  preferences: {
    newsletter: boolean
    sms: boolean
    emailOffers: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id?: string
  name: string
  description: string
  slug: string
  products: number
  status: "active" | "inactive"
  parentId?: string
  image?: string
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}
