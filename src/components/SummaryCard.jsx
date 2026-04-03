import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const SummaryCards = () => {
  const { transactions } = useAppContext();

  const calculateStats = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const thisMonthExpenses = transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          t.type === "expense" &&
          date.getMonth() === thisMonth &&
          date.getFullYear() === thisYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          t.type === "expense" &&
          date.getMonth() === lastMonth &&
          date.getFullYear() === lastMonthYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseChange =
      lastMonthExpenses > 0
        ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0;

    return { balance, income, expenses, expenseChange };
  };

  const { balance, income, expenses, expenseChange } = calculateStats();

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: DollarSign,
      color: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-500",
      testId: "balance-card",
    },
    {
      title: "Income",
      value: income,
      icon: TrendingUp,
      color: "from-emerald-500/10 to-emerald-600/10",
      iconColor: "text-emerald-500",
      testId: "income-card",
    },
    {
      title: "Expenses",
      value: expenses,
      icon: TrendingDown,
      color: "from-rose-500/10 to-rose-600/10",
      iconColor: "text-rose-500",
      change: expenseChange,
      testId: "expenses-card",
    },
  ];

  return (
    <>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`col-span-1 stat-card p-6 rounded-2xl border bg-card shadow-sm bg-gradient-to-br ${card.color}`}
            data-testid={card.testId}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {card.title}
                </p>
                <p
                  className="text-4xl font-bold tracking-tighter mt-2"
                  data-testid={`${card.testId}-value`}
                >
                  ${card.value.toFixed(2)}
                </p>
                {card.change !== undefined && (
                  <div className="flex items-center gap-1 mt-2">
                    {card.change >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-rose-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        card.change >= 0 ? "text-rose-500" : "text-emerald-500"
                      }`}
                    >
                      {Math.abs(card.change).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`p-3 rounded-xl bg-background/50 ${card.iconColor}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SummaryCards;
