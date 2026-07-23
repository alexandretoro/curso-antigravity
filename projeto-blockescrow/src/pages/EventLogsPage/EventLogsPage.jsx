import React, { useState } from 'react';
import './EventLogsPage.css';

const EVENTS_LIST = [
  {
    id: 1,
    name: 'ContractCreated',
    time: 'Oct-24-2023 14:30:05',
    hash: '0x8f2...e41',
    type: 'primary',
  },
  {
    id: 2,
    name: 'DepositConfirmed',
    time: '14:35:10',
    amount: '500 BRL',
    sender: 'Maria',
    type: 'secondary',
  },
  {
    id: 3,
    name: 'FundsLocked',
    time: '14:35:12',
    status: 'ESCROW ACTIVE',
    type: 'active',
  },
];

export function EventLogsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="event-logs-page">
      {/* Page Header */}
      <div className="event-logs-page__header">
        <h1 className="font-display event-logs-page__title">Event Logs (Explorer)</h1>
        <p className="event-logs-page__subtitle">
          On-chain event trail emitted by the BlockEscrow Smart Contract.
        </p>
      </div>

      <div className="event-logs-page__grid">
        {/* Main Column */}
        <div className="event-logs-page__main-col">
          {/* Summary Card */}
          <div className="event-logs-card">
            <div className="event-logs-card__top">
              <div className="event-logs-card__hash-group">
                <span className="material-symbols-outlined event-logs-card__hash-icon">tag</span>
                <span className="font-data-code event-logs-card__hash">
                  0x5E2A8F3C9D1E4B7A6C5F0E2D1A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0B91
                </span>
                <button
                  className="event-logs-card__copy-btn"
                  onClick={() => handleCopy('0x5E2A8F3C9D1E4B7A6C5F0E2D1A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0B91')}
                  title="Copy Hash"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              <div className="event-logs-card__status-badge">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                Success
              </div>
            </div>

            {/* Key Value Data Grid */}
            <div className="event-logs-card__data-grid">
              <div className="event-logs-card__row">
                <span className="font-label-caps event-logs-card__label">Block</span>
                <div className="event-logs-card__val-group">
                  <span className="material-symbols-outlined text-sm event-logs-card__block-icon">deployed_code</span>
                  <span className="font-data-code event-logs-card__link">18,402,192</span>
                </div>
              </div>

              <div className="event-logs-card__row">
                <span className="font-label-caps event-logs-card__label">Timestamp</span>
                <div className="event-logs-card__val-group">
                  <span className="material-symbols-outlined text-sm text-outline">schedule</span>
                  <span className="font-data-code text-on-surface-variant">14:35:10 | Oct-24-2023</span>
                </div>
              </div>

              <div className="event-logs-card__row">
                <span className="font-label-caps event-logs-card__label">Action</span>
                <span className="font-data-code text-on-surface">Deposit - Action Depósito Confirmado</span>
              </div>

              <div className="event-logs-card__row">
                <span className="font-label-caps event-logs-card__label">Value</span>
                <span className="font-data-code event-logs-card__value">
                  500 BRL <span className="event-logs-card__simulated-tag">(Simulated)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Event Log Interaction Card */}
          <div className="event-logs-card">
            <h3 className="font-headline-mobile text-on-surface event-logs-card__heading">
              <span className="material-symbols-outlined text-sm text-primary-container mr-2">history</span>
              Event Log
            </h3>

            <div className="event-logs-flow">
              <div className="event-logs-flow__line"></div>

              {/* From Funder */}
              <div className="event-logs-flow__item">
                <div className="event-logs-flow__avatar">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="event-logs-flow__info">
                  <span className="font-label-caps event-logs-card__label">From (Maria/Funder)</span>
                  <div className="event-logs-flow__address-box">
                    <span className="font-data-code event-logs-flow__address">0xMariaA1B2C3D4E5F6789</span>
                    <button
                      className="event-logs-card__copy-btn"
                      onClick={() => handleCopy('0xMariaA1B2C3D4E5F6789')}
                      title="Copy Address"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Interacted With Contract */}
              <div className="event-logs-flow__item">
                <div className="event-logs-flow__avatar event-logs-flow__avatar--contract">
                  <span className="material-symbols-outlined text-primary-container">contract</span>
                </div>
                <div className="event-logs-flow__info">
                  <span className="font-label-caps event-logs-card__label">Interacted With (Contract)</span>
                  <div className="event-logs-flow__address-box event-logs-flow__address-box--contract">
                    <span className="material-symbols-outlined text-sm text-primary">description</span>
                    <span className="font-data-code text-on-surface">0xBlockEscrowA1B2C3C0DE</span>
                    <button
                      className="event-logs-card__copy-btn"
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
        <div className="event-logs-page__side-col">
          {/* Gas & Execution Card */}
          <div className="event-logs-card">
            <h3 className="font-label-caps event-logs-card__label uppercase flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-sm">local_gas_station</span>
              Execution Data
            </h3>

            <div className="event-logs-gas">
              <div className="event-logs-gas__row">
                <span className="text-sm text-on-surface-variant">Gas Used</span>
                <span className="font-data-code">21,000 <span className="text-xs text-outline">(Simulated)</span></span>
              </div>
              <div className="event-logs-gas__row">
                <span className="text-sm text-on-surface-variant">Gas Limit</span>
                <span className="font-data-code">50,000</span>
              </div>
              <div className="event-logs-gas__row">
                <span className="text-sm text-on-surface-variant">Base Fee</span>
                <span className="font-data-code">15 Gwei</span>
              </div>
            </div>
          </div>

          {/* Structured Event Log Terminal */}
          <div className="event-logs-card event-logs-card--raw">
            <div className="event-logs-card__raw-header">
              <h3 className="font-label-caps text-xs text-outline-variant uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-primary-container">history</span>
                Event Log History
              </h3>
            </div>
            <div className="event-logs-card__events-body font-data-code">
              {EVENTS_LIST.map((evt) => (
                <div key={evt.id} className={`event-logs-card__event-item event-logs-card__event-item--${evt.type}`}>
                  <div className="event-logs-card__event-top">
                    <span className="event-logs-card__event-name">{evt.name}</span>
                    <span className="event-logs-card__event-time">{evt.time}</span>
                  </div>
                  {evt.hash && <div className="event-logs-card__event-detail">Hash: {evt.hash}</div>}
                  {evt.amount && (
                    <div className="event-logs-card__event-detail">
                      Amount: <span className="text-primary-container">{evt.amount}</span> | Sender: {evt.sender}
                    </div>
                  )}
                  {evt.status && (
                    <div className="event-logs-card__event-detail">
                      Status: <span className="event-logs-card__status-tag">{evt.status}</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="event-logs-card__end-line">
                <span className="animate-pulse">_</span>
                <span>End of Log</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventLogsPage;
