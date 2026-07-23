import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import SimulatorPage from '../pages/SimulatorPage/SimulatorPage.jsx';
import DepositConfirmedPage from '../pages/DepositConfirmedPage/DepositConfirmedPage.jsx';
import WorkDeliveredPage from '../pages/WorkDeliveredPage/WorkDeliveredPage.jsx';
import DisputeStartedPage from '../pages/DisputeStartedPage/DisputeStartedPage.jsx';
import DisputeResolvedPage from '../pages/DisputeResolvedPage/DisputeResolvedPage.jsx';
import ImmutabilityTestPage from '../pages/ImmutabilityTestPage/ImmutabilityTestPage.jsx';
import TransactionDetailsPage from '../pages/TransactionDetailsPage/TransactionDetailsPage.jsx';
import EventLogsPage from '../pages/EventLogsPage/EventLogsPage.jsx';
import SmartContractCodePage from '../pages/SmartContractCodePage/SmartContractCodePage.jsx';
import ResetSimulationPage from '../pages/ResetSimulationPage/ResetSimulationPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SimulatorPage />} />
        <Route path="deposito-realizado" element={<DepositConfirmedPage />} />
        <Route path="trabalho-entregue" element={<WorkDeliveredPage />} />
        <Route path="disputa-iniciada" element={<DisputeStartedPage />} />
        <Route path="disputa-finalizada" element={<DisputeResolvedPage />} />
        <Route path="teste-imutabilidade" element={<ImmutabilityTestPage />} />
        <Route path="transacao" element={<TransactionDetailsPage />} />
        <Route path="explorer" element={<TransactionDetailsPage />} />
        <Route path="log-de-eventos" element={<EventLogsPage />} />
        <Route path="logs" element={<EventLogsPage />} />
        <Route path="smart-contracts" element={<SmartContractCodePage />} />
        <Route path="codigo" element={<SmartContractCodePage />} />
        <Route path="reiniciar-simulacao" element={<ResetSimulationPage />} />
        <Route path="reset" element={<ResetSimulationPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
