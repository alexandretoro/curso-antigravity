import React, { useEffect, useRef } from 'react';
import './TerminalConsole.css';

export function TerminalConsole({
  logs = [],
  onHackerClick,
  onResetSimulation,
}) {
  const terminalEndRef = useRef(null);

  // Auto scroll to bottom when new logs arrive
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getTagClass = (tag) => {
    switch (tag) {
      case 'SYS':
      case 'MINED':
        return 'terminal-console__tag--secondary';
      case 'TX':
      case 'DISPUTE':
        return 'terminal-console__tag--tertiary';
      case 'ACTION':
        return 'terminal-console__tag--primary';
      case 'ERROR':
        return 'terminal-console__tag--error';
      case 'SUCCESS':
      case 'RESOLUTION':
        return 'terminal-console__tag--success';
      default:
        return 'terminal-console__tag--default';
    }
  };

  return (
    <div className="terminal-console">
      {/* Terminal Header */}
      <div className="terminal-console__header">
        <div className="terminal-console__title-group">
          <span className="material-symbols-outlined terminal-console__icon">
            terminal
          </span>
          <h3 className="font-label-caps terminal-console__title">
            Node Simulator Console
          </h3>
        </div>
        <div className="terminal-console__dots">
          <span className="terminal-console__dot terminal-console__dot--red"></span>
          <span className="terminal-console__dot terminal-console__dot--yellow"></span>
          <span className="terminal-console__dot terminal-console__dot--green"></span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="terminal-console__body font-data-code">
        {logs.map((log, index) => (
          <div key={index} className="terminal-console__line">
            <span className="terminal-console__time">[{log.time}]</span>{' '}
            <span className={`terminal-console__tag ${getTagClass(log.tag)}`}>
              {log.tag}
            </span>{' '}
            <span className="terminal-console__message">{log.message}</span>
          </div>
        ))}

        {/* Active Prompt Cursor */}
        <div className="terminal-console__cursor-line">
          <span className="terminal-console__prompt">&gt;</span>
          <span className="terminal-console__cursor">_</span>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Action Footer */}
      <div className="terminal-console__footer">
        <button
          className="terminal-console__reset-btn"
          onClick={onResetSimulation}
          title="Reiniciar Simulação"
        >
          <span className="material-symbols-outlined">restart_alt</span>
          <span className="font-label-caps">Reiniciar</span>
        </button>

        <button
          className="terminal-console__hacker-btn"
          onClick={onHackerClick}
          title="Tentar alterar o estado do contrato"
        >
          <span className="material-symbols-outlined">bug_report</span>
          <span className="font-label-caps">Botão Hacker</span>
        </button>
      </div>
    </div>
  );
}

export default TerminalConsole;
