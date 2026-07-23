import React, { useState } from 'react';
import StatusBar from '../../components/simulator/StatusBar/StatusBar.jsx';
import ClientPanel from '../../components/simulator/ClientPanel/ClientPanel.jsx';
import FreelancerPanel from '../../components/simulator/FreelancerPanel/FreelancerPanel.jsx';
import ArbitratorPanel from '../../components/simulator/ArbitratorPanel/ArbitratorPanel.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './ImmutabilityTestPage.css';

const IMMUTABILITY_TEST_LOGS = [
  { time: '14:30:12', tag: 'SYS', message: 'Initializing virtual network...' },
  { time: '14:30:15', tag: 'SYS', message: 'Connected to 3 virtual peers.' },
  { time: '14:32:01', tag: 'TX', message: 'Pending: 0x4a9b...21f0' },
  { time: '14:32:05', tag: 'MINED', message: 'Bloco #1204 - Hash: 0x8F9...A2C' },
  { time: '14:32:05', tag: 'ACTION', message: 'Contrato Criado. Aguardando fundos.' },
  { time: '14:35:10', tag: 'ACTION', message: 'Depósito Confirmado: 500 BRL bloqueados no cofre. Hash: 0x5E2...B91' },
  { time: '14:38:22', tag: 'ACTION', message: 'Entrega de Trabalho Detectada. Hash: 0x9A3...C77. Status: Em Revisão.' },
  { time: '14:42:15', tag: 'ERROR', message: 'ALERT Disputa Aberta por Maria. Hash: 0xC4D...7F2. Painel de Arbitragem ATIVADO.' },
  { time: '14:55:01', tag: 'SUCCESS', message: 'SUCCESS: Arbitrator voted for Freelancer. Hash: 0xFD3...9A1. Funds released to João automatically. Contract CLOSED.' },
  { time: '14:56:22', tag: 'ERROR', message: 'ERRO 403: Contrato Imutável. Acesso negado pela rede.' },
  { time: '14:57:05', tag: 'ERROR', message: 'TAMPER ATTEMPT: Attempting to change contract balance... REJECTED' },
  { time: '14:57:08', tag: 'ERROR', message: 'ACCESS DENIED: Cryptographic proof mismatch. Contract state remains IMMUTABLE.' },
];

export function ImmutabilityTestPage() {
  const [currentStep, setCurrentStep] = useState(5);
  const [clientBalance, setClientBalance] = useState(2000);
  const [logs, setLogs] = useState(IMMUTABILITY_TEST_LOGS);

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
    addLog('ERROR', 'TAMPER ATTEMPT DETECTED: Attempting to override contract balance... REJECTED by Network Consensus!');
    addLog('ERROR', 'ACCESS DENIED: Cryptographic proof mismatch. Smart contract code is IMMUTABLE.');
  };

  const handleResetSimulation = () => {
    setCurrentStep(5);
    setClientBalance(2000);
    setLogs([
      ...IMMUTABILITY_TEST_LOGS,
      { time: getCurrentTime(), tag: 'SYS', message: 'Estado do teste de imutabilidade reiniciado.' },
    ]);
  };

  return (
    <div className="immutability-test-page">
      {/* All 5 steps completed */}
      <StatusBar currentStep={currentStep} />

      <div className="immutability-test-page__grid">
        <div className="immutability-test-page__left-col">
          <div className="immutability-test-page__roles-grid">
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
              onSendWork={() => {}}
            />
          </div>

          <ArbitratorPanel
            currentStep={currentStep}
            resolvedWinner="João"
            onVote={() => {}}
          />
        </div>

        <div className="immutability-test-page__right-col">
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

export default ImmutabilityTestPage;
