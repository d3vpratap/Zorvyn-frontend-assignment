import React from "react";

const InsightCard = ({ title, value, description, trend }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {trend && (
          <div
            className={`text-sm ${trend > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
