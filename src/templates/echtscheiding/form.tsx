// ============================================
// FILE: src/templates/echtscheiding/form.tsx
// Form component voor echtscheidingsconvenant
// ============================================

import React, { useState } from 'react';
import { FormField } from '../../components/FormField';
import { echtscheidingConfig } from './config';
import type { TemplateFormProps } from '../../types';

export const EchtscheidingForm: React.FC<TemplateFormProps> = ({
  data,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const sections = echtscheidingConfig.sections;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ============================================ */}
      {/* TAB NAVIGATION */}
      {/* ============================================ */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto',
          backgroundColor: '#f9fafb'
        }}
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(index)}
            type="button"
            style={{
              padding: '12px 16px',
              fontWeight: activeTab === index ? '600' : '500',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderBottom: activeTab === index ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === index ? '#3b82f6' : '#6b7280',
              backgroundColor: activeTab === index ? 'white' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== index) {
                e.currentTarget.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== index) {
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            {index + 1}. {section.title}
          </button>
        ))}
      </div>

      {/* ============================================ */}
      {/* TAB CONTENT */}
      {/* ============================================ */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          backgroundColor: 'white'
        }}
      >
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            style={{ display: activeTab === sectionIndex ? 'block' : 'none' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#111827'
              }}>
                {section.title}
              </h2>
              <div style={{
                height: '3px',
                width: '60px',
                backgroundColor: '#3b82f6',
                borderRadius: '2px'
              }} />
            </div>

            {/* Section Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {section.fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={data[field.id]}
                  onChange={(value) => onChange(field.id, value)}
                  data={data}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ============================================ */}
      {/* NAVIGATION BUTTONS */}
      {/* ============================================ */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e5e7eb',
          padding: '16px 24px',
          backgroundColor: '#f9fafb'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
          disabled={activeTab === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 0 ? '#e5e7eb' : '#f3f4f6',
            color: activeTab === 0 ? '#9ca3af' : '#374151',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '500',
            cursor: activeTab === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 0) {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 0) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
        >
          � Vorige
        </button>

        <span style={{
          fontSize: '14px',
          color: '#6b7280',
          fontWeight: '500'
        }}>
          Stap {activeTab + 1} van {sections.length}
        </span>

        <button
          type="button"
          onClick={() => setActiveTab(Math.min(sections.length - 1, activeTab + 1))}
          disabled={activeTab === sections.length - 1}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === sections.length - 1 ? '#93c5fd' : '#3b82f6',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '500',
            cursor: activeTab === sections.length - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== sections.length - 1) {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== sections.length - 1) {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }
          }}
        >
          Volgende �
        </button>
      </div>
    </div>
  );
};
