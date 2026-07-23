import React from 'react';
import Button from '../../common/Button/Button.jsx';
import './ClientPanel.css';

export function ClientPanel({
  balance = 2500,
  vaultedAmount = null,
  paymentSentBadge = false,
  refundBadge = false,
  currentStep = 1,
  onDeposit,
  onApprove,
  onOpenDispute,
}) {
  const canDeposit = currentStep === 1;
  const canApproveOrDispute = currentStep === 3;

  return (
    <div className="client-panel">
      <div className="client-panel__header">
        <div>
          <h2 className="client-panel__title">Maria (Cliente)</h2>
          <p className="client-panel__subtitle">Role: Funder</p>
        </div>
        <span className="material-symbols-outlined client-panel__icon">
          account_balance_wallet
        </span>
      </div>

      <div className="client-panel__balance-box">
        <div className="client-panel__balance-header">
          <span className="font-label-caps client-panel__balance-label">Balance</span>
          {refundBadge ? (
            <span className="font-label-caps client-panel__vaulted-badge client-panel__vaulted-badge--refunded">
              <span className="material-symbols-outlined client-panel__lock-icon">undo</span>
              Refund Received
            </span>
          ) : paymentSentBadge ? (
            <span className="font-label-caps client-panel__vaulted-badge">
              <span className="material-symbols-outlined client-panel__lock-icon">check_circle</span>
              Payment Sent
            </span>
          ) : vaultedAmount ? (
            <span className="font-label-caps client-panel__vaulted-badge">
              <span className="material-symbols-outlined client-panel__lock-icon">lock</span>
              {vaultedAmount} Vaulted
            </span>
          ) : null}
        </div>
        <span className="font-data-code client-panel__balance-val">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="client-panel__actions">
        <Button
          variant="primary"
          fullWidth
          disabled={!canDeposit}
          onClick={onDeposit}
          className="client-panel__deposit-btn"
        >
          Depositar R$ 500 no Cofre
        </Button>

        <div className={`client-panel__grid-actions ${!canApproveOrDispute ? 'client-panel__grid-actions--disabled' : ''}`}>
          <Button
            variant="secondary"
            fullWidth
            disabled={!canApproveOrDispute}
            onClick={onApprove}
          >
            Aprovar Entrega
          </Button>

          <Button
            variant="danger"
            fullWidth
            disabled={!canApproveOrDispute}
            onClick={onOpenDispute}
          >
            Abrir Disputa
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClientPanel;
