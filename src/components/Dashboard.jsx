import React from "react";
import Header from "./Header";
import SummaryCard from "./SummaryCard";
import BalanceTrendChart from "./BalanceTrendChart";
import TransactionsList from "./TransactionsList";
import InsightsSection from "./InsightsSection";
import SpendingBreakdownChart from "./SpendingBreakDownChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SummaryCard />
          <BalanceTrendChart />
          <SpendingBreakdownChart />
          <InsightsSection />
          <TransactionsList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
