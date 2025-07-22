"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Dot,
} from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Define a type for the chart components
type ChartComponent = typeof LineChart | typeof BarChart | typeof AreaChart | React.FC<any> // Fallback for other chart types

type ChartProps = React.ComponentProps<typeof ChartContainer> & {
  children: React.ReactNode
  config: ChartConfig
  className?: string
  chartType?: "line" | "bar" | "area"
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      children,
      config,
      className,
      chartType = "line", // Default chart type
      ...props
    },
    ref,
  ) => {
    const ChartComponent = React.useMemo(() => {
      switch (chartType) {
        case "line":
          return LineChart
        case "bar":
          return BarChart
        case "area":
          return AreaChart
        default:
          return LineChart // Fallback
      }
    }, [chartType])

    return (
      <ChartContainer ref={ref} config={config} className={cn("min-h-[200px] w-full", className)} {...props}>
        <ResponsiveContainer>
          <ChartComponent accessibilityLayer data={props.data}>
            {children}
          </ChartComponent>
        </ResponsiveContainer>
      </ChartContainer>
    )
  },
)
Chart.displayName = "Chart"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Bar,
  Area,
  Dot,
}
