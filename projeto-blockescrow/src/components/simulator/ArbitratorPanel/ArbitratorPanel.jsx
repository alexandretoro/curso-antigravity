import React from 'react';
import Button from '../../common/Button/Button.jsx';
import './ArbitratorPanel.css';

export function ArbitratorPanel({
  currentStep = 1,
  resolvedWinner = null,
  onVote,
}) {
  const isDisputeActive = currentStep === 4;
  const isResolved = currentStep === 5 && resolvedWinner !== null;

  return (
    <div className={`arbitrator-panel ${!isDisputeActive && !isResolved ? 'arbitrator-panel--inactive' : ''}`}>
      <div className="arbitrator-panel__header">
        <div className="arbitrator-panel__title-group">
          <span className="material-symbols-outlined arbitrator-panel__icon">
            gavel
          </span>
          <h2 className="arbitrator-panel__title">
            {isResolved ? 'Dispute Resolved' : 'Arbitrator Panel'}
          </h2>
        </div>

        <span className={`font-data-code arbitrator-panel__badge ${isResolved ? 'arbitrator-panel__badge--resolved' : isDisputeActive ? 'arbitrator-panel__badge--active' : ''}`}>
          {isResolved ? 'Resolved' : isDisputeActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="arbitrator-panel__content">
        {isResolved ? (
          <div className="arbitrator-panel__resolved-box">
            <div className="arbitrator-panel__evidence-grid">
              <div className="arbitrator-panel__evidence-card">
                <p className="font-label-caps arbitrator-panel__card-label">Evidence: Delivery</p>
                <div className="arbitrator-panel__file-info">
                  <span className="material-symbols-outlined arbitrator-panel__file-icon">description</span>
                  <div>
                    <p className="font-data-code arbitrator-panel__file-name">Logotipo_Final.svg</p>
                    <p className="arbitrator-panel__file-meta">Uploaded by João (Executor)</p>
                  </div>
                </div>
              </div>

              <div className="arbitrator-panel__evidence-card">
                <p className="font-label-caps arbitrator-panel__card-label">Dispute Reason</p>
                <p className="arbitrator-panel__dispute-text">Client claims quality does not match brief.</p>
              </div>
            </div>

            <div className="arbitrator-panel__vote-grid">
              <Button
                variant={resolvedWinner === 'Maria' ? 'secondary' : 'ghost'}
                fullWidth
                disabled
              >
                Dar Razão ao Cliente
              </Button>
              <Button
                variant={resolvedWinner === 'João' ? 'secondary' : 'ghost'}
                fullWidth
                disabled
                className={resolvedWinner === 'João' ? 'arbitrator-panel__winner-btn' : ''}
              >
                Dar Razão ao Freelancer
              </Button>
            </div>
          </div>
        ) : isDisputeActive ? (
          <div className="arbitrator-panel__resolved-box">
            <div className="arbitrator-panel__evidence-grid">
              <div className="arbitrator-panel__evidence-card">
                <p className="font-label-caps arbitrator-panel__card-label">Evidence: Delivery</p>
                <div className="arbitrator-panel__file-info">
                  <span className="material-symbols-outlined arbitrator-panel__file-icon">description</span>
                  <div>
                    <p className="font-data-code arbitrator-panel__file-name">Logotipo_Final.svg</p>
                    <p className="arbitrator-panel__file-meta">Uploaded by João (Executor)</p>
                  </div>
                </div>
              </div>

              <div className="arbitrator-panel__evidence-card">
                <p className="font-label-caps arbitrator-panel__card-label">Dispute Reason</p>
                <p className="arbitrator-panel__dispute-text">Client claims quality does not match brief.</p>
              </div>
            </div>

            <div className="arbitrator-panel__vote-grid">
              <Button
                variant="outline"
                fullWidth
                onClick={() => onVote('Maria')}
                className="arbitrator-panel__btn-client"
              >
                Dar Razão ao Cliente
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => onVote('João')}
              >
                Dar Razão ao Freelancer
              </Button>
            </div>
          </div>
        ) : (
          <p className="font-data-code arbitrator-panel__waiting-text">
            Waiting for dispute resolution trigger...
          </p>
        )}
      </div>
    </div>
  );
}

export default ArbitratorPanel;
