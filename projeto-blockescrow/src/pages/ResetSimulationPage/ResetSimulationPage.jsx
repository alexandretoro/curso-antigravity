import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './ResetSimulationPage.css';

const RESET_SIMULATION_LOGS = [
  { time: '14:30:00', tag: 'SYS', message: 'Simulator Initialized' },
  { time: '14:30:01', tag: 'SYS', message: 'Environment Cleared' },
  { time: '14:30:05', tag: 'TX', message: 'Executing deployment transaction...' },
  { time: '14:30:05', tag: 'MINED', message: 'TxHash: 0x3a4b9...e2f1 | Status: CONFIRMED | Gas Used: 145,200' },
  { time: '14:30:05', tag: 'ACTION', message: 'EVENT: ContractDeployed(address 0x8f2A...c9E1)' },
  { time: '14:30:05', tag: 'ACTION', message: 'STATE_CHANGE: status = AWAITING_PAYMENT' },
];

export function ResetSimulationPage() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState(RESET_SIMULATION_LOGS);

  const handleSimulateDeposit = () => {
    // Navigate to Deposit Confirmed page when deposit simulated
    navigate('/deposito-realizado');
  };

  const handleHackerTest = () => {
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
        tag: 'ERROR',
        message: 'ERRO 403: Contrato em AWAITING_PAYMENT. Nenhuma transferência permitida sem depósito prévio.',
      },
    ]);
  };

  const handleResetSimulation = () => {
    setLogs([
      ...RESET_SIMULATION_LOGS,
      {
        time: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
        tag: 'SYS',
        message: 'Estado do contrato reiniciado para AWAITING_PAYMENT.',
      },
    ]);
  };

  return (
    <div className="reset-sim-page">
      <div className="reset-sim-page__grid">
        {/* Central Action Area */}
        <div className="reset-sim-page__main-col">
          {/* Header */}
          <div className="reset-sim-page__header">
            <div className="reset-sim-page__title-row">
              <h1 className="font-display reset-sim-page__title">Escrow Simulation</h1>
              <span className="reset-sim-page__status-badge">
                <span className="reset-sim-page__pulse-dot"></span>
                AWAITING_PAYMENT
              </span>
            </div>
            <p className="reset-sim-page__subtitle">
              Contract ID: <span className="font-data-code text-primary">0x8f2A...c9E1</span>
            </p>
          </div>

          {/* Deposit Action Card */}
          <div className="reset-sim-card reset-sim-card--deposit">
            <div className="reset-sim-card__icon-wrap">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
            </div>

            <h3 className="font-headline-mobile text-on-surface reset-sim-card__heading">
              Initial Deposit Required
            </h3>

            <p className="text-on-surface-variant reset-sim-card__desc">
              Maria (Funder) must deposit the agreed amount into the smart contract to initiate the escrow lock period.
            </p>

            <div className="reset-sim-card__amount-box">
              <span className="font-label-caps text-on-surface-variant">Amount:</span>
              <span className="font-data-code text-primary text-xl font-bold">R$ 500.00</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSimulateDeposit}
              className="reset-sim-card__deposit-btn"
            >
              SIMULATE DEPOSIT
            </Button>
          </div>

          {/* Simulation Timeline/Progress Card */}
          <div className="reset-sim-card">
            <h4 className="font-label-caps text-on-surface-variant mb-6 text-xs uppercase">
              Simulation Flow
            </h4>

            <div className="reset-sim-timeline">
              <div className="reset-sim-timeline__line"></div>

              {/* Step 1 Completed */}
              <div className="reset-sim-timeline__step">
                <div className="reset-sim-timeline__icon reset-sim-timeline__icon--check">
                  <span className="material-symbols-outlined text-xs text-on-secondary-container font-bold">check</span>
                </div>
                <div>
                  <div className="font-data-code text-on-surface text-sm">Contract Deployed</div>
                  <div className="text-on-surface-variant text-xs">Initialization parameters set.</div>
                </div>
              </div>

              {/* Step 2 Active */}
              <div className="reset-sim-timeline__step">
                <div className="reset-sim-timeline__icon reset-sim-timeline__icon--active">
                  <span className="reset-sim-timeline__active-ping"></span>
                  <span className="reset-sim-timeline__active-dot"></span>
                </div>
                <div>
                  <div className="font-data-code text-primary text-sm font-semibold">Funder Deposit</div>
                  <div className="text-on-surface-variant text-xs">Awaiting R$ 500 from Maria.</div>
                </div>
              </div>

              {/* Step 3 Pending */}
              <div className="reset-sim-timeline__step reset-sim-timeline__step--pending">
                <div className="reset-sim-timeline__icon reset-sim-timeline__icon--pending">
                  <span className="reset-sim-timeline__pending-dot"></span>
                </div>
                <div>
                  <div className="font-data-code text-on-surface text-sm">Service Execution</div>
                  <div className="text-on-surface-variant text-xs">Provider completes task.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lateral Column */}
        <div className="reset-sim-page__side-col">
          <TerminalConsole
            logs={logs}
            onHackerClick={handleHackerTest}
            onResetSimulation={handleResetSimulation}
          />

          {/* Contract Details Card */}
          <div className="reset-sim-card reset-sim-card--details">
            <h4 className="font-label-caps text-on-surface mb-3 text-xs uppercase border-b border-outline-variant pb-2">
              Contract Details
            </h4>
            <dl className="reset-sim-card__dl font-data-code text-xs">
              <div className="reset-sim-card__dl-row">
                <dt className="text-on-surface-variant">Funder:</dt>
                <dd className="text-on-surface">Maria (0x1A...2B)</dd>
              </div>
              <div className="reset-sim-card__dl-row">
                <dt className="text-on-surface-variant">Provider:</dt>
                <dd className="text-on-surface">João (0x3C...4D)</dd>
              </div>
              <div className="reset-sim-card__dl-row reset-sim-card__dl-row--border">
                <dt className="text-on-surface-variant">Network:</dt>
                <dd className="text-primary">SimNet Alpha</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetSimulationPage;
