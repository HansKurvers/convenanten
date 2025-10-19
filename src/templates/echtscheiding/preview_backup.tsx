// ============================================
// FILE: src/templates/echtscheiding/preview.tsx
// Preview component voor echtscheidingsconvenant
// ============================================

import React from 'react';

interface EchtscheidingPreviewProps {
  data: Record<string, any>;
}

export const EchtscheidingPreview: React.FC<EchtscheidingPreviewProps> = ({ data }) => {

  // ============================================
  // HELPER FUNCTIES
  // ============================================

  const getValue = (value: any, fallback: string = '[...]'): string => {
    if (!value || value === '') return fallback;
    return String(value);
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '[datum]';
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper functie om partij gegevens op te halen (wordt gebruikt in artikelen sectie)
  const getPartij = (keuze: 'man' | 'vrouw', field: string): string => {
    if (keuze === 'man') {
      return data[`man${field.charAt(0).toUpperCase() + field.slice(1)}`] || '[...]';
    } else {
      return data[`vrouw${field.charAt(0).toUpperCase() + field.slice(1)}`] || '[...]';
    }
  };

  // Voorkomt "unused variable" warning - wordt gebruikt in deel 2 (artikelen)
  void getPartij;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '32px',
      backgroundColor: 'white',
      fontFamily: 'Georgia, serif',
      fontSize: '14px',
      lineHeight: '1.8',
      color: '#1f2937'
    }}>

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          CONVENANT ALGEHELE GEMEENSCHAP VAN GOEDEREN
        </h1>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginTop: '8px'
        }}>
          ECHTSCHEIDINGSCONVENANT
        </h2>
      </div>

      {/* ============================================ */}
      {/* PARTIJEN */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontWeight: '700', marginBottom: '16px' }}>
          DE ONDERGETEKENDEN:
        </p>

        <p style={{ marginBottom: '16px', marginLeft: '20px' }}>
          <span style={{ fontWeight: '700' }}>
            {getValue(data.manVoornamen)} {getValue(data.manAchternaam).toUpperCase()}
          </span>,
          geboren op {formatDate(data.manGeboortedatum)} te {getValue(data.manGeboorteplaats)},<br/>
          wonende op het adres {getValue(data.manAdres)}, {getValue(data.manPostcode)} te {getValue(data.manWoonplaats)},<br/>
          hierna te noemen: "de man";
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'center', fontStyle: 'italic' }}>
          en
        </p>

        <p style={{ marginBottom: '16px', marginLeft: '20px' }}>
          <span style={{ fontWeight: '700' }}>
            {getValue(data.vrouwVoornamen)} {getValue(data.vrouwAchternaam).toUpperCase()}
          </span>,
          geboren op {formatDate(data.vrouwGeboortedatum)} te {getValue(data.vrouwGeboorteplaats)},<br/>
          wonende op het adres {getValue(data.vrouwAdres)}, {getValue(data.vrouwPostcode)} te {getValue(data.vrouwWoonplaats)},<br/>
          hierna te noemen: "de vrouw";
        </p>

        <p style={{ marginBottom: '16px', marginLeft: '20px' }}>
          samen te noemen: "partijen";
        </p>
      </div>

      {/* ============================================ */}
      {/* CONSIDERANS - NEMEN IN AANMERKING */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontWeight: '700', marginBottom: '16px' }}>
          NEMEN IN AANMERKING:
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Partijen zijn op {formatDate(data.huwelijksdatum)} te {getValue(data.huwelijksplaats)} met elkaar gehuwd.
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          De man en de vrouw hebben beiden de {getValue(data.nationaliteit, 'Nederlandse')} nationaliteit.
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          De vraag of ontbinding van het huwelijk kan worden uitgesproken en op welke gronden,
          wordt volgens artikel 10:56 BW bepaald door het Nederlandse recht.
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Partijen hebben voorafgaand aan en tijdens hun huwelijk geen huwelijkse voorwaarden gemaakt.
          Omdat partijen met elkaar in het huwelijk zijn getreden v��r 1 januari 2018,
          bestaat tussen hen een algehele gemeenschap van goederen.
        </p>

        {/* ============================================ */}
        {/* KINDEREN SECTIE */}
        {/* ============================================ */}
        {data.heeftKinderen === 'ja' && (
          <>
            <p style={{ marginBottom: '8px', textAlign: 'justify' }}>
              Uit dit huwelijk {data.aantalKinderen === 1 ? 'is het volgende kind' : 'zijn de volgende kinderen'} geboren:
            </p>

            {data.kinderenDetails && (
              <div style={{ marginLeft: '40px', marginBottom: '16px', whiteSpace: 'pre-line' }}>
                {getValue(data.kinderenDetails)}
              </div>
            )}

            {data.ouderlijkGezag && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                {data.ouderlijkGezag === 'gezamenlijk' &&
                  'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit en hebben een co-ouderregeling afgesproken.'
                }
                {data.ouderlijkGezag === 'gezamenlijk-hoofdverblijf-man' &&
                  'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit. Het hoofdverblijf van het kind/de kinderen is bij de vader.'
                }
                {data.ouderlijkGezag === 'gezamenlijk-hoofdverblijf-vrouw' &&
                  'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit. Het hoofdverblijf van het kind/de kinderen is bij de moeder.'
                }
                {data.ouderlijkGezag === 'eenhoofdig-man' &&
                  'Het eenhoofdig ouderlijk gezag over de minderjarige kind(eren) wordt uitgeoefend door de vader.'
                }
                {data.ouderlijkGezag === 'eenhoofdig-vrouw' &&
                  'Het eenhoofdig ouderlijk gezag over de minderjarige kind(eren) wordt uitgeoefend door de moeder.'
                }
              </p>
            )}

            {data.zorgregelingDetails && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De omgangsregeling is als volgt: {getValue(data.zorgregelingDetails)}
              </p>
            )}

            {data.kinderalimentatie && data.kinderalimentatie !== 'geen' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                {data.kinderalimentatie === 'man-betaalt' && (
                  <>
                    De vader betaalt aan de moeder een bijdrage in de kosten van verzorging en opvoeding
                    van {getValue(data.kinderalimentatieBedrag, '� [bedrag]')} bruto per kind per maand.
                  </>
                )}
                {data.kinderalimentatie === 'vrouw-betaalt' && (
                  <>
                    De moeder betaalt aan de vader een bijdrage in de kosten van verzorging en opvoeding
                    van {getValue(data.kinderalimentatieBedragVrouw, '� [bedrag]')} bruto per kind per maand.
                  </>
                )}
              </p>
            )}
          </>
        )}

        {data.heeftKinderen === 'nee' && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            Uit dit huwelijk zijn geen kinderen geboren.
          </p>
        )}

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Het huwelijk van partijen is duurzaam ontwricht. Partijen wensen daarom dat hun huwelijk
          door echtscheiding wordt ontbonden. Partijen hebben zich daartoe gewend tot{' '}
          {data.mediatorNaam ? `mr. ${getValue(data.mediatorNaam)}` : 'een advocaat-mediator'},
          met het verzoek hen beiden te informeren en te begeleiden bij de totstandkoming van
          een regeling voor de gevolgen van hun scheiding en voor hen aan de{' '}
          {getValue(data.rechtbank, 'rechtbank')} te verzoeken tussen hen de echtscheiding uit te spreken.
        </p>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Voor het geval de echtscheiding tussen partijen wordt uitgesproken en de beschikking
          wordt ingeschreven in de registers van de burgerlijke stand, hebben partijen de gevolgen
          van deze echtscheiding op de hieronder omschreven wijze met elkaar geregeld.
        </p>
      </div>

      {/* ============================================ */}
      {/* VERKLARING */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontWeight: '700', marginBottom: '16px' }}>
          PARTIJEN VERKLAREN HET VOLGENDE MET ELKAAR TE ZIJN OVEREENGEKOMEN:
        </p>
      </div>

      {/* ============================================ */}
      {/* PLACEHOLDER VOOR ARTIKELEN */}
      {/* ============================================ */}
      <div style={{
        padding: '24px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        marginTop: '32px'
      }}>
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          fontStyle: 'italic',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <strong>Preview DEEL 1 compleet</strong><br/>
          <br/>
           Header<br/>
           Partijen identificatie<br/>
           Considerans (in aanmerking nemend)<br/>
           Kinderen sectie (conditioneel)<br/>
          <br/>
          De artikelen (partneralimentatie, woning, vermogen, pensioen, etc.)
          worden in volgende stappen toegevoegd.
        </p>
      </div>

    </div>
  );
};
