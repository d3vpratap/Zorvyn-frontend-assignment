import React, { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import TransactionDialog from "./TransactionDialog";
import { categories } from "../data/mockData";

const TransactionsList = () => {
  const {
    transactions,
    role,
    deleteTransaction,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
  } = useAppContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch =
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || t.type === filterType;
        const matchesCategory =
          filterCategory === "all" || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, filterType, filterCategory]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setDialogOpen(true);
  };

  return (
    <div
      className="col-span-full p-6 rounded-2xl border bg-card shadow-sm"
      data-testid="transactions-list"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-semibold tracking-tight">Transactions</h3>
        {role === "admin" && (
          <Button
            onClick={handleAddNew}
            className="btn-hover"
            data-testid="add-transaction-btn"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="search-input"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger
            className="w-full sm:w-[150px]"
            data-testid="filter-type"
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="z-[100] bg-white dark:bg-gray-900 border shadow-md [&>*]:bg-white dark:[&>*]:bg-gray-900"
          >
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger
            className="w-full sm:w-[180px]"
            data-testid="filter-category"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="z-[100] bg-white dark:bg-gray-900 border shadow-md [&>*]:bg-white dark:[&>*]:bg-gray-900"
          >
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        {filteredTransactions.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Type
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Amount
                </th>
                {role === "admin" && (
                  <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b transaction-row"
                  data-testid="transaction-row"
                >
                  <td className="py-3 px-4 text-sm">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.category}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        transaction.type === "income"
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 text-sm font-semibold text-right ${
                      transaction.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(transaction)}
                          data-testid="edit-transaction-btn"
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(transaction.id)}
                          data-testid="delete-transaction-btn"
                          className="h-8 w-8 text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            className="text-center py-12 text-muted-foreground"
            data-testid="no-transactions"
          >
            No transactions found
          </div>
        )}
      </div>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default TransactionsList;
