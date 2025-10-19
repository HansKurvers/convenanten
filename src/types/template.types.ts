// ============================================
// FILE: src/types/template.types.ts
// Core template system types
// ============================================

import type { z } from 'zod';
import type React from 'react';

export type TemplateId = 'vfas' | 'adr' | 'mfn' | 'echtscheiding';

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  fullName: string;
  description: string;
  version: string;
  organization: string;
  logo?: string;
  color: string; // Hex color for branding
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'textarea' | 'number' | 'radio' | 'checkbox';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
  required?: boolean;
  conditional?: {
    field: string;
    value: any;
  };
  validation?: z.ZodType<any>;
  helpText?: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  fields: TemplateField[];
  order: number;
  conditional?: {
    field: string;
    value: any;
  };
}

export interface TemplateConfig {
  metadata: TemplateMetadata;
  sections: TemplateSection[];
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
}

export interface Template {
  config: TemplateConfig;
  renderForm: (props: TemplateFormProps) => React.ReactNode;
  renderPreview: (data: any) => React.ReactNode;
}

export interface TemplateFormProps {
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
}
