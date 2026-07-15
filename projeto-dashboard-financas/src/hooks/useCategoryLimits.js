import { useState, useEffect, useCallback } from 'react';
import { transactionRepository } from '../services/transactionRepository';

export function useCategoryLimits(user) {
  const [limits, setLimits] = useState({});
  const [loading, setLoading] = useState(true);

  const loadLimits = useCallback(() => {
    if (!user) return;
    setLoading(true);
    try {
      const data = transactionRepository.getLimits();
      setLimits(data);
    } catch (error) {
      console.error('Erro ao obter limites de categoria:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadLimits();
  }, [loadLimits]);

  const saveLimit = (categoryName, value) => {
    const updated = transactionRepository.saveLimit(categoryName, value);
    setLimits(updated);
    return updated;
  };

  const getLimitProgress = useCallback((transactions) => {
    const progress = [];
    
    // Obter gastos do mês atual por categoria
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = transactions.filter(t => {
      if (t.type !== 'expense') return false;
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    Object.keys(limits).forEach(catName => {
      const limitVal = limits[catName];
      if (limitVal <= 0) return;

      const spent = monthlyExpenses
        .filter(t => t.category === catName)
        .reduce((sum, t) => sum + t.value, 0);

      const percentage = (spent / limitVal) * 100;

      progress.push({
        categoryName: catName,
        limit: limitVal,
        spent,
        percentage: Number(percentage.toFixed(1)),
        isExceeded: spent > limitVal,
        isWarning: spent >= limitVal * 0.8 && spent <= limitVal // 80% ou mais
      });
    });

    return progress;
  }, [limits]);

  return {
    limits,
    loading,
    saveLimit,
    getLimitProgress,
    refresh: loadLimits
  };
}
