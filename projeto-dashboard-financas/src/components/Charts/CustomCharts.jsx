import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/formatters';

// --- 1. GRÁFICO DE COMPARAÇÃO: RECEITAS vs DESPESAS vs INVESTIMENTOS (Barras) ---
export function IncomeExpenseChart({ income = 0, expense = 0, investment = 0 }) {
  const maxValue = Math.max(income, expense, investment, 100); // Evita divisão por zero
  
  const data = [
    { label: 'Receitas', value: income, color: 'var(--color-income)', hoverColor: 'var(--color-income-hover)' },
    { label: 'Despesas', value: expense, color: 'var(--color-expense)', hoverColor: 'var(--color-expense-hover)' },
    { label: 'Investimentos', value: investment, color: 'var(--color-investment)', hoverColor: 'var(--color-investment-hover)' }
  ];

  const chartHeight = 160;
  const chartWidth = 280;
  const barWidth = 35;
  const spacing = 45;
  const paddingLeft = 50;
  const paddingTop = 20;

  return (
    <svg width="100%" height="220" viewBox={`0 0 ${chartWidth} 220`} style={{ display: 'block', margin: '0 auto' }}>
      {/* Linhas de Grade de Fundo */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
        const y = chartHeight + paddingTop - ratio * chartHeight;
        const val = ratio * maxValue;
        return (
          <g key={idx}>
            <line 
              x1={paddingLeft} 
              y1={y} 
              x2={chartWidth - 20} 
              y2={y} 
              stroke="var(--border-color)" 
              strokeDasharray="2 3" 
            />
            <text 
              x={paddingLeft - 8} 
              y={y + 4} 
              fill="var(--text-muted)" 
              fontSize="9" 
              textAnchor="end"
              fontFamily="var(--font-mono)"
            >
              {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Barras */}
      {data.map((item, idx) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = paddingLeft + spacing * idx + barWidth * idx + 10;
        const y = chartHeight + paddingTop - barHeight;

        return (
          <g key={idx} className="chart-bar-group">
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(barHeight, 2)} // Pelo menos 2px de altura visual
              fill={item.color}
              rx="2"
              style={{ transition: 'all 0.3s ease' }}
            />
            {/* Valor acima da barra */}
            <text
              x={x + barWidth / 2}
              y={y - 6}
              fill="var(--text-primary)"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              {item.value > 0 ? `${(item.value / 1000).toFixed(1)}k` : '0'}
            </text>
            {/* Rótulo abaixo da barra */}
            <text
              x={x + barWidth / 2}
              y={chartHeight + paddingTop + 18}
              fill="var(--text-secondary)"
              fontSize="9"
              textAnchor="middle"
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* Linha da Base */}
      <line 
        x1={paddingLeft} 
        y1={chartHeight + paddingTop} 
        x2={chartWidth - 20} 
        y2={chartHeight + paddingTop} 
        stroke="var(--border-focus)" 
        strokeWidth="1.5"
      />
    </svg>
  );
}

// --- 2. GRÁFICO DE PIZZA/DONUT: GASTOS POR CATEGORIA ---
export function CategoryDonutChart({ transactions = [], categories = [] }) {
  // Pegar os gastos do mês atual
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const expenseData = useMemo(() => {
    const monthlyExpenses = transactions.filter(t => {
      const tDate = new Date(t.date);
      return t.type === 'expense' && 
             t.category !== 'Investimentos' &&
             tDate.getMonth() === currentMonth && 
             tDate.getFullYear() === currentYear;
    });

    const categorySums = {};
    monthlyExpenses.forEach(t => {
      categorySums[t.category] = (categorySums[t.category] || 0) + t.value;
    });

    const total = Object.values(categorySums).reduce((sum, v) => sum + v, 0);

    const list = Object.keys(categorySums).map(catName => {
      const catObj = categories.find(c => c.name === catName) || { color: '#9ca3af' };
      return {
        name: catName,
        value: categorySums[catName],
        color: catObj.color,
        percentage: total > 0 ? (categorySums[catName] / total) * 100 : 0
      };
    });

    // Ordenar do maior para o menor
    list.sort((a, b) => b.value - a.value);

    return { list, total };
  }, [transactions, categories, currentMonth, currentYear]);

  // Constantes do Donut SVG
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const centerX = 80;
  const centerY = 90;

  // Gerar segmentos
  let accumulatedPercent = 0;

  if (expenseData.total === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1rem' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border-color)" strokeWidth="8" />
          <text x="60" y="64" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Sem Gastos</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="donut-chart-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width="160" height="180" viewBox="0 0 160 180" style={{ flexShrink: 0 }}>
        {/* Fundo sutil do circulo interno */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="var(--border-color)" strokeWidth={strokeWidth} opacity="0.2" />
        
        {expenseData.list.map((item, idx) => {
          const dashArray = `${(item.value / expenseData.total) * circumference} ${circumference}`;
          const dashOffset = -accumulatedPercent * circumference;
          accumulatedPercent += (item.value / expenseData.total);

          return (
            <circle
              key={idx}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${centerX} ${centerY})`} // Começa no topo
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          );
        })}

        {/* Texto central */}
        <text x={centerX} y={centerY - 2} fill="var(--text-muted)" fontSize="8" textAnchor="middle" fontWeight="bold">TOTAL GASTO</text>
        <text 
          x={centerX} 
          y={centerY + 10} 
          fill="var(--text-primary)" 
          fontSize="9.5" 
          fontWeight="bold" 
          textAnchor="middle" 
          fontFamily="var(--font-mono)"
        >
          {expenseData.total >= 1000 ? `${(expenseData.total / 1000).toFixed(1)}k` : expenseData.total.toFixed(0)}
        </text>
      </svg>

      {/* Legenda com Cores */}
      <div className="donut-legend" style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '130px', flex: '1' }}>
        {expenseData.list.slice(0, 5).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }}></span>
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }} title={item.name}>
                {item.name}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{item.percentage.toFixed(0)}%</span>
          </div>
        ))}
        {expenseData.list.length > 5 && (
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
            + {expenseData.list.length - 5} categorias
          </div>
        )}
      </div>
    </div>
  );
}

// --- 3. GRÁFICO DE EVOLUÇÃO TEMPORAL: SALDO MENSAL (Linha/Área) ---
export function MonthlyEvolutionChart({ transactions = [] }) {
  // Agrupar saldo dos ultimos 6 meses
  const chartData = useMemo(() => {
    const monthsNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Obter data de 5 meses atras
    const list = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const m = d.getMonth();
      const y = d.getFullYear();
      
      // Filtrar transações deste mês
      const monthlyTxs = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === m && tDate.getFullYear() === y;
      });
      
      const income = monthlyTxs.filter(t => t.type === 'income').reduce((sum, t) => sum + t.value, 0);
      const expense = monthlyTxs.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.value, 0);
      const balance = income - expense;

      list.push({
        label: `${monthsNames[m]}/${String(y).substring(2)}`,
        balance
      });
    }

    return list;
  }, [transactions]);

  const maxVal = Math.max(...chartData.map(d => Math.abs(d.balance)), 500);
  const minVal = -maxVal; // Escala simétrica para o saldo (positivo/negativo)

  const height = 160;
  const width = 280;
  const paddingX = 40;
  const paddingY = 25;
  const plotHeight = height - paddingY * 2;
  const plotWidth = width - paddingX - 20;

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / (chartData.length - 1)) * plotWidth;
    // Mapeamento linear para centralizar o 0 no meio do gráfico
    const ratio = (d.balance - minVal) / (maxVal - minVal);
    const y = height - paddingY - ratio * plotHeight;
    return { x, y, val: d.balance, label: d.label };
  });

  // String do path SVG
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Área preenchida com gradiente
  const zeroY = height - paddingY - (0 - minVal) / (maxVal - minVal) * plotHeight;
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${zeroY} L ${points[0].x} ${zeroY} Z`
    : '';

  return (
    <svg width="100%" height="220" viewBox={`0 0 ${width} 220`} style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        {/* Gradiente vertical para a área */}
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-income)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-income)" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Linha do Saldo Zero (Eixo Central) */}
      <line 
        x1={paddingX} 
        y1={zeroY} 
        x2={width - 15} 
        y2={zeroY} 
        stroke="var(--border-color)" 
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <text 
        x={paddingX - 8} 
        y={zeroY + 3} 
        fill="var(--text-muted)" 
        fontSize="8" 
        textAnchor="end"
        fontFamily="var(--font-mono)"
      >
        0
      </text>

      {/* Outras linhas de grade (Max e Min) */}
      <line x1={paddingX} y1={paddingY} x2={width - 15} y2={paddingY} stroke="var(--border-color)" strokeOpacity="0.5" strokeDasharray="1 4" />
      <text x={paddingX - 8} y={paddingY + 3} fill="var(--text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)">
        +{maxVal >= 1000 ? `${(maxVal / 1000).toFixed(0)}k` : maxVal.toFixed(0)}
      </text>

      <line x1={paddingX} y1={height - paddingY} x2={width - 15} y2={height - paddingY} stroke="var(--border-color)" strokeOpacity="0.5" strokeDasharray="1 4" />
      <text x={paddingX - 8} y={height - paddingY + 3} fill="var(--text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)">
        -{maxVal >= 1000 ? `${(maxVal / 1000).toFixed(0)}k` : maxVal.toFixed(0)}
      </text>

      {/* Área preenchida */}
      {areaD && <path d={areaD} fill="url(#areaGrad)" />}

      {/* Linha de Evolução */}
      {pathD && (
        <path 
          d={pathD} 
          fill="none" 
          stroke="var(--color-income)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Pontos de dados e rótulos */}
      {points.map((p, idx) => (
        <g key={idx}>
          <circle 
            cx={p.x} 
            cy={p.y} 
            r="3.5" 
            fill="var(--bg-color)" 
            stroke="var(--color-income)" 
            strokeWidth="2" 
          />
          {/* Valor do ponto ao pairar/desenhar */}
          <text 
            x={p.x} 
            y={p.y - 8} 
            fill="var(--text-primary)" 
            fontSize="8" 
            fontWeight="bold" 
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {p.val >= 1000 ? `${(p.val / 1000).toFixed(1)}k` : p.val.toFixed(0)}
          </text>
          {/* Label do mês no eixo X */}
          <text 
            x={p.x} 
            y={height - paddingY + 16} 
            fill="var(--text-secondary)" 
            fontSize="8" 
            textAnchor="middle"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
