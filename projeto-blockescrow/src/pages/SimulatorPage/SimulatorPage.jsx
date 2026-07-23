import React, { useState } from 'react';
import StatusBar from '../../components/simulator/StatusBar/StatusBar.jsx';
import ClientPanel from '../../components/simulator/ClientPanel/ClientPanel.jsx';
import FreelancerPanel from '../../components/simulator/FreelancerPanel/FreelancerPanel.jsx';
import ArbitratorPanel from '../../components/simulator/ArbitratorPanel/ArbitratorPanel.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './SimulatorPage.css';

const INITIAL_LOGS = [
  { time: '14:30:12', tag: 'SYS', message: 'Initializing virtual network...' },
  { time: '14:30:15', tag: 'SYS', message: 'Connected to 3 virtual peers.' },
  { time: '14:32:01', tag: 'TX', message: 'Pending: 0x4a9b...21f0' },
  { time: '14:32:05', tag: 'MINED', message: 'Bloco #1204 - Hash: 0x8F9...A2C' },
  { time: '14:32:05', tag: 'ACTION', message: 'Contrato Criado. Aguardando fundos do cliente.' },
];

export function SimulatorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientBalance, setClientBalance] = useState(2500);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { hour12: false });
  };

  const addLog = (tag, message) => {
    setLogs((prev) => [
      ...prev,
      { time: getCurrentTime(), tag, message },
    ]);
  };

  // Step 1 -> 2: Maria deposits R$ 500
  const handleDeposit = () => {
    setClientBalance((prev) => prev - 500);
    setCurrentStep(2);
    addLog('TX', 'Maria efetuou o depósito de R$ 500,00 no contrato Escrow.');
    addLog('ACTION', 'Cofre Trancado. Aguardando execução do trabalho por João.');
  };

  // Step 2 -> 3: João sends work
  const handleSendWork = () => {
    setCurrentStep(3);
    addLog('ACTION', 'João enviou o arquivo "Logotipo_Final.svg" para a blockchain.');
    addLog('SYS', 'Notificação enviada para Maria: Aprovar Entrega ou Abrir Disputa.');
  };

  // Step 3 -> 5: Maria approves delivery
  const handleApprove = () => {
    setCurrentStep(5);
    addLog('SUCCESS', 'Maria APROVOU a entrega! Contrato finalizado.');
    addLog('MINED', 'Bloco #1205 - R$ 500,00 transferidos com sucesso para a carteira de João.');
  };

  // Step 3 -> 4: Maria opens dispute
  const handleOpenDispute = () => {
    setCurrentStep(4);
    addLog('DISPUTE', 'Maria ABRIU UMA DISPUTA sobre a qualidade do trabalho entregue.');
    addLog('ACTION', 'Painel de Arbitragem ativado. Aguardando voto do Arbitrador.');
  };

  // Step 4 -> 5: Arbitrator votes
  const handleVote = (winner) => {
    setCurrentStep(5);
    addLog('RESOLUTION', `Arbitrador votou a favor de ${winner.toUpperCase()}.`);
    addLog('SUCCESS', `Fundos liberados para ${winner}. Simulação concluída.`);
  };

  // Hacker Button immutability check
  const handleHackerTest = () => {
    addLog('ERROR', 'ERRO 403: Contrato Imutável. Tentativa ilegal de desvio de fundos rejeitada pela rede.');
  };

  // Reset simulation
  const handleResetSimulation = () => {
    setCurrentStep(1);
    setClientBalance(2500);
    setLogs([
      ...INITIAL_LOGS,
      { time: getCurrentTime(), tag: 'SYS', message: 'Simulação reiniciada para o estado inicial.' },
    ]);
  };

  return (
    <div className="simulator-page">
      {/* 5-Step Visual Status Bar */}
      <StatusBar currentStep={currentStep} />

      {/* Main Grid: Left Column (Participant Panels) & Right Column (Blockchain Terminal) */}
      <div className="simulator-page__grid">
        {/* Left Column */}
        <div className="simulator-page__left-col">
          <div className="simulator-page__roles-grid">
            <ClientPanel
              balance={clientBalance}
              vaultedAmount={currentStep >= 2 && currentStep < 5 ? '500 BRL' : null}
              currentStep={currentStep}
              onDeposit={handleDeposit}
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

        {/* Right Column */}
        <div className="simulator-page__right-col">
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

export default SimulatorPage;
