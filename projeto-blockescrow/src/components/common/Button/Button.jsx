import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} props.children
 * @param {Function} [props.onClick]
 * @param {string} [props.className='']
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  className = '',
  ...restProps
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
