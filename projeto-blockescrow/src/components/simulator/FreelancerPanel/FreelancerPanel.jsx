import React from 'react';
import Button from '../../common/Button/Button.jsx';
import './FreelancerPanel.css';

export function FreelancerPanel({
  currentStep = 1,
  onSendWork,
}) {
  const canSendWork = currentStep === 2;

  let statusText = 'Aguardando Depósito';
  let statusBadgeClass = 'freelancer-panel__status--waiting';

  if (currentStep === 2) {
    statusText = 'Cofre Trancado (Pronto)';
    statusBadgeClass = 'freelancer-panel__status--ready';
  } else if (currentStep === 3) {
    statusText = 'Trabalho Entregue';
    statusBadgeClass = 'freelancer-panel__status--delivered';
  } else if (currentStep === 4) {
    statusText = 'Em Disputa';
    statusBadgeClass = 'freelancer-panel__status--disputed';
  } else if (currentStep >= 5) {
    statusText = 'Pagamento Recebido';
    statusBadgeClass = 'freelancer-panel__status--received';
  }

  return (
    <div className="freelancer-panel">
      <div className="freelancer-panel__header">
        <div>
          <h2 className="freelancer-panel__title">João (Freelancer)</h2>
          <p className="freelancer-panel__subtitle">Role: Executor</p>
        </div>
        <span className="material-symbols-outlined freelancer-panel__icon">
          work
        </span>
      </div>

      <div className="freelancer-panel__status-box">
        <span className="font-label-caps freelancer-panel__status-label">Status</span>
        <span className={`font-data-code freelancer-panel__status ${statusBadgeClass}`}>
          {statusText}
        </span>
      </div>

      <div className={`freelancer-panel__upload-box ${!canSendWork && currentStep < 3 ? 'freelancer-panel__upload-box--disabled' : ''}`}>
        <span className="material-symbols-outlined freelancer-panel__upload-icon">
          upload_file
        </span>
        <p className="font-data-code freelancer-panel__filename">Logotipo_Final.svg</p>
        <p className="freelancer-panel__upload-text">
          {currentStep === 1
            ? 'Upload pending vault lock'
            : currentStep === 2
            ? 'Pronto para submissão na blockchain'
            : 'Arquivo entregue e registrado'}
        </p>
      </div>

      <Button
        variant="ghost"
        fullWidth
        disabled={!canSendWork}
        onClick={onSendWork}
        className={`freelancer-panel__send-btn ${canSendWork ? 'freelancer-panel__send-btn--active' : ''}`}
      >
        Enviar Trabalho
      </Button>
    </div>
  );
}

export default FreelancerPanel;
