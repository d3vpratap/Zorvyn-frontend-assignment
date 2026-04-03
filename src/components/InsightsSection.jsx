import React from "react";
import { useAppContext } from "../context/AppContext";
import { TrendingUp, AlertCircle, Calendar } from "lucide-react";

const InsightsSection = () => {
  const { transactions } = useAppContext();

  const calculateInsights = () => {
    const expenses = transactions.filter((t) => t.type === "expense");

    const categoryTotals = {};
    expenses.forEach((transaction) => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });

    const highestCategory = Object.entries(categoryTotals).sort(
      ([, a], [, b]) => b - a,
    )[0];

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const thisMonthExpenses = expenses
      .filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = expenses
      .filter((t) => {
        const date = new Date(t.date);
        return (
          date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyChange =
      lastMonthExpenses > 0
        ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0;

    const avgTransaction =
      expenses.length > 0
        ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length
        : 0;

    return {
      highestCategory: highestCategory
        ? { name: highestCategory[0], amount: highestCategory[1] }
        : null,
      monthlyChange,
      thisMonthExpenses,
      lastMonthExpenses,
      avgTransaction,
    };
  };

  const insights = calculateInsights();

  return (
    <div
      className="col-span-1 p-6 rounded-2xl border bg-card shadow-sm bg-gradient-to-br from-amber-500/10 to-orange-500/10"
      data-testid="insights-section"
    >
      <h3 className="text-xl font-semibold tracking-tight mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-amber-500" />
        Insights
      </h3>

      <div className="space-y-4">
        {insights.highestCategory && (
          <div className="p-3 rounded-lg bg-background/50">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Top Spending Category</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-semibold text-foreground">
                    {insights.highestCategory.name}
                  </span>{" "}
                  - ${insights.highestCategory.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 rounded-lg bg-background/50">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Monthly Comparison</p>
              <p className="text-xs text-muted-foreground mt-1">
                {insights.monthlyChange >= 0 ? (
                  <span>
                    You spent{" "}
                    <span
                      className={`font-semibold ${insights.monthlyChange > 10 ? "text-rose-500" : "text-foreground"}`}
                    >
                      {insights.monthlyChange.toFixed(1)}% more
                    </span>{" "}
                    this month
                  </span>
                ) : (
                  <span>
                    You spent{" "}
                    <span className="font-semibold text-emerald-500">
                      {Math.abs(insights.monthlyChange).toFixed(1)}% less
                    </span>{" "}
                    this month
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-background/50">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Average Transaction</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your average expense is{" "}
                <span className="font-semibold text-foreground">
                  ${insights.avgTransaction.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
