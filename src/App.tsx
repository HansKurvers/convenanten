import React, { useState } from 'react';
import { FileText, Download, Eye, EyeOff } from 'lucide-react';
import { EchtscheidingForm } from './templates/echtscheiding/form';
import { EchtscheidingPreview } from './templates/echtscheiding/preview';
import { generateEchtscheidingDocument } from './templates/echtscheiding/export';
import { echtscheidingSchema } from './templates/echtscheiding/schema';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

function App() {
  const [formData, setFormData] = useState<Record<string, any>>({
    // Default values - moeten overeenkomen met schema
    nationaliteit: 'Nederlandse',
    huwelijkseVoorwaarden: 'nee',
    heeftKinderen: 'nee',
    alimentatieRegeling: 'geen',
    woningStatus: 'geen',
    heeftPrivevermogen: 'nee',
    heeftBankrekeningen: 'nee',
    heeftAutos: 'nee',
    inboedelRegeling: 'verdeeld',
    heeftSchulden: 'nee',
    pensioenRegeling: 'standaard',
    rechtbank: 'Rechtbank',
    zaakNummerBekend: 'nee',
    kinderenLijst: [],
    bankrekeningen: [],
    autos: []
  });

  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Update form field
  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  // Validate form
  const validateForm = (): boolean => {
    try {
      echtscheidingSchema.parse(formData);
      setValidationErrors([]);
      return true;
    } catch (error: any) {
      const errors = error.errors?.map((e: any) => e.message) || ['Validatie fout'];
      setValidationErrors(errors);
      return false;
    }
  };

  // Export to Word
  const handleExport = async () => {
    // Validate first
    const isValid = validateForm();

    if (!isValid) {
      const proceed = confirm(
        'Niet alle verplichte velden zijn ingevuld. Wil je toch het document downloaden?\n\n' +
        'Het document zal placeholders bevatten voor lege velden.'
      );

      if (!proceed) {
        return;
      }
    }

    setIsExporting(true);

    try {
      // Generate document
      const doc = generateEchtscheidingDocument(formData);

      // Pack to blob
      const blob = await Packer.toBlob(doc);

      // Generate filename
      const man = formData.manAchternaam || 'Partij1';
      const vrouw = formData.vrouwAchternaam || 'Partij2';
      const datum = new Date().toISOString().split('T')[0];
      const filename = `Echtscheidingsconvenant_${man}_${vrouw}_${datum}.docx`;

      // Download
      saveAs(blob, filename);

      // Clear validation errors after successful export
      setValidationErrors([]);
    } catch (error) {
      console.error('Export error:', error);
      alert('Er is een fout opgetreden bij het exporteren. Controleer de browser console voor details.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Echtscheidingsconvenant Generator
                </h1>
                <p className="text-sm text-gray-500">
                  Convenant algehele gemeenschap van goederen
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Toggle Preview Button */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-5 h-5" />
                    Verberg preview
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    Toon preview
                  </>
                )}
              </button>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-5 h-5" />
                {isExporting ? 'Bezig...' : 'Download Word'}
              </button>
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-medium text-red-800 mb-2">
                Controleer de volgende velden:
              </p>
              <ul className="list-disc list-inside text-sm text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Gegevens invullen
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Vul alle velden in om het convenant te genereren
              </p>
            </div>

            <div className="h-[calc(100vh-280px)] overflow-hidden">
              <EchtscheidingForm
                data={formData}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Live Preview
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Zo ziet het convenant eruit
                </p>
              </div>

              <div className="h-[calc(100vh-280px)] overflow-y-auto">
                <EchtscheidingPreview data={formData} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm text-gray-500 text-center">
            Convenanten Generator © 2025 - Juridische Document Generators
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
