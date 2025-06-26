"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  description?: string
}

function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span>from last month</span>
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

interface DashboardStatsProps {
  stats: {
    revenue: { total: number; change: number }
    orders: { total: number; change: number }
    customers: { total: number; change: number }
    products: { total: number; lowStock: number }
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value={`$${stats.revenue.total.toLocaleString()}`}
        change={stats.revenue.change}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Orders"
        value={stats.orders.total.toLocaleString()}
        change={stats.orders.change}
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Customers"
        value={stats.customers.total.toLocaleString()}
        change={stats.customers.change}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Products"
        value={stats.products.total.toLocaleString()}
        change={0}
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
        description={`${stats.products.lowStock} low stock`}
      />
    </div>
  )
}
