import React, { useState } from 'react';
import StatusBar from '../../components/simulator/StatusBar/StatusBar.jsx';
import ClientPanel from '../../components/simulator/ClientPanel/ClientPanel.jsx';
import FreelancerPanel from '../../components/simulator/FreelancerPanel/FreelancerPanel.jsx';
import ArbitratorPanel from '../../components/simulator/ArbitratorPanel/ArbitratorPanel.jsx';
import TerminalConsole from '../../components/simulator/TerminalConsole/TerminalConsole.jsx';
import './WorkDeliveredPage.css';

const WORK_DELIVERED_LOGS = [
  { time: '14:30:12', tag: 'SYS', message: 'Initializing virtual network...' },
  { time: '14:30:15', tag: 'SYS', message: 'Connected to 3 virtual peers.' },
  { time: '14:32:01', tag: 'TX', message: 'Pending: 0x4a9b...21f0' },
  { time: '14:32:05', tag: 'MINED', message: 'Bloco #1204 - Hash: 0x8F9...A2C' },
  { time: '14:32:05', tag: 'ACTION', message: 'Contrato Criado. Aguardando fundos.' },
  { time: '14:35:10', tag: 'ACTION', message: 'Depósito Confirmado: 500 BRL bloqueados no cofre. Hash: 0x5E2...B91' },
  { time: '14:38:22', tag: 'ACTION', message: 'Entrega de Trabalho Detectada. Hash: 0x9A3...C77. Status: Em Revisão.' },
];

export function WorkDeliveredPage() {
  const [currentStep, setCurrentStep] = useState(3);
  const [clientBalance, setClientBalance] = useState(2000);
  const [logs, setLogs] = useState(WORK_DELIVERED_LOGS);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { hour12: false });
  };

  const addLog = (tag, message) => {
    setLogs((prev) => [
      ...prev,
      { time: getCurrentTime(), tag, message },
    ]);
  };

  const handleApprove = () => {
    setCurrentStep(5);
    addLog('SUCCESS', 'Maria APROVOU a entrega! Contrato finalizado.');
    addLog('MINED', 'Bloco #1205 - R$ 500,00 transferidos com sucesso para a carteira de João.');
  };

  const handleOpenDispute = () => {
    setCurrentStep(4);
    addLog('DISPUTE', 'Maria ABRIU UMA DISPUTA sobre a qualidade do trabalho entregue.');
    addLog('ACTION', 'Painel de Arbitragem ativado. Aguardando voto do Arbitrador.');
  };

  const handleVote = (winner) => {
    setCurrentStep(5);
    addLog('RESOLUTION', `Arbitrador votou a favor de ${winner.toUpperCase()}.`);
    addLog('SUCCESS', `Fundos liberados para ${winner}. Simulação concluída.`);
  };

  const handleHackerTest = () => {
    addLog('ERROR', 'ERRO 403: Contrato Imutável. Tentativa ilegal de desvio de fundos rejeitada pela rede.');
  };

  const handleResetSimulation = () => {
    setCurrentStep(3);
    setClientBalance(2000);
    setLogs([
      ...WORK_DELIVERED_LOGS,
      { time: getCurrentTime(), tag: 'SYS', message: 'Estado resetado para Trabalho Entregue.' },
    ]);
  };

  return (
    <div className="work-delivered-page">
      {/* Step 3 active (Em Revisão) */}
      <StatusBar currentStep={currentStep} />

      <div className="work-delivered-page__grid">
        <div className="work-delivered-page__left-col">
          <div className="work-delivered-page__roles-grid">
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
              onSendWork={() => {}}
            />
          </div>

          <ArbitratorPanel
            currentStep={currentStep}
            onVote={handleVote}
          />
        </div>

        <div className="work-delivered-page__right-col">
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

export default WorkDeliveredPage;
