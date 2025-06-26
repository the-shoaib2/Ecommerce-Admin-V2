"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  Menu,
  Edit,
  Trash2,
  Star,
  Truck,
  CreditCard,
  Percent,
  Smartphone,
  Mail,
  ImageIcon,
  FileText,
  BarChart,
  LineChart,
  RefreshCw,
  Archive,
  Store,
  Layers,
  Target,
  Wallet,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data
// const mockProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     category: "Electronics",
//     price: 99.99,
//     stock: 45,
//     status: "active",
//     sales: 234,
//     rating: 4.5,
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     category: "Electronics",
//     price: 199.99,
//     stock: 23,
//     status: "active",
//     sales: 156,
//     rating: 4.2,
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 3,
//     name: "Running Shoes",
//     category: "Sports",
//     price: 79.99,
//     stock: 67,
//     status: "active",
//     sales: 345,
//     rating: 4.7,
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 4,
//     name: "Coffee Maker",
//     category: "Home",
//     price: 149.99,
//     stock: 12,
//     status: "low_stock",
//     sales: 89,
//     rating: 4.3,
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 5,
//     name: "Laptop Bag",
//     category: "Accessories",
//     price: 49.99,
//     stock: 0,
//     status: "out_of_stock",
//     sales: 67,
//     rating: 4.1,
//     image: "/placeholder.svg?height=50&width=50",
//   },
// ]

// const mockOrders = [
//   {
//     id: "ORD-001",
//     customer: "John Doe",
//     email: "john@example.com",
//     total: 299.97,
//     status: "completed",
//     date: "2024-01-15",
//     items: 3,
//   },
//   {
//     id: "ORD-002",
//     customer: "Jane Smith",
//     email: "jane@example.com",
//     total: 149.99,
//     status: "processing",
//     date: "2024-01-14",
//     items: 1,
//   },
//   {
//     id: "ORD-003",
//     customer: "Bob Johnson",
//     email: "bob@example.com",
//     total: 79.99,
//     status: "shipped",
//     date: "2024-01-13",
//     items: 1,
//   },
//   {
//     id: "ORD-004",
//     customer: "Alice Brown",
//     email: "alice@example.com",
//     total: 199.98,
//     status: "pending",
//     date: "2024-01-12",
//     items: 2,
//   },
//   {
//     id: "ORD-005",
//     customer: "Charlie Wilson",
//     email: "charlie@example.com",
//     total: 99.99,
//     status: "cancelled",
//     date: "2024-01-11",
//     items: 1,
//   },
// ]

// const mockCustomers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     orders: 12,
//     spent: 1299.88,
//     joined: "2023-06-15",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     orders: 8,
//     spent: 899.92,
//     joined: "2023-08-22",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     orders: 15,
//     spent: 2199.85,
//     joined: "2023-03-10",
//     status: "vip",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 4,
//     name: "Alice Brown",
//     email: "alice@example.com",
//     orders: 3,
//     spent: 299.97,
//     joined: "2023-11-05",
//     status: "new",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 5,
//     name: "Charlie Wilson",
//     email: "charlie@example.com",
//     orders: 0,
//     spent: 0,
//     joined: "2024-01-01",
//     status: "inactive",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ]

// const mockCategories = [
//   { id: 1, name: "Electronics", products: 45, description: "Electronic devices and gadgets", status: "active" },
//   { id: 2, name: "Sports", products: 23, description: "Sports equipment and apparel", status: "active" },
//   { id: 3, name: "Home", products: 67, description: "Home and kitchen appliances", status: "active" },
//   { id: 4, name: "Accessories", products: 34, description: "Fashion and tech accessories", status: "active" },
//   { id: 5, name: "Books", products: 12, description: "Books and educational materials", status: "inactive" },
// ]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [categories, setCategories] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Dashboard stats
  const totalRevenue = analytics?.revenue?.totalRevenue || 0
  const totalOrders = analytics?.revenue?.totalOrders || 0
  const totalCustomers = analytics?.customers?.totalCustomers || 0
  const totalProducts = analytics?.products?.totalProducts || 0
  const lowStockProducts = analytics?.products?.lowStockProducts || 0
  const outOfStockProducts = analytics?.products?.outOfStockProducts || 0

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "active",
    sku: "",
    weight: "",
    dimensions: "",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    featured: false,
    onSale: false,
    salePrice: "",
    images: [],
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      await Promise.all([fetchProducts(), fetchOrders(), fetchCustomers(), fetchCategories(), fetchAnalytics()])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const result = await response.json()
      if (result.success) {
        setProducts(result.data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const result = await response.json()
      if (result.success) {
        setOrders(result.data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers")
      const result = await response.json()
      if (result.success) {
        setCustomers(result.data)
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const result = await response.json()
      if (result.success) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics")
      const result = await response.json()
      if (result.success) {
        setAnalytics(result.data)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    }
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditMode ? "/api/products" : "/api/products"
      const method = isEditMode ? "PUT" : "POST"
      const body = isEditMode ? { _id: selectedProduct._id, ...productForm } : productForm

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (result.success) {
        await fetchProducts()
        setIsProductDialogOpen(false)
        resetProductForm()
      } else {
        console.error("Error saving product:", result.error)
      }
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setProductForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price?.toString() || "",
      stock: product.stock?.toString() || "",
      description: product.description || "",
      status: product.status || "active",
      sku: product.sku || "",
      weight: product.weight || "",
      dimensions: product.dimensions || "",
      tags: product.tags || "",
      seoTitle: product.seoTitle || "",
      seoDescription: product.seoDescription || "",
      featured: product.featured || false,
      onSale: product.onSale || false,
      salePrice: product.salePrice?.toString() || "",
      images: product.images || [],
    })
    setIsEditMode(true)
    setIsProductDialogOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        await fetchProducts()
      } else {
        console.error("Error deleting product:", result.error)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Store className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">ECommerce Admin</h1>
        </div>
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingCart },
            { id: "customers", label: "Customers", icon: Users },
            { id: "categories", label: "Categories", icon: Layers },
            { id: "inventory", label: "Inventory", icon: Archive },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "marketing", label: "Marketing", icon: Target },
            { id: "discounts", label: "Discounts", icon: Percent },
            { id: "shipping", label: "Shipping", icon: Truck },
            { id: "payments", label: "Payments", icon: CreditCard },
            { id: "reviews", label: "Reviews", icon: Star },
            { id: "reports", label: "Reports", icon: FileText },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )

  const resetProductForm = () => {
    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      status: "active",
      sku: "",
      weight: "",
      dimensions: "",
      tags: "",
      seoTitle: "",
      seoDescription: "",
      featured: false,
      onSale: false,
      salePrice: "",
      images: [],
    })
    setIsEditMode(false)
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {activeTab.replace(/([A-Z])/g, " $1").trim()}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <p className="text-xs text-muted-foreground">{lowStockProducts} low stock</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <BarChart className="h-16 w-16" />
                      <span className="ml-2">Sales Chart Placeholder</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total}</p>
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "processing"
                                    ? "secondary"
                                    : order.status === "shipped"
                                      ? "outline"
                                      : order.status === "pending"
                                        ? "destructive"
                                        : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={() => setActiveTab("products")} className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      Add Product
                    </Button>
                    <Button onClick={() => setActiveTab("orders")} variant="outline" className="h-20 flex-col">
                      <Eye className="h-6 w-6 mb-2" />
                      View Orders
                    </Button>
                    <Button onClick={() => setActiveTab("customers")} variant="outline" className="h-20 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Manage Users
                    </Button>
                    <Button onClick={() => setActiveTab("analytics")} variant="outline" className="h-20 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Products Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">Products Management</h3>
                  <p className="text-sm text-muted-foreground">Manage your product inventory</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Button onClick={() => setIsProductDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              {/* Products Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>
                            <Badge variant={product.stock < 20 ? "destructive" : "default"}>{product.stock}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "low_stock"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {product.status.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              {product.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Product Dialog */}
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {isEditMode ? "Update product information" : "Create a new product for your store"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit}>
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={productForm.category}
                              onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Home">Home</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                                <SelectItem value="Books">Books</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="salePrice">Sale Price ($)</Label>
                            <Input
                              id="salePrice"
                              type="number"
                              step="0.01"
                              value={productForm.salePrice}
                              onChange={(e) => setProductForm({ ...productForm, salePrice: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="featured"
                              checked={productForm.featured}
                              onCheckedChange={(checked) => setProductForm({ ...productForm, featured: checked })}
                            />
                            <Label htmlFor="featured">Featured Product</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="onSale"
                              checked={productForm.onSale}
                              onCheckedChange={(checked) => setProductForm({ ...productForm, onSale: checked })}
                            />
                            <Label htmlFor="onSale">On Sale</Label>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="inventory" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={productForm.stock}
                              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="sku">SKU</Label>
                            <Input
                              id="sku"
                              value={productForm.sku}
                              onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                              id="weight"
                              type="number"
                              step="0.01"
                              value={productForm.weight}
                              onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
                            <Input
                              id="dimensions"
                              value={productForm.dimensions}
                              onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                              placeholder="20×15×10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={productForm.status}
                            onValueChange={(value) => setProductForm({ ...productForm, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TabsContent>

                      <TabsContent value="seo" className="space-y-4">
                        <div>
                          <Label htmlFor="seoTitle">SEO Title</Label>
                          <Input
                            id="seoTitle"
                            value={productForm.seoTitle}
                            onChange={(e) => setProductForm({ ...productForm, seoTitle: e.target.value })}
                            placeholder="Optimized title for search engines"
                          />
                        </div>
                        <div>
                          <Label htmlFor="seoDescription">SEO Description</Label>
                          <Textarea
                            id="seoDescription"
                            value={productForm.seoDescription}
                            onChange={(e) => setProductForm({ ...productForm, seoDescription: e.target.value })}
                            placeholder="Meta description for search engines"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={productForm.tags}
                            onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                            placeholder="electronics, gadget, wireless"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="advanced" className="space-y-4">
                        <div className="text-center py-8">
                          <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">Image upload functionality</p>
                          <Button variant="outline" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Images
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                      <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{isEditMode ? "Update Product" : "Create Product"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Orders Management</h3>
                  <p className="text-sm text-muted-foreground">Track and manage customer orders</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">{order.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>${order.total}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "processing"
                                    ? "secondary"
                                    : order.status === "shipped"
                                      ? "outline"
                                      : order.status === "pending"
                                        ? "destructive"
                                        : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Customer Management</h3>
                  <p className="text-sm text-muted-foreground">Manage your customer base</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{customer.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.orders}</TableCell>
                          <TableCell>${customer.spent.toFixed(2)}</TableCell>
                          <TableCell>{customer.joined}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                customer.status === "active"
                                  ? "default"
                                  : customer.status === "vip"
                                    ? "secondary"
                                    : customer.status === "new"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Categories</h3>
                  <p className="text-sm text-muted-foreground">Organize your products</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <Badge variant={category.status === "active" ? "default" : "secondary"}>
                          {category.status}
                        </Badge>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{category.products} products</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Track your business performance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <Progress value={32} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$127.50</div>
                    <Progress value={65} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.1%</div>
                    <Progress value={21} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <Progress value={96} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <LineChart className="h-16 w-16" />
                      <span className="ml-2">Revenue Chart Placeholder</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.slice(0, 5).map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">#{index + 1}</span>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-8 w-8 rounded object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{product.sales} sales</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your store settings</p>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="storeName">Store Name</Label>
                          <Input id="storeName" defaultValue="My E-commerce Store" />
                        </div>
                        <div>
                          <Label htmlFor="storeEmail">Store Email</Label>
                          <Input id="storeEmail" type="email" defaultValue="store@example.com" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="storeDescription">Store Description</Label>
                        <Textarea id="storeDescription" defaultValue="Your one-stop shop for amazing products" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currency">Currency</Label>
                          <Select defaultValue="USD">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="UTC">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">EST</SelectItem>
                              <SelectItem value="PST">PST</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit Cards</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5" />
                          <span>PayPal</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wallet className="h-5 w-5" />
                          <span>Apple Pay</span>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Free Shipping</p>
                          <p className="text-sm text-muted-foreground">Orders over $50</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">International Shipping</p>
                          <p className="text-sm text-muted-foreground">Worldwide delivery</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified of new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Low Stock Alerts</p>
                          <p className="text-sm text-muted-foreground">Alert when products are low in stock</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Updates</p>
                          <p className="text-sm text-muted-foreground">Receive marketing insights</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">API Access</p>
                          <p className="text-sm text-muted-foreground">Allow third-party integrations</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Additional tabs for other features */}
          {["inventory", "marketing", "discounts", "shipping", "payments", "reviews", "reports"].includes(
            activeTab,
          ) && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {activeTab === "inventory" && <Archive className="h-12 w-12 text-gray-400" />}
                  {activeTab === "marketing" && <Target className="h-12 w-12 text-gray-400" />}
                  {activeTab === "discounts" && <Percent className="h-12 w-12 text-gray-400" />}
                  {activeTab === "shipping" && <Truck className="h-12 w-12 text-gray-400" />}
                  {activeTab === "payments" && <CreditCard className="h-12 w-12 text-gray-400" />}
                  {activeTab === "reviews" && <Star className="h-12 w-12 text-gray-400" />}
                  {activeTab === "reports" && <FileText className="h-12 w-12 text-gray-400" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize">{activeTab} Management</h3>
                <p className="text-gray-500 mb-4">
                  This section is under development. Advanced {activeTab} features will be available soon.
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New {activeTab.slice(0, -1)}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
