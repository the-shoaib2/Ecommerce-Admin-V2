import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for the admin panel
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function generateSKU(name: string, category: string): string {
  const nameCode = name.substring(0, 3).toUpperCase()
  const categoryCode = category.substring(0, 2).toUpperCase()
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${categoryCode}-${nameCode}-${randomNum}`
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function getStatusColor(status: string): string {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    shipped: "bg-purple-100 text-purple-800",
    draft: "bg-gray-100 text-gray-800",
    low_stock: "bg-orange-100 text-orange-800",
    out_of_stock: "bg-red-100 text-red-800",
    vip: "bg-purple-100 text-purple-800",
    new: "bg-blue-100 text-blue-800",
  }
  return statusColors[status] || "bg-gray-100 text-gray-800"
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function exportToCSV(data: any[], filename: string): void {
  const csvContent = convertToCSV(data)
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ""

  const headers = Object.keys(data[0])
  const csvHeaders = headers.join(",")

  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header]
        return typeof value === "string" ? `"${value}"` : value
      })
      .join(","),
  )

  return [csvHeaders, ...csvRows].join("\n")
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-$$$$]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

export function generateOrderId(): string {
  const prefix = "ORD"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}-${timestamp}${random}`
}

export function calculateTax(amount: number, taxRate = 0.08): number {
  return Math.round(amount * taxRate * 100) / 100
}

export function calculateShipping(weight: number, distance = 100): number {
  const baseRate = 5.99
  const weightRate = weight * 0.5
  const distanceRate = distance * 0.01
  return Math.round((baseRate + weightRate + distanceRate) * 100) / 100
}
