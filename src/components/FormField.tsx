// ============================================
// FILE: src/components/FormField.tsx
// Dynamic form field component
// ============================================

import React from 'react';
import type { TemplateField } from '../types/template.types';
import { Button } from './ui/button';

interface FormFieldProps {
  field: TemplateField;
  value: any;
  onChange: (value: any) => void;
  data: Record<string, any>; // For conditional logic
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, data }) => {
  // Check if field should be displayed based on conditional logic
  if (field.conditional) {
    const watchedValue = data[field.conditional.field];

    // Special handling for array values (checkbox groups)
    if (Array.isArray(watchedValue)) {
      if (!watchedValue.includes(field.conditional.value)) {
        return null;
      }
    } else {
      if (watchedValue !== field.conditional.value) {
        return null;
      }
    }
  }

  const error = null; // TODO: Add validation if needed

  const baseInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: error ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
        {field.label}
        {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>

      {field.helpText && (
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', fontStyle: 'italic' }}>
          {field.helpText}
        </p>
      )}

{(() => {
        const currentValue = value !== undefined ? value : (field.defaultValue || '');

        switch (field.type) {
          case 'text':
            return (
              <input
                type="text"
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                style={baseInputStyle}
              />
            );

          case 'date':
            return (
              <input
                type="date"
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                style={baseInputStyle}
              />
            );

          case 'number':
            return (
              <input
                type="number"
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                style={baseInputStyle}
              />
            );

          case 'textarea':
            return (
              <textarea
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                style={{ ...baseInputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            );

          case 'select':
            return (
              <select
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                style={{ ...baseInputStyle, cursor: 'pointer' }}
              >
                <option value="">-- Selecteer --</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );

          case 'checkbox':
            // Multi-checkbox group when options are provided
            if (field.options && field.options.length > 0) {
              const currentValues = Array.isArray(currentValue) ? currentValue : [];

              // Get all selectable options (exclude "anders" from the all-select logic)
              const selectableOptions = field.options.filter(opt => opt.value !== 'anders');
              const selectableValues = selectableOptions.map(opt => opt.value);

              // Check if all selectable items are selected
              const allSelected = selectableValues.every(val => currentValues.includes(val));

              const handleToggleAll = () => {
                if (allSelected) {
                  // Deselect all
                  onChange([]);
                } else {
                  // Select all selectable items (excluding "anders")
                  onChange(selectableValues);
                }
              };

              return (
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleToggleAll}
                    >
                      {allSelected ? 'Alles deselecteren' : 'Alles selecteren'}
                    </Button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {field.options.map((option) => {
                      const isChecked = currentValues.includes(option.value);
                      return (
                        <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChange([...currentValues, option.value]);
                              } else {
                                onChange(currentValues.filter((v: string) => v !== option.value));
                              }
                            }}
                            style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '14px' }}>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Single checkbox when no options
            return (
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={currentValue || false}
                  onChange={(e) => onChange(e.target.checked)}
                  style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px' }}>{field.label}</span>
              </label>
            );

          case 'radio':
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {field.options?.map((option) => (
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value={option.value}
                      checked={currentValue === option.value}
                      onChange={() => onChange(option.value)}
                      style={{ width: '16px', height: '16px', marginRight: '8px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>{option.label}</span>
                  </label>
                ))}
              </div>
            );

          default:
            return <div>Unsupported field type: {field.type}</div>;
        }
      })()}

      {/* TODO: Add error display when validation is implemented */}
    </div>
  );
};
