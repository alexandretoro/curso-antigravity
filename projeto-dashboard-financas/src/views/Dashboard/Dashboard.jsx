import React, { useState, useMemo } from 'react';
import { 
  House, ArrowUpRight, ArrowDownLeft, TrendUp, Wallet, SignOut, 
  Plus, Pencil, Trash, Funnel, Warning, Calendar, CreditCard, 
  ChartLineUp, FolderSimple, Gear, Check, X, Shield,
  ShieldIcon
} from '@phosphor-icons/react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategoryLimits } from '../../hooks/useCategoryLimits';
import { formatCurrency } from '../../utils/formatters';
import { IncomeExpenseChart, CategoryDonutChart, MonthlyEvolutionChart } from '../../components/Charts/CustomCharts';
import { Forecast } from '../Forecast/Forecast';
import './Dashboard.css';

export function Dashboard({ user, onLogout }) {
  // Hooks de Dados
  const {
    transactions,
    categories,
    loading: loadingTx,
    totalIncome,
    totalExpense,
    totalInvestments,
    balance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory
  } = useTransactions(user);

  const {
    limits,
    saveLimit,
    getLimitProgress
  } = useCategoryLimits(user);

  // Estados de UI e Filtros
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | limits | forecast
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | income | expense
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterTime, setFilterTime] = useState('all'); // all | month | year
  const [filterFuture, setFilterFuture] = useState('all'); // all | current | future (projections)

  // Estados para CRUD
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Form de Categoria
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#10b981');

  // Tema
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // --- Lógica de Filtros ---
  const filteredTransactions = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return transactions.filter(t => {
      const tDate = new Date(t.date);
      const isFuture = tDate > today;

      // 1. Pesquisa por descrição ou banco
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.bankAccount.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Tipo (Receita vs Despesa)
      if (filterType !== 'all' && t.type !== filterType) return false;

      // 3. Categoria
      if (filterCategory !== 'all' && t.category !== filterCategory) return false;

      // 4. Forma de Pagamento
      if (filterPayment !== 'all' && t.paymentMethod !== filterPayment) return false;

      // 5. Período
      if (filterTime === 'month') {
        if (tDate.getMonth() !== currentMonth || tDate.getFullYear() !== currentYear) return false;
      } else if (filterTime === 'year') {
        if (tDate.getFullYear() !== currentYear) return false;
      }

      // 6. Perspectiva futura
      if (filterFuture === 'current' && isFuture) return false;
      if (filterFuture === 'future' && !isFuture) return false;

      return true;
    });
  }, [transactions, searchTerm, filterType, filterCategory, filterPayment, filterTime, filterFuture]);

  // --- Cálculos Extras para Alertas ---
  const limitProgress = useMemo(() => getLimitProgress(transactions), [getLimitProgress, transactions]);
  
  // Alertas ativos
  const activeAlerts = useMemo(() => {
    const alerts = [];
    
    // Alerta de gasto maior do que receita no mês atual
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
      .reduce((sum, t) => sum + t.value, 0);

    const monthlyExpense = transactions
      .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
      .reduce((sum, t) => sum + t.value, 0);

    if (monthlyExpense > monthlyIncome && monthlyIncome > 0) {
      alerts.push({
        type: 'danger',
        message: `ATENÇÃO: Seus gastos neste mês (${formatCurrency(monthlyExpense)}) superaram suas receitas (${formatCurrency(monthlyIncome)}).`
      });
    }

    // Alertas de limite de categoria
    limitProgress.forEach(p => {
      if (p.isExceeded) {
        alerts.push({
          type: 'danger',
          message: `LIMITE EXCEDIDO: Categoria "${p.categoryName}" gastou ${formatCurrency(p.spent)} de um limite de ${formatCurrency(p.limit)} (${p.percentage}%).`
        });
      } else if (p.isWarning) {
        alerts.push({
          type: 'warning',
          message: `ALERTA DE LIMITE: Categoria "${p.categoryName}" atingiu ${p.percentage}% do orçamento mensal (${formatCurrency(p.spent)} de ${formatCurrency(p.limit)}).`
        });
      }
    });

    return alerts;
  }, [transactions, limitProgress]);

  // Categoria que mais consumiu no mês atual
  const categoryMaxSpent = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthlyExpenses = transactions.filter(t => {
      return t.type === 'expense' && 
             t.category !== 'Investimentos' &&
             new Date(t.date).getMonth() === currentMonth && 
             new Date(t.date).getFullYear() === currentYear;
    });

    const catSums = {};
    monthlyExpenses.forEach(t => {
      catSums[t.category] = (catSums[t.category] || 0) + t.value;
    });

    let maxCat = 'Nenhuma';
    let maxVal = 0;
    Object.keys(catSums).forEach(cat => {
      if (catSums[cat] > maxVal) {
        maxVal = catSums[cat];
        maxCat = cat;
      }
    });

    return { name: maxCat, value: maxVal };
  }, [transactions]);

  // Média mensal de despesas
  const monthlyAverageExpense = useMemo(() => {
    if (transactions.length === 0) return 0;
    const expenseDates = transactions
      .filter(t => t.type === 'expense')
      .map(t => new Date(t.date));

    if (expenseDates.length === 0) return 0;

    const years = expenseDates.map(d => d.getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    let monthsCount = 0;
    // Conta quantos meses únicos existem no histórico
    const uniqueMonths = new Set(transactions.map(t => {
      const d = new Date(t.date);
      return `${d.getFullYear()}-${d.getMonth()}`;
    }));

    monthsCount = uniqueMonths.size || 1;

    const totalAllExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);

    return totalAllExpenses / monthsCount;
  }, [transactions]);

  return (
    <div className="dashboard-layout">
      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">Toro</div>
          <div className="brand-meta">
            <span className="brand-title">DASH FINANCE</span>
            <span className="brand-subtitle">Simulador Local</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <House size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'limits' ? 'active' : ''}`}
            onClick={() => setActiveTab('limits')}
          >
            <ShieldIcon size={20} />
            <span>Limites Mensais</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'forecast' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecast')}
          >
            <ChartLineUp size={20} />
            <span>Projeção Futura</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {user.email.substring(0, 2).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">Usuário Ativo</span>
              <span className="user-email" title={user.email}>{user.email}</span>
            </div>
          </div>
          <div className="sidebar-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} title="Alternar Modo Escuro/Claro">
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </button>
            <button className="logout-btn" onClick={onLogout} title="Sair do simulador">
              <SignOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        {/* Top Header */}
        <header className="content-header">
          <div className="header-welcome">
            <h1>Visão Geral Financeira</h1>
            <p>Gerenciamento e perspectivas futuras</p>
          </div>
          
          {/* Notificações/Alertas Compactos */}
          {activeAlerts.length > 0 && (
            <div className="header-alerts-trigger">
              <Warning size={20} className="text-warning animate-pulse" />
              <span className="alerts-badge">{activeAlerts.length}</span>
              <div className="alerts-dropdown">
                <h4>Alertas de Orçamento</h4>
                <ul>
                  {activeAlerts.map((alert, idx) => (
                    <li key={idx} className={`alert-item ${alert.type}`}>
                      <Warning size={14} />
                      <span>{alert.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </header>

        {/* KPIs Grid */}
        <section className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon"><Wallet size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Saldo Atual</span>
              <h3 className={`kpi-value font-mono ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
                {formatCurrency(balance)}
              </h3>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon text-income"><ArrowUpRight size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Total de Receitas</span>
              <h3 className="kpi-value text-income font-mono">{formatCurrency(totalIncome)}</h3>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon text-expense"><ArrowDownLeft size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Total de Despesas</span>
              <h3 className="kpi-value text-expense font-mono">{formatCurrency(totalExpense)}</h3>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon text-investment"><TrendUp size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Total de Investimentos</span>
              <h3 className="kpi-value text-investment font-mono">{formatCurrency(totalInvestments)}</h3>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon"><Calendar size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Média de Despesa Mensal</span>
              <h3 className="kpi-value font-mono">{formatCurrency(monthlyAverageExpense)}</h3>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon text-warning"><FolderSimple size={20} /></div>
            <div className="kpi-info">
              <span className="kpi-label">Maior Gasto do Mês</span>
              <h3 className="kpi-value text-warning font-mono" style={{ fontSize: '1.1rem' }}>
                {categoryMaxSpent.name} ({formatCurrency(categoryMaxSpent.value)})
              </h3>
            </div>
          </div>
        </section>

        {activeTab === 'dashboard' && (
          <div className="dashboard-views-grid">
            {/* Espaço reservado para os gráficos (Serão implementados no Passo 5) */}
            <div className="charts-container card-panel">
              <div className="panel-header">
                <h3>Visualizações Gráficas</h3>
                <span className="text-muted">Manuais em SVG Puro</span>
              </div>
              <div className="charts-placeholder-grid">
                <div className="chart-box">
                  <h4>Receitas x Despesas</h4>
                  <IncomeExpenseChart income={totalIncome} expense={totalExpense} investment={totalInvestments} />
                </div>
                <div className="chart-box">
                  <h4>Gastos por Categoria</h4>
                  <CategoryDonutChart transactions={transactions} categories={categories} />
                </div>
                <div className="chart-box">
                  <h4>Evolução Mensal</h4>
                  <MonthlyEvolutionChart transactions={transactions} />
                </div>
              </div>
            </div>

            {/* Painel de Transações (CRUD + Filtros) */}
            <div className="transactions-container card-panel">
              <div className="panel-header">
                <div className="panel-header-title">
                  <h3>Histórico de Transações</h3>
                  <p>Gerencie seus lançamentos e orçamentos</p>
                </div>
                <div className="panel-header-actions">
                  <button className="btn btn-outline" onClick={() => setIsCatModalOpen(true)}>
                    <FolderSimple size={16} />
                    <span>Nova Categoria</span>
                  </button>
                  <button className="btn btn-primary" onClick={() => { setEditingTx(null); setIsTxModalOpen(true); }}>
                    <Plus size={16} />
                    <span>Novo Lançamento</span>
                  </button>
                </div>
              </div>

              {/* Filtros e Busca */}
              <div className="filters-bar">
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Buscar por descrição ou banco..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filters-selectors">
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)} title="Filtrar por tipo">
                    <option value="all">Tipos (Todos)</option>
                    <option value="income">Receitas</option>
                    <option value="expense">Despesas</option>
                  </select>

                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} title="Filtrar por categoria">
                    <option value="all">Categorias (Todas)</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>

                  <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)} title="Filtrar por forma de pagamento">
                    <option value="all">Pgtos (Todos)</option>
                    <option value="PIX">PIX</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de crédito">Cartão de Crédito</option>
                    <option value="Cartão de débito">Cartão de Débito</option>
                    <option value="Boleto">Boleto</option>
                  </select>

                  <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)} title="Filtrar por período">
                    <option value="all">Período (Todos)</option>
                    <option value="month">Este Mês</option>
                    <option value="year">Este Ano</option>
                  </select>

                  <select value={filterFuture} onChange={(e) => setFilterFuture(e.target.value)} title="Perspectiva Futura">
                    <option value="all">Perspectiva (Todas)</option>
                    <option value="current">Apenas Realizados</option>
                    <option value="future">Apenas Projeções Futuras</option>
                  </select>
                </div>
              </div>

              {/* Tabela de Transações */}
              <div className="transactions-table-wrapper">
                {loadingTx ? (
                  <div className="table-status">Carregando transações...</div>
                ) : filteredTransactions.length === 0 ? (
                  <div className="table-status">Nenhuma transação cadastrada ou correspondente aos filtros.</div>
                ) : (
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Forma de Pgto</th>
                        <th>Conta / Banco</th>
                        <th className="text-right">Valor</th>
                        <th className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map(tx => {
                        const txDate = new Date(tx.date);
                        const isFuture = txDate > new Date();
                        const catColor = categories.find(c => c.name === tx.category)?.color || '#9ca3af';

                        return (
                          <tr key={tx.id} className={isFuture ? 'tx-row-future' : ''}>
                            <td className="font-mono text-nowrap">
                              {tx.date.split('-').reverse().join('/')}
                              {isFuture && <span className="badge-future" title="Previsão/Lançamento Futuro">Futuro</span>}
                            </td>
                            <td>
                              <div className="tx-description" title={tx.description}>{tx.description}</div>
                            </td>
                            <td>
                              <span className="tx-category-badge" style={{ '--cat-color': catColor }}>
                                {tx.category}
                              </span>
                            </td>
                            <td>
                              <span className="tx-payment-method">
                                <CreditCard size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                {tx.paymentMethod}
                              </span>
                            </td>
                            <td>{tx.bankAccount}</td>
                            <td className={`font-mono text-right text-nowrap ${tx.type === 'income' ? 'text-income' : 'text-expense'}`}>
                              {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.value)}
                            </td>
                            <td className="text-center actions-cell">
                              <button 
                                className="action-btn edit" 
                                onClick={() => { setEditingTx(tx); setIsTxModalOpen(true); }}
                                title="Editar"
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                className="action-btn delete" 
                                onClick={() => setConfirmDeleteId(tx.id)}
                                title="Excluir"
                              >
                                <Trash size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab de Limites de Categoria */}
        {activeTab === 'limits' && (
          <div className="limits-panel card-panel fade-in">
            <div className="panel-header">
              <h3>Orçamento por Categoria</h3>
              <p>Defina limites mensais para controlar seus gastos por categoria.</p>
            </div>
            
            <div className="limits-editor-grid">
              {categories
                .filter(c => c.name !== 'Salário') // Não faz sentido limitar o salário recebido
                .map(cat => {
                  const currentLimit = limits[cat.name] || 0;
                  const progress = limitProgress.find(p => p.categoryName === cat.name) || { spent: 0, percentage: 0 };
                  
                  return (
                    <div key={cat.id} className="limit-editor-card">
                      <div className="limit-card-header">
                        <span className="tx-category-badge" style={{ '--cat-color': cat.color }}>
                          {cat.name}
                        </span>
                        <div className="limit-inputs">
                          <input 
                            type="number" 
                            min="0"
                            placeholder="Sem Limite"
                            defaultValue={currentLimit || ''}
                            onBlur={(e) => {
                              const val = e.target.value === '' ? 0 : Number(e.target.value);
                              saveLimit(cat.name, val);
                            }}
                            title="Pressione tab ou saia do campo para salvar"
                          />
                          <span className="currency-label">R$</span>
                        </div>
                      </div>

                      {currentLimit > 0 && (
                        <div className="limit-progress-wrapper">
                          <div className="limit-progress-meta">
                            <span>Gasto: {formatCurrency(progress.spent)}</span>
                            <span>{progress.percentage}% de {formatCurrency(currentLimit)}</span>
                          </div>
                          <div className="limit-progress-bar-bg">
                            <div 
                              className={`limit-progress-bar-fill ${progress.percentage >= 100 ? 'bg-expense' : progress.percentage >= 80 ? 'bg-warning' : 'bg-income'}`}
                              style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <Forecast 
            transactions={transactions} 
            categories={categories} 
            currentBalance={balance} 
          />
        )}
      </main>

      {/* --- MODAIS DE CADASTRO / EDIÇÃO (CRUD) --- */}
      {isTxModalOpen && (
        <TransactionFormModal 
          categories={categories}
          transaction={editingTx}
          onSave={async (tx) => {
            if (editingTx) {
              await updateTransaction({ ...editingTx, ...tx });
            } else {
              await addTransaction(tx);
            }
            setIsTxModalOpen(false);
          }}
          onClose={() => setIsTxModalOpen(false)}
        />
      )}

      {isCatModalOpen && (
        <CategoryFormModal 
          onSave={async (name, color) => {
            try {
              await addCategory(name, color);
              setIsCatModalOpen(false);
              setNewCatName('');
            } catch (err) {
              alert(err.message);
            }
          }}
          onClose={() => setIsCatModalOpen(false)}
        />
      )}

      {/* --- CONFIRMAÇÃO DE EXCLUSÃO --- */}
      {confirmDeleteId && (
        <div className="modal-backdrop">
          <div className="modal-content confirmation-dialog">
            <h3>Confirmar Exclusão</h3>
            <p>Você tem certeza absoluta que deseja excluir este lançamento?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
              <button 
                className="btn btn-expense" 
                onClick={async () => {
                  await deleteTransaction(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponente Form Modal para Lançamentos
function TransactionFormModal({ categories, transaction, onSave, onClose }) {
  const [description, setDescription] = useState(transaction?.description || '');
  const [value, setValue] = useState(transaction?.value || '');
  const [type, setType] = useState(transaction?.type || 'expense');
  const [category, setCategory] = useState(transaction?.category || categories[0]?.name || 'Alimentação');
  const [paymentMethod, setPaymentMethod] = useState(transaction?.paymentMethod || 'PIX');
  const [bankAccount, setBankAccount] = useState(transaction?.bankAccount || 'Banco Principal');
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !value || !date) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSave({
      description,
      value: Number(value),
      type,
      category,
      paymentMethod,
      bankAccount,
      date
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content fade-in">
        <div className="modal-header">
          <h3>{transaction ? 'Editar Lançamento' : 'Novo Lançamento'}</h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row-2">
            <div className="form-group">
              <label>Tipo de Movimentação</label>
              <div className="type-toggle-group">
                <button 
                  type="button" 
                  className={`toggle-btn ${type === 'income' ? 'active-income' : ''}`}
                  onClick={() => setType('income')}
                >
                  Receita
                </button>
                <button 
                  type="button" 
                  className={`toggle-btn ${type === 'expense' ? 'active-expense' : ''}`}
                  onClick={() => setType('expense')}
                >
                  Despesa
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Valor (R$)*</label>
              <input 
                type="number" 
                step="0.01" 
                min="0.01"
                required
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descrição*</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Supermercado, Aluguel, Salário..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Forma de Pagamento</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="PIX">PIX</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de Crédito</option>
                <option value="Cartão de débito">Cartão de Débito</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Conta Bancária / Banco</label>
              <input 
                type="text" 
                placeholder="Ex: Itaú, Nubank..."
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Data*</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Lançamento</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Subcomponente Form Modal para Categorias
function CategoryFormModal({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#10b981');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Nome da categoria é obrigatório.');
      return;
    }
    onSave(name, color);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content fade-in" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3>Nova Categoria</h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nome da Categoria*</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Assinaturas, Pet, Presentes..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cor Identificadora</label>
            <div className="color-picker-group">
              <input 
                type="color" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '50px', height: '40px', padding: '0', cursor: 'pointer' }}
              />
              <span className="font-mono" style={{ fontSize: '0.9rem', alignSelf: 'center' }}>{color.toUpperCase()}</span>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
