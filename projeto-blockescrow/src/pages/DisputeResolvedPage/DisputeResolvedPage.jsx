import React, { useState } from 'react';
import StatusBar from '../../components/simulator/StatusBar/StatusBar.jsx';
import ClientPanel from '../../components/simulator/ClientPanel/ClientPanel.jsx';
import FreelancerPanel from '../../components/simulator/FreelancerPanel/FreelancerPanel.jsx';
import ArbitratorPanel from '../../components/simulator/ArbitratorPanel/ArbitratorPanel.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './DisputeResolvedPage.css';

const DISPUTE_RESOLVED_LOGS = [
  { time: '14:30:12', tag: 'SYS', message: 'Initializing virtual network...' },
  { time: '14:30:15', tag: 'SYS', message: 'Connected to 3 virtual peers.' },
  { time: '14:32:01', tag: 'TX', message: 'Pending: 0x4a9b...21f0' },
  { time: '14:32:05', tag: 'MINED', message: 'Bloco #1204 - Hash: 0x8F9...A2C' },
  { time: '14:32:05', tag: 'ACTION', message: 'Contrato Criado. Aguardando fundos.' },
  { time: '14:35:10', tag: 'ACTION', message: 'Depósito Confirmado: 500 BRL bloqueados no cofre. Hash: 0x5E2...B91' },
  { time: '14:38:22', tag: 'ACTION', message: 'Entrega de Trabalho Detectada. Hash: 0x9A3...C77. Status: Em Revisão.' },
  { time: '14:42:15', tag: 'ERROR', message: 'ALERT Disputa Aberta por Maria. Hash: 0xC4D...7F2. Painel de Arbitragem ATIVADO.' },
  { time: '14:55:01', tag: 'SUCCESS', message: 'SUCCESS: Arbitrator voted for Freelancer. Hash: 0xFD3...9A1. Funds released to João automatically. Contract CLOSED.' },
];

export function DisputeResolvedPage() {
  const [currentStep, setCurrentStep] = useState(5);
  const [clientBalance, setClientBalance] = useState(2000);
  const [logs, setLogs] = useState(DISPUTE_RESOLVED_LOGS);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { hour12: false });
  };

  const addLog = (tag, message) => {
    setLogs((prev) => [
      ...prev,
      { time: getCurrentTime(), tag, message },
    ]);
  };

  const handleHackerTest = () => {
    addLog('ERROR', 'ERRO 403: Contrato Imutável. Tentativa ilegal de desvio de fundos rejeitada pela rede.');
  };

  const handleResetSimulation = () => {
    setCurrentStep(5);
    setClientBalance(2000);
    setLogs([
      ...DISPUTE_RESOLVED_LOGS,
      { time: getCurrentTime(), tag: 'SYS', message: 'Estado resetado para Disputa Finalizada.' },
    ]);
  };

  return (
    <div className="dispute-resolved-page">
      {/* All 5 steps completed */}
      <StatusBar currentStep={currentStep} />

      <div className="dispute-resolved-page__grid">
        <div className="dispute-resolved-page__left-col">
          <div className="dispute-resolved-page__roles-grid">
            <ClientPanel
              balance={clientBalance}
              paymentSentBadge={true}
              currentStep={currentStep}
              onDeposit={() => {}}
              onApprove={() => {}}
              onOpenDispute={() => {}}
            />

            <FreelancerPanel
              currentStep={currentStep}
              disputeWinner="João"
              onSendWork={() => {}}
            />
          </div>

          <ArbitratorPanel
            currentStep={currentStep}
            resolvedWinner="João"
            onVote={() => {}}
          />
        </div>

        <div className="dispute-resolved-page__right-col">
          <TerminalConsole
            logs={logs}
            onHackerClick={handleHackerTest}
            onResetSimulation={handleResetSimulation}
          />
        </div>
      </div>
    </div>
  );
}

export default DisputeResolvedPage;
