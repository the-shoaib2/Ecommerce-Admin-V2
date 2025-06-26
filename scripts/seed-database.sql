-- MongoDB seed data script
-- Run this after connecting to MongoDB to populate initial data

-- Sample Products
db.products.insertMany([
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    category: "Electronics",
    sku: "EL-WBH-001",
    stock: 50,
    status: "active",
    images: ["/placeholder.svg?height=300&width=300"],
    tags: ["wireless", "bluetooth", "headphones", "audio"],
    weight: 0.25,
    dimensions: "20x15x8",
    seoTitle: "Premium Wireless Bluetooth Headphones - 30Hr Battery",
    seoDescription: "Experience superior sound quality with our wireless Bluetooth headphones featuring noise cancellation and long battery life.",
    featured: true,
    onSale: false,
    sales: 0,
    rating: 0,
    reviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.",
    price: 199.99,
    salePrice: 149.99,
    category: "Electronics",
    sku: "EL-SFW-002",
    stock: 30,
    status: "active",
    images: ["/placeholder.svg?height=300&width=300"],
    tags: ["smartwatch", "fitness", "health", "gps"],
    weight: 0.05,
    dimensions: "4x4x1",
    seoTitle: "Smart Fitness Watch with GPS and Heart Rate Monitor",
    seoDescription: "Track your fitness goals with our advanced smartwatch featuring GPS, heart rate monitoring, and smartphone integration.",
    featured: true,
    onSale: true,
    sales: 0,
    rating: 0,
    reviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
    price: 299.99,
    category: "Furniture",
    sku: "FU-EOC-003",
    stock: 15,
    status: "active",
    images: ["/placeholder.svg?height=300&width=300"],
    tags: ["office", "chair", "ergonomic", "furniture"],
    weight: 15.5,
    dimensions: "60x60x120",
    seoTitle: "Ergonomic Office Chair with Lumbar Support",
    seoDescription: "Improve your work comfort with our ergonomic office chair featuring adjustable height and lumbar support.",
    featured: false,
    onSale: false,
    sales: 0,
    rating: 0,
    reviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

-- Sample Categories
db.categories.insertMany([
  {
    name: "Electronics",
    description: "Electronic devices, gadgets, and accessories",
    slug: "electronics",
    products: 0,
    status: "active",
    seoTitle: "Electronics - Latest Gadgets and Devices",
    seoDescription: "Discover the latest electronic devices, gadgets, and accessories at competitive prices.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Furniture",
    description: "Home and office furniture",
    slug: "furniture",
    products: 0,
    status: "active",
    seoTitle: "Furniture - Home and Office Solutions",
    seoDescription: "Quality furniture for your home and office spaces. Comfortable, stylish, and affordable.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
    slug: "sports-outdoors",
    products: 0,
    status: "active",
    seoTitle: "Sports & Outdoors - Equipment and Gear",
    seoDescription: "Get active with our sports equipment and outdoor gear. Quality products for all your adventures.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Home & Garden",
    description: "Home improvement and garden supplies",
    slug: "home-garden",
    products: 0,
    status: "active",
    seoTitle: "Home & Garden - Improvement and Supplies",
    seoDescription: "Transform your home and garden with our quality improvement supplies and tools.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

-- Sample Customers
db.customers.insertMany([
  {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1-555-0101",
    address: "123 Main Street, Anytown, ST 12345",
    orders: 0,
    totalSpent: 0,
    status: "new",
    joinedAt: new Date(),
    preferences: {
      newsletter: true,
      sms: false,
      emailOffers: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-0102",
    address: "456 Oak Avenue, Somewhere, ST 67890",
    orders: 0,
    totalSpent: 0,
    status: "new",
    joinedAt: new Date(),
    preferences: {
      newsletter: true,
      sms: true,
      emailOffers: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

-- Update category product counts
db.categories.updateOne(
  { slug: "electronics" },
  { $set: { products: 2 } }
)

db.categories.updateOne(
  { slug: "furniture" },
  { $set: { products: 1 } }
)

print("Database seeded successfully!")
