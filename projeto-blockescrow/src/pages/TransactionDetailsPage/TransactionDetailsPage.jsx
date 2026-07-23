import React, { useState } from 'react';
import './TransactionDetailsPage.css';

const RAW_EVENT_JSON = `{
  "event": "DepositConfirmed",
  "contract": "0xBlockEscrow...C0DE",
  "funder": "0xMaria...789",
  "amount": "500.00",
  "currency": "BRL_SIMULATED",
  "escrowId": "ESC-90812-TX",
  "status": "LOCKED",
  "timestamp": 1698158110,
  "signature": "0x7a8b9c...f1e2d3",
  "conditions": [
    "delivery_confirmed",
    "inspection_passed"
  ]
}`;

export function TransactionDetailsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tx-details-page">
      {/* Page Header */}
      <div className="tx-details-page__header">
        <h1 className="font-display tx-details-page__title">Transaction Details</h1>
        <p className="tx-details-page__subtitle">
          Real-time cryptographic audit trail of simulated Escrow contract execution.
        </p>
      </div>

      <div className="tx-details-page__grid">
        {/* Main Column */}
        <div className="tx-details-page__main-col">
          {/* Transaction Summary Card */}
          <div className="tx-details-card">
            <div className="tx-details-card__top">
              <div className="tx-details-card__hash-group">
                <span className="material-symbols-outlined tx-details-card__hash-icon">tag</span>
                <span className="font-data-code tx-details-card__hash">
                  0x5E2A8F3C9D1E4B7A6C5F0E2D1A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0B91
                </span>
                <button
                  className="tx-details-card__copy-btn"
                  onClick={() => handleCopy('0x5E2A8F3C9D1E4B7A6C5F0E2D1A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0B91')}
                  title="Copy Hash"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              <div className="tx-details-card__status-badge">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                Success
              </div>
            </div>

            {/* Key Value Data Grid */}
            <div className="tx-details-card__data-grid">
              <div className="tx-details-card__row">
                <span className="font-label-caps tx-details-card__label">Block</span>
                <div className="tx-details-card__val-group">
                  <span className="material-symbols-outlined text-sm tx-details-card__block-icon">deployed_code</span>
                  <span className="font-data-code tx-details-card__link">18,402,192</span>
                </div>
              </div>

              <div className="tx-details-card__row">
                <span className="font-label-caps tx-details-card__label">Timestamp</span>
                <div className="tx-details-card__val-group">
                  <span className="material-symbols-outlined text-sm text-outline">schedule</span>
                  <span className="font-data-code text-on-surface-variant">14:35:10 | Oct-24-2023</span>
                </div>
              </div>

              <div className="tx-details-card__row">
                <span className="font-label-caps tx-details-card__label">Action</span>
                <span className="font-data-code text-on-surface">Deposit - Action Depósito Confirmado</span>
              </div>

              <div className="tx-details-card__row">
                <span className="font-label-caps tx-details-card__label">Value</span>
                <span className="font-data-code tx-details-card__value">
                  500 BRL <span className="tx-details-card__simulated-tag">(Simulated)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Smart Contract Interaction Flow Card */}
          <div className="tx-details-card">
            <h3 className="font-headline-mobile text-on-surface tx-details-card__heading">
              Smart Contract Interaction
            </h3>

            <div className="tx-details-flow">
              <div className="tx-details-flow__line"></div>

              {/* From Funder */}
              <div className="tx-details-flow__item">
                <div className="tx-details-flow__avatar">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="tx-details-flow__info">
                  <span className="font-label-caps tx-details-card__label">From (Maria/Funder)</span>
                  <div className="tx-details-flow__address-box">
                    <span className="font-data-code tx-details-flow__address">0xMariaA1B2C3D4E5F6789</span>
                    <button
                      className="tx-details-card__copy-btn"
                      onClick={() => handleCopy('0xMariaA1B2C3D4E5F6789')}
                      title="Copy Address"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Interacted With Contract */}
              <div className="tx-details-flow__item">
                <div className="tx-details-flow__avatar tx-details-flow__avatar--contract">
                  <span className="material-symbols-outlined text-primary-container">contract</span>
                </div>
                <div className="tx-details-flow__info">
                  <span className="font-label-caps tx-details-card__label">Interacted With (Contract)</span>
                  <div className="tx-details-flow__address-box tx-details-flow__address-box--contract">
                    <span className="material-symbols-outlined text-sm text-primary">description</span>
                    <span className="font-data-code text-on-surface">0xBlockEscrowA1B2C3C0DE</span>
                    <button
                      className="tx-details-card__copy-btn"
                      onClick={() => handleCopy('0xBlockEscrowA1B2C3C0DE')}
                      title="Copy Contract Address"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Side Column */}
        <div className="tx-details-page__side-col">
          {/* Gas & Execution Data */}
          <div className="tx-details-card">
            <h3 className="font-label-caps tx-details-card__label uppercase flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-sm">local_gas_station</span>
              Execution Data
            </h3>

            <div className="tx-details-gas">
              <div className="tx-details-gas__row">
                <span className="text-sm text-on-surface-variant">Gas Used</span>
                <span className="font-data-code">21,000 <span className="text-xs text-outline">(Simulated)</span></span>
              </div>
              <div className="tx-details-gas__row">
                <span className="text-sm text-on-surface-variant">Gas Limit</span>
                <span className="font-data-code">50,000</span>
              </div>
              <div className="tx-details-gas__row">
                <span className="text-sm text-on-surface-variant">Base Fee</span>
                <span className="font-data-code">15 Gwei</span>
              </div>
            </div>
          </div>

          {/* Input Data / Event Log JSON Terminal */}
          <div className="tx-details-card tx-details-card--raw">
            <div className="tx-details-card__raw-header">
              <h3 className="font-label-caps text-xs text-outline-variant uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">code</span>
                Input Data / Event Log
              </h3>
              <button
                className="tx-details-card__copy-btn text-xs flex items-center gap-1"
                onClick={() => handleCopy(RAW_EVENT_JSON)}
              >
                <span className="material-symbols-outlined text-sm">download</span> Raw
              </button>
            </div>
            <pre className="font-data-code tx-details-card__raw-body">
              {RAW_EVENT_JSON}
              <span className="text-primary-container animate-pulse">_</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPage;
