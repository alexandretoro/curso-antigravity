import React from 'react';
import './StatusBar.css';

const STEPS = [
  { id: 1, label: 'Aguardando' },
  { id: 2, label: 'Em Andamento' },
  { id: 3, label: 'Em Revisão' },
  { id: 4, label: 'Disputa' },
  { id: 5, label: 'Finalizado' },
];

export function StatusBar({ currentStep = 1 }) {
  // Calculate progress bar percentage (0% to 100%)
  const progressPercent = Math.min(Math.max(((currentStep - 1) / (STEPS.length - 1)) * 100, 0), 100);

  return (
    <div className="status-bar">
      <div className="status-bar__container">
        {/* Background Track */}
        <div className="status-bar__track"></div>
        {/* Active Fill Line */}
        <div
          className="status-bar__fill"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* Step Nodes */}
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep || currentStep >= 5;
          const isActive = step.id === currentStep && !isCompleted;

          let stepClass = 'status-bar__node';
          if (isActive) stepClass += ' status-bar__node--active';
          if (isCompleted) stepClass += ' status-bar__node--completed';

          return (
            <div key={step.id} className={stepClass}>
              <div className="status-bar__circle">
                {isCompleted ? '✓' : step.id}
              </div>
              <span className="font-label-caps status-bar__label">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusBar;
