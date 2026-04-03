import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = () => {
  const { transactions, theme } = useAppContext();

  const calculateBalanceTrend = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let runningBalance = 0;
    const trendData = sortedTransactions.map((transaction) => {
      if (transaction.type === "income") {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }
      return {
        date: new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        balance: parseFloat(runningBalance.toFixed(2)),
      };
    });

    return trendData;
  };

  const data = calculateBalanceTrend();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-blue-500">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-2xl border bg-card shadow-sm"
      data-testid="balance-trend-chart"
    >
      <h3 className="text-xl font-semibold tracking-tight mb-4">
        Balance Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={
              theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke={theme === "dark" ? "#94A3B8" : "#64748B"}
            style={{ fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke={theme === "dark" ? "#94A3B8" : "#64748B"}
            style={{ fontSize: "12px" }}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
