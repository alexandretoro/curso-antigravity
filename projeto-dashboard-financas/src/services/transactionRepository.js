import { storageService } from './storageService';

const TRANSACTIONS_KEY = 'df_transactions';
const CATEGORIES_KEY = 'df_categories';
const LIMITS_KEY = 'df_limits';
const SESSION_KEY = 'df_session';

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Alimentação', color: '#f59e0b' },
  { id: 'cat-2', name: 'Transporte', color: '#3b82f6' },
  { id: 'cat-3', name: 'Moradia', color: '#a855f7' },
  { id: 'cat-4', name: 'Saúde', color: '#10b981' },
  { id: 'cat-5', name: 'Educação', color: '#06b6d4' },
  { id: 'cat-6', name: 'Lazer', color: '#ec4899' },
  { id: 'cat-7', name: 'Investimentos', color: '#6366f1' },
  { id: 'cat-8', name: 'Salário', color: '#22c55e' },
  { id: 'cat-9', name: 'Compras', color: '#f43f5e' },
];

// Helper para pegar o e-mail do usuário logado (escopo dos dados)
const getLoggedUserEmail = () => {
  const session = storageService.get(SESSION_KEY);
  return session ? session.email : 'guest';
};

export const transactionRepository = {
  // --- SESSION/AUTH ---
  login(email) {
    storageService.set(SESSION_KEY, { email, loggedAt: new Date().toISOString() });
    return true;
  },

  logout() {
    storageService.remove(SESSION_KEY);
    return true;
  },

  getCurrentUser() {
    return storageService.get(SESSION_KEY);
  },

  // --- CATEGORIES ---
  getCategories() {
    const email = getLoggedUserEmail();
    const allCategories = storageService.get(CATEGORIES_KEY, {});
    
    // Se não houver categorias para este usuário, retorna as iniciais
    if (!allCategories[email]) {
      allCategories[email] = [...INITIAL_CATEGORIES];
      storageService.set(CATEGORIES_KEY, allCategories);
    }
    
    return allCategories[email];
  },

  addCategory(name, color) {
    const email = getLoggedUserEmail();
    const allCategories = storageService.get(CATEGORIES_KEY, {});
    
    if (!allCategories[email]) {
      allCategories[email] = [...INITIAL_CATEGORIES];
    }
    
    // Evita duplicados
    const exists = allCategories[email].some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      throw new Error('Esta categoria já existe.');
    }
    
    const newCategory = {
      id: `cat-${Date.now()}`,
      name,
      color: color || '#6b7280'
    };
    
    allCategories[email].push(newCategory);
    storageService.set(CATEGORIES_KEY, allCategories);
    return newCategory;
  },

  // --- LIMITS ---
  getLimits() {
    const email = getLoggedUserEmail();
    const allLimits = storageService.get(LIMITS_KEY, {});
    return allLimits[email] || {};
  },

  saveLimit(categoryName, value) {
    const email = getLoggedUserEmail();
    const allLimits = storageService.get(LIMITS_KEY, {});
    
    if (!allLimits[email]) {
      allLimits[email] = {};
    }
    
    if (value <= 0 || isNaN(value)) {
      delete allLimits[email][categoryName];
    } else {
      allLimits[email][categoryName] = Number(value);
    }
    
    storageService.set(LIMITS_KEY, allLimits);
    return allLimits[email];
  },

  // --- TRANSACTIONS ---
  getTransactions() {
    const email = getLoggedUserEmail();
    const allTransactions = storageService.get(TRANSACTIONS_KEY, {});
    return allTransactions[email] || [];
  },

  saveTransaction(transaction) {
    const email = getLoggedUserEmail();
    const allTransactions = storageService.get(TRANSACTIONS_KEY, {});
    
    if (!allTransactions[email]) {
      allTransactions[email] = [];
    }
    
    const newTransaction = {
      ...transaction,
      id: transaction.id || `tx-${Date.now()}`,
      value: Number(transaction.value),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    
    if (transaction.id) {
      // Editar
      const index = allTransactions[email].findIndex(t => t.id === transaction.id);
      if (index !== -1) {
        allTransactions[email][index] = newTransaction;
      }
    } else {
      // Cadastrar novo
      allTransactions[email].push(newTransaction);
    }
    
    // Ordena por data decrescente
    allTransactions[email].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    storageService.set(TRANSACTIONS_KEY, allTransactions);
    return newTransaction;
  },

  deleteTransaction(id) {
    const email = getLoggedUserEmail();
    const allTransactions = storageService.get(TRANSACTIONS_KEY, {});
    
    if (!allTransactions[email]) return false;
    
    const filtered = allTransactions[email].filter(t => t.id !== id);
    const deleted = filtered.length < allTransactions[email].length;
    
    allTransactions[email] = filtered;
    storageService.set(TRANSACTIONS_KEY, allTransactions);
    return deleted;
  }
};
