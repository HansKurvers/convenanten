// ============================================
// FILE: src/components/ui/button.tsx
// Reusable Button component
// ============================================

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: '1px solid #3b82f6',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '1px solid #3b82f6',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      border: '1px solid transparent',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px',
    },
    md: {
      padding: '8px 16px',
      fontSize: '14px',
    },
    lg: {
      padding: '10px 20px',
      fontSize: '16px',
    },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#2563eb',
    },
    outline: {
      backgroundColor: '#eff6ff',
    },
    ghost: {
      backgroundColor: '#f3f4f6',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(isHovered ? hoverStyles[variant] : {}),
  };

  return (
    <button
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};
