import { useState, useEffect } from 'react';
import { transactionRepository } from '../services/transactionRepository';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = transactionRepository.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email) => {
    transactionRepository.login(email);
    setUser({ email, loggedAt: new Date().toISOString() });
  };

  const logout = () => {
    transactionRepository.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
