// ============================================
// FILE: src/types/index.ts
// Central export for all type definitions
// ============================================

export * from './template.types';

// Additional form data types
export interface FormData {
  [key: string]: any;
}

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
