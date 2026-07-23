import React, { useState } from 'react';
import StatusBar from '../../components/simulator/StatusBar/StatusBar.jsx';
import ClientPanel from '../../components/simulator/ClientPanel/ClientPanel.jsx';
import FreelancerPanel from '../../components/simulator/FreelancerPanel/FreelancerPanel.jsx';
import ArbitratorPanel from '../../components/simulator/ArbitratorPanel/ArbitratorPanel.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './DepositConfirmedPage.css';

const DEPOSIT_CONFIRMED_LOGS = [
  { time: '14:30:12', tag: 'SYS', message: 'Initializing virtual network...' },
  { time: '14:30:15', tag: 'SYS', message: 'Connected to 3 virtual peers.' },
  { time: '14:32:01', tag: 'TX', message: 'Pending: 0x4a9b...21f0' },
  { time: '14:32:05', tag: 'MINED', message: 'Bloco #1204 - Hash: 0x8F9...A2C' },
  { time: '14:32:05', tag: 'ACTION', message: 'Contrato Criado. Aguardando fundos.' },
  { time: '14:35:10', tag: 'ACTION', message: 'Depósito Confirmado: 500 BRL bloqueados no cofre. Hash: 0x5E2...B91' },
];

export function DepositConfirmedPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [clientBalance, setClientBalance] = useState(2000);
  const [logs, setLogs] = useState(DEPOSIT_CONFIRMED_LOGS);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { hour12: false });
  };

  const addLog = (tag, message) => {
    setLogs((prev) => [
      ...prev,
      { time: getCurrentTime(), tag, message },
    ]);
  };

  const handleSendWork = () => {
    setCurrentStep(3);
    addLog('ACTION', 'João enviou o arquivo "Logotipo_Final.svg" para a blockchain.');
    addLog('SYS', 'Notificação enviada para Maria: Aprovar Entrega ou Abrir Disputa.');
  };

  const handleApprove = () => {
    setCurrentStep(5);
    addLog('SUCCESS', 'Maria APROVOU a entrega! Contrato finalizado.');
    addLog('MINED', 'Bloco #1205 - R$ 500,00 transferidos para João.');
  };

  const handleOpenDispute = () => {
    setCurrentStep(4);
    addLog('DISPUTE', 'Maria ABRIU UMA DISPUTA sobre a entrega.');
    addLog('ACTION', 'Painel de Arbitragem ativado.');
  };

  const handleVote = (winner) => {
    setCurrentStep(5);
    addLog('RESOLUTION', `Arbitrador votou a favor de ${winner.toUpperCase()}.`);
    addLog('SUCCESS', `Fundos liberados para ${winner}.`);
  };

  const handleHackerTest = () => {
    addLog('ERROR', 'ERRO 403: Contrato Imutável. Tentativa ilegal de desvio de fundos rejeitada pela rede.');
  };

  const handleResetSimulation = () => {
    setCurrentStep(2);
    setClientBalance(2000);
    setLogs([
      ...DEPOSIT_CONFIRMED_LOGS,
      { time: getCurrentTime(), tag: 'SYS', message: 'Estado resetado para Depósito Realizado.' },
    ]);
  };

  return (
    <div className="deposit-confirmed-page">
      {/* Step 2 active */}
      <StatusBar currentStep={currentStep} />

      <div className="deposit-confirmed-page__grid">
        <div className="deposit-confirmed-page__left-col">
          <div className="deposit-confirmed-page__roles-grid">
            <ClientPanel
              balance={clientBalance}
              vaultedAmount="500 BRL"
              currentStep={currentStep}
              onDeposit={() => {}}
              onApprove={handleApprove}
              onOpenDispute={handleOpenDispute}
            />

            <FreelancerPanel
              currentStep={currentStep}
              onSendWork={handleSendWork}
            />
          </div>

          <ArbitratorPanel
            currentStep={currentStep}
            onVote={handleVote}
          />
        </div>

        <div className="deposit-confirmed-page__right-col">
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

export default DepositConfirmedPage;
