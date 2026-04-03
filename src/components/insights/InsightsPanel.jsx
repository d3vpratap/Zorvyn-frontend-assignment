import React from "react";
import InsightCard from "./InsightCard";

const InsightsPanel = () => {
  const insights = [
    {
      title: "Monthly Savings",
      value: "$2,450",
      description: "15% increase from last month",
      trend: 15,
    },
    {
      title: "Expense Ratio",
      value: "68%",
      description: "Of total income",
      trend: -5,
    },
    {
      title: "Investment Growth",
      value: "$8,320",
      description: "Portfolio value this month",
      trend: 8,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {insights.map((insight, index) => (
        <InsightCard key={index} {...insight} />
      ))}
    </div>
  );
};

export default InsightsPanel;
