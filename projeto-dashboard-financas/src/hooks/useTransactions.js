import { useState, useEffect, useCallback } from 'react';
import { transactionRepository } from '../services/transactionRepository';

export function useTransactions(user) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    if (!user) return;
    setLoading(true);
    try {
      const txs = transactionRepository.getTransactions();
      const cats = transactionRepository.getCategories();
      setTransactions(txs);
      setCategories(cats);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTransaction = async (tx) => {
    const saved = transactionRepository.saveTransaction(tx);
    loadData();
    return saved;
  };

  const updateTransaction = async (tx) => {
    const saved = transactionRepository.saveTransaction(tx);
    loadData();
    return saved;
  };

  const deleteTransaction = async (id) => {
    const success = transactionRepository.deleteTransaction(id);
    if (success) {
      loadData();
    }
    return success;
  };

  const addCategory = async (name, color) => {
    const newCat = transactionRepository.addCategory(name, color);
    loadData();
    return newCat;
  };

  // Cálculos de KPIs
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.value, 0);

  // Consideramos 'Investimentos' como um tipo de despesa especial
  const totalInvestments = transactions
    .filter(t => t.category === 'Investimentos')
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.category !== 'Investimentos')
    .reduce((sum, t) => sum + t.value, 0);

  const balance = totalIncome - totalExpense - totalInvestments;

  return {
    transactions,
    categories,
    loading,
    totalIncome,
    totalExpense,
    totalInvestments,
    balance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    refresh: loadData
  };
}
