import React, { useState } from 'react';
import Button from '../../components/common/Button/Button.jsx';
import './SmartContractCodePage.css';

const SOLIDITY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title BlockEscrow
 * @dev Implements a secure escrow system with multi-sig dispute resolution.
 * Ensures immutability of funds once locked, until consensus is reached.
 */
contract BlockEscrow {
    
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, DISPUTED }
    
    address public buyer;
    address public seller;
    address public arbiter;
    
    State public currentState;
    
    modifier inState(State _state) {
        require(currentState == _state, "Invalid state for this action");
        _;
    }
    
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }

    // Escrow Logic Initialization
    constructor(address _seller, address _arbiter) {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        currentState = State.AWAITING_PAYMENT;
    }

    // Deposit funds, ensuring immutability once locked
    function depositFunds() external payable inState(State.AWAITING_PAYMENT) {
        currentState = State.AWAITING_DELIVERY;
    }

    // Buyer confirms delivery
    function confirmDelivery() external onlyBuyer inState(State.AWAITING_DELIVERY) {
        currentState = State.COMPLETE;
        payable(seller).transfer(address(this).balance);
    }

    // Dispute Resolution via Arbiter
    function initiateDispute() external inState(State.AWAITING_DELIVERY) {
        require(msg.sender == buyer || msg.sender == seller, "Unauthorized");
        currentState = State.DISPUTED;
    }
}`;

export function SmartContractCodePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SOLIDITY_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([SOLIDITY_CODE], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'BlockEscrow.sol';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="contract-code-page">
      {/* Page Header */}
      <div className="contract-code-page__header">
        <div>
          <h1 className="font-display contract-code-page__title">BlockEscrow.sol</h1>
          <p className="contract-code-page__subtitle">
            Core escrow logic and dispute resolution protocols.
          </p>
        </div>

        <div className="contract-code-page__actions">
          <Button variant="outline" onClick={handleCopyCode}>
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>

          <Button variant="outline" onClick={handleDownload}>
            <span className="material-symbols-outlined text-sm">download</span>
            Download
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="contract-code-page__grid">
        {/* Metadata Sidebar (Left) */}
        <aside className="contract-code-page__sidebar">
          {/* Contract Info Card */}
          <div className="contract-code-card">
            <div className="contract-code-card__header">
              <span className="font-label-caps">Contract Info</span>
              <span className="material-symbols-outlined text-outline text-sm">info</span>
            </div>

            <div className="contract-code-card__info-list font-data-code">
              <div className="contract-code-card__info-item">
                <span className="contract-code-card__info-label">Status</span>
                <span className="contract-code-card__status-val">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Verified
                </span>
              </div>
              <div className="contract-code-card__divider"></div>

              <div className="contract-code-card__info-item">
                <span className="contract-code-card__info-label">Compiler</span>
                <span className="text-on-surface">v0.8.0+commit.c7dfd78e</span>
              </div>
              <div className="contract-code-card__divider"></div>

              <div className="contract-code-card__info-item">
                <span className="contract-code-card__info-label">EVM Version</span>
                <span className="text-on-surface">Istanbul</span>
              </div>
              <div className="contract-code-card__divider"></div>

              <div className="contract-code-card__info-item">
                <span className="contract-code-card__info-label">Optimization</span>
                <span className="text-on-surface">Enabled (200 runs)</span>
              </div>
            </div>
          </div>

          {/* Technical Stats Card */}
          <div className="contract-code-card">
            <div className="font-label-caps text-on-surface mb-3">Metrics</div>
            <div className="contract-code-card__metric-row font-data-code">
              <span className="text-on-surface-variant">Size</span>
              <span className="text-on-surface">2.4 KB</span>
            </div>
            <div className="contract-code-card__metric-row font-data-code">
              <span className="text-on-surface-variant">Tx Count</span>
              <span className="text-on-surface">14,203</span>
            </div>
          </div>
        </aside>

        {/* Code Editor Window (Right) */}
        <section className="contract-code-page__editor-section">
          <div className="contract-code-editor">
            {/* Editor Header */}
            <div className="contract-code-editor__header">
              <div className="contract-code-editor__title-group">
                <span className="material-symbols-outlined text-outline text-sm">code</span>
                <span className="font-data-code text-on-surface">BlockEscrow.sol</span>
              </div>
              <div className="contract-code-editor__dots">
                <span className="contract-code-editor__dot"></span>
                <span className="contract-code-editor__dot"></span>
                <span className="contract-code-editor__dot"></span>
              </div>
            </div>

            {/* Editor Content Area */}
            <div className="contract-code-editor__body">
              <pre className="font-data-code contract-code-editor__pre">
                <code>{SOLIDITY_CODE}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SmartContractCodePage;
