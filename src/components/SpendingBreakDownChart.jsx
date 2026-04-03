import React from "react";
import { useAppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F43F5E",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

const SpendingBreakdownChart = () => {
  const { transactions, theme } = useAppContext();

  const calculateSpendingByCategory = () => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryTotals = {};

    expenses.forEach((transaction) => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
      .sort((a, b) => b.value - a.value);
  };

  const data = calculateSpendingByCategory();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold">{payload[0].name}</p>
          <p
            className="text-lg font-bold"
            style={{ color: payload[0].payload.fill }}
          >
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="col-span-1 p-6 rounded-2xl border bg-card shadow-sm"
      data-testid="spending-breakdown-chart"
    >
      <h3 className="text-xl font-semibold tracking-tight mb-4">
        Spending Breakdown
      </h3>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.slice(0, 3).map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          No expense data available
        </div>
      )}
    </div>
  );
};

export default SpendingBreakdownChart;
