import React, { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [role, setRole] = useState("admin");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  document.documentElement.classList.toggle("dark", savedTheme === "dark");

  setTransactions(mockTransactions);
}, []);

const toggleTheme = () => {
  setTheme((prev) => {
    const newTheme = prev === "light" ? "dark" : "light";

    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
};

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t,
      ),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const value = {
    theme,
    toggleTheme,
    role,
    setRole,
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
