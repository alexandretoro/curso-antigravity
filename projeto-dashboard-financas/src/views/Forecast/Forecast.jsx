import React, { useMemo } from 'react';
import { TrendUp, TrendDown, Warning } from '@phosphor-icons/react';
import { formatCurrency } from '../../utils/formatters';

export function Forecast({ transactions = [], categories = [], currentBalance = 0 }) {
  // 1. Cálculos de Médias Históricas
  const stats = useMemo(() => {
    if (transactions.length === 0) {
      return { avgIncome: 0, avgExpense: 0, netSavings: 0, uniqueMonths: 0 };
    }

    const uniqueMonths = new Set(
      transactions.map(t => {
        const d = new Date(t.date);
        return `${d.getFullYear()}-${d.getMonth()}`;
      })
    );

    const monthsCount = uniqueMonths.size || 1;

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);

    const avgIncome = totalIncome / monthsCount;
    const avgExpense = totalExpense / monthsCount;
    const netSavings = avgIncome - avgExpense;

    return {
      avgIncome,
      avgExpense,
      netSavings,
      uniqueMonths: monthsCount
    };
  }, [transactions]);

  // 2. Projeções de Saldo (1, 3, 6, 12 meses)
  const projections = useMemo(() => {
    const list = [];
    for (let m = 0; m <= 12; m += 2) {
      list.push({
        month: m,
        balance: currentBalance + stats.netSavings * m
      });
    }
    return list;
  }, [currentBalance, stats.netSavings]);

  // 3. Gráfico SVG da Projeção de Saldo
  const svgChart = useMemo(() => {
    if (projections.length === 0) return null;

    const balances = projections.map(p => p.balance);
    const maxVal = Math.max(...balances, currentBalance + 1000);
    const minVal = Math.min(...balances, 0);
    const range = maxVal - minVal || 100;

    const width = 450;
    const height = 180;
    const paddingX = 50;
    const paddingY = 20;
    const plotWidth = width - paddingX - 20;
    const plotHeight = height - paddingY * 2;

    const points = projections.map((p, idx) => {
      const x = paddingX + (idx / (projections.length - 1)) * plotWidth;
      const ratio = (p.balance - minVal) / range;
      const y = height - paddingY - ratio * plotHeight;
      return { x, y, month: p.month, balance: p.balance };
    });

    const pathD = points.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    // Fechar a área até a base do gráfico (minVal)
    const zeroY = height - paddingY - (Math.max(minVal, 0) - minVal) / range * plotHeight;
    const areaD = points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
      : '';

    return { points, pathD, areaD, width, height, paddingX, paddingY, maxVal, minVal };
  }, [projections, currentBalance]);

  // Se o saldo projetado for negativo a longo prazo
  const isBleeding = stats.netSavings < 0;
  const monthsToBankruptcy = isBleeding && currentBalance > 0
    ? Math.abs(currentBalance / stats.netSavings).toFixed(1)
    : 0;

  return (
    <div className="forecast-panel card-panel fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="panel-header">
        <h3>Projeção Financeira Inteligente</h3>
        <p>Previsão de saldos e comportamento financeiro com base no seu histórico de lançamentos.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="kpi-card">
          <div className={`kpi-icon ${isBleeding ? 'text-expense' : 'text-income'}`}>
            {isBleeding ? <TrendDown size={20} /> : <TrendUp size={20} />}
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Poupança Mensal Média</span>
            <h3 className={`kpi-value font-mono ${isBleeding ? 'text-expense' : 'text-income'}`}>
              {formatCurrency(stats.netSavings)}
            </h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><TrendUp size={20} className="text-income" /></div>
          <div className="kpi-info">
            <span className="kpi-label">Receita Mensal Média</span>
            <h3 className="kpi-value font-mono text-income">{formatCurrency(stats.avgIncome)}</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><TrendDown size={20} className="text-expense" /></div>
          <div className="kpi-info">
            <span className="kpi-label">Gasto Mensal Médio</span>
            <h3 className="kpi-value font-mono text-expense">{formatCurrency(stats.avgExpense)}</h3>
          </div>
        </div>
      </div>

      {isBleeding && currentBalance > 0 && (
        <div className="alert-item danger" style={{ padding: '1rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Warning size={24} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Alerta de Esgotamento de Saldo</h4>
            <p style={{ color: 'inherit', fontSize: '0.8rem' }}>
              Com base nos seus gastos médios que superam as receitas em {formatCurrency(Math.abs(stats.netSavings))} por mês, seu saldo atual se esgotará em aproximadamente <strong>{monthsToBankruptcy} meses</strong> caso o comportamento de consumo não seja alterado.
            </p>
          </div>
        </div>
      )}

      {stats.uniqueMonths < 1 ? (
        <div className="table-status">
          Histórico insuficiente para realizar previsões. Adicione lançamentos de receitas e despesas para iniciar.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Tabela de Evolução Projetada */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Projeção de Curto e Longo Prazo
            </h4>
            <div className="transactions-table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Período</th>
                    <th className="text-right">Saldo Projetado</th>
                    <th className="text-right">Variação Acumulada</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((p, idx) => {
                    const diff = p.balance - currentBalance;
                    return (
                      <tr key={idx}>
                        <td className="font-mono">
                          {p.month === 0 ? 'Atual' : `+${p.month} meses`}
                        </td>
                        <td className={`font-mono text-right ${p.balance >= 0 ? 'text-income' : 'text-expense'}`}>
                          {formatCurrency(p.balance)}
                        </td>
                        <td className={`font-mono text-right ${diff >= 0 ? 'text-income' : 'text-expense'}`}>
                          {diff >= 0 ? '+' : ''}{formatCurrency(diff)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico da Projeção de Tendência */}
          <div className="chart-box" style={{ minHeight: '300px' }}>
            <h4>Curva de Projeção a 12 Meses</h4>
            {svgChart && (
              <svg width="100%" height="200" viewBox={`0 0 ${svgChart.width} 200`}>
                <defs>
                  <linearGradient id="areaForecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isBleeding ? 'var(--color-expense)' : 'var(--color-income)'} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={isBleeding ? 'var(--color-expense)' : 'var(--color-income)'} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Linha Zero */}
                {svgChart.minVal < 0 && (
                  <line
                    x1={svgChart.paddingX}
                    y1={svgChart.height - svgChart.paddingY - (Math.abs(svgChart.minVal) / (svgChart.maxVal - svgChart.minVal)) * (svgChart.height - svgChart.paddingY * 2)}
                    x2={svgChart.width - 20}
                    y2={svgChart.height - svgChart.paddingY - (Math.abs(svgChart.minVal) / (svgChart.maxVal - svgChart.minVal)) * (svgChart.height - svgChart.paddingY * 2)}
                    stroke="var(--border-color)"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Área preenchida */}
                {svgChart.areaD && <path d={svgChart.areaD} fill="url(#areaForecastGrad)" />}

                {/* Linha da Projeção */}
                {svgChart.pathD && (
                  <path
                    d={svgChart.pathD}
                    fill="none"
                    stroke={isBleeding ? 'var(--color-expense)' : 'var(--color-income)'}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Linhas de Grade Verticais e Dots */}
                {svgChart.points.map((p, idx) => (
                  <g key={idx}>
                    <line
                      x1={p.x}
                      y1={svgChart.paddingY}
                      x2={p.x}
                      y2={svgChart.height - svgChart.paddingY}
                      stroke="var(--border-color)"
                      strokeOpacity="0.3"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="var(--bg-color)"
                      stroke={isBleeding ? 'var(--color-expense)' : 'var(--color-income)'}
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y={svgChart.height - svgChart.paddingY + 16}
                      fill="var(--text-secondary)"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      {p.month === 0 ? 'M0' : `M${p.month}`}
                    </text>
                    <text
                      x={p.x}
                      y={p.y - 8}
                      fill="var(--text-primary)"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
                    >
                      {p.balance >= 1000 ? `${(p.balance / 1000).toFixed(0)}k` : p.balance.toFixed(0)}
                    </text>
                  </g>
                ))}
              </svg>
            )}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              * Linha tracejada indica intervalo de previsão estatística local
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
