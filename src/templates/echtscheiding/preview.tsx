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
          Omdat partijen met elkaar in het huwelijk zijn getreden vóór 1 januari 2018,
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
                    van € {getValue(data.kinderalimentatieBedrag, '[bedrag]')} bruto per kind per maand.
                  </>
                )}
                {data.kinderalimentatie === 'vrouw-betaalt' && (
                  <>
                    De moeder betaalt aan de vader een bijdrage in de kosten van verzorging en opvoeding
                    van € {getValue(data.kinderalimentatieBedragVrouw, '[bedrag]')} bruto per kind per maand.
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
      {/* ARTIKEL 1. KINDEREN */}
      {/* ============================================ */}
      {data.heeftKinderen === 'ja' && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            ARTIKEL 1. KINDEREN
          </h2>

          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>1.1</strong><br />
            Partijen hebben als ouders van hun {data.aantalKinderen === 1 ? 'kind' : 'kinderen'} afspraken
            vastgelegd in een ouderschapsplan, dat als <strong>bijlage 1</strong> aan dit convenant wordt gehecht
            en daarvan onlosmakelijk deel uitmaakt.
          </p>

          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            Met betrekking tot de kosten van de kinderen is daarin het volgende overeengekomen:
          </p>

          {(data.kinderalimentatie === 'man-betaalt' || data.kinderalimentatie === 'vrouw-betaalt') && (
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              De {data.kinderalimentatie === 'man-betaalt' ? 'man' : 'vrouw'} zal aan de{' '}
              {data.kinderalimentatie === 'man-betaalt' ? 'vrouw' : 'man'} ten behoeve van de verzorging
              en opvoeding van {data.aantalKinderen === 1 ? 'het kind' : 'de kinderen'} een bijdrage
              betalen van € {getValue(
                data.kinderalimentatie === 'man-betaalt'
                  ? data.kinderalimentatieBedrag
                  : data.kinderalimentatieBedragVrouw
              )} bruto per maand per kind.
            </p>
          )}

          {data.kinderenSpaargeld && (
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Het saldo op de rekening(en) ten name van {data.aantalKinderen === 1 ? 'het kind' : 'de kinderen'}
              valt niet in de gemeenschap en blijft buiten de verdeling. Dit is vermogen van
              {data.aantalKinderen === 1 ? ' het kind' : ' de kinderen'} en staat onder het bewind van de ouders.
            </p>
          )}
        </div>
      )}

      {/* ============================================ */}
      {/* ARTIKEL 2. PARTNERALIMENTATIE */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL 2. PARTNERALIMENTATIE
        </h2>

        {/* 2.1 Voorlopige partneralimentatie */}
        {data.alimentatieRegeling === 'voorlopig-en-definitief' && data.voorlopigeAlimentatieBedrag && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>2.1 Voorlopige partneralimentatie</strong><br />
              Partijen stellen vast dat zij met ingang van {formatDate(data.voorlopigeAlimentatieVanaf)} duurzaam
              gescheiden leven. Vanaf die datum tot aan de dag waarop de hieronder in artikel 2.4 genoemde regeling
              in werking treedt, draagt de {data.alimentatieplichtige === 'man' ? 'man' : 'vrouw'} in het
              levensonderhoud van de {data.alimentatieplichtige === 'man' ? 'vrouw' : 'man'} bij met een bedrag
              van € {getValue(data.voorlopigeAlimentatieBedrag)} bruto per maand. Dit bedrag zal maandelijks bij
              vooruitbetaling aan {data.alimentatieplichtige === 'man' ? 'haar' : 'hem'} worden voldaan en wel
              vóór de eerste van iedere nieuwe maand.
            </p>
          </>
        )}

        {/* 2.4 Hoogte partneralimentatie - Voorlopig en definitief */}
        {data.alimentatieRegeling === 'voorlopig-en-definitief' && data.definitieveAlimentatieBedrag && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>2.4 Hoogte partneralimentatie</strong><br />
              Op basis van de aldus vastgestelde behoefte en draagkracht, alsmede op basis van een vergelijking
              van de draagkracht van partijen, komen partijen overeen dat de{' '}
              {data.alimentatieplichtige === 'man' ? 'man' : 'vrouw'} aan de{' '}
              {data.alimentatieplichtige === 'man' ? 'vrouw' : 'man'} met ingang van de datum van inschrijving
              van de echtscheidingsbeschikking zal bijdragen in het levensonderhoud van de{' '}
              {data.alimentatieplichtige === 'man' ? 'vrouw' : 'man'} met een bedrag van{' '}
              € {getValue(data.definitieveAlimentatieBedrag)} bruto per maand, welk bedrag bij vooruitbetaling
              maandelijks aan {data.alimentatieplichtige === 'man' ? 'haar' : 'hem'} zal worden voldaan.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              De ontvangen partneralimentatie is voor de alimentatiegerechtigde belastbaar inkomen en wordt
              als zodanig belast. De alimentatiegerechtigde kan daarnaast over de ontvangen partneralimentatie
              een aanslag inkomensafhankelijke bijdrage zorgverzekeringswet opgelegd krijgen. Ook kan de
              ontvangen partneralimentatie gevolgen hebben voor de gerechtigdheid tot toeslagen. Voor de
              alimentatieplichtige is de betaalde partneralimentatie aftrekbaar (mogelijk tegen beperkt tarief).
            </p>
          </>
        )}

        {/* 2.4 Hoogte partneralimentatie - Alleen definitief */}
        {data.alimentatieRegeling === 'alleen-definitief' && data.definitieveAlimentatieBedragAlleen && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>2.4 Hoogte partneralimentatie</strong><br />
              Op basis van de aldus vastgestelde behoefte en draagkracht, alsmede op basis van een vergelijking
              van de draagkracht van partijen, komen partijen overeen dat de{' '}
              {data.alimentatieplichtigeAlleen === 'man' ? 'man' : 'vrouw'} aan de{' '}
              {data.alimentatieplichtigeAlleen === 'man' ? 'vrouw' : 'man'} met ingang van de datum van inschrijving
              van de echtscheidingsbeschikking zal bijdragen in het levensonderhoud van de{' '}
              {data.alimentatieplichtigeAlleen === 'man' ? 'vrouw' : 'man'} met een bedrag van{' '}
              € {getValue(data.definitieveAlimentatieBedragAlleen)} bruto per maand, welk bedrag bij vooruitbetaling
              maandelijks aan {data.alimentatieplichtigeAlleen === 'man' ? 'haar' : 'hem'} zal worden voldaan.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              De ontvangen partneralimentatie is voor de alimentatiegerechtigde belastbaar inkomen en wordt
              als zodanig belast. De alimentatiegerechtigde kan daarnaast over de ontvangen partneralimentatie
              een aanslag inkomensafhankelijke bijdrage zorgverzekeringswet opgelegd krijgen. Ook kan de
              ontvangen partneralimentatie gevolgen hebben voor de gerechtigdheid tot toeslagen. Voor de
              alimentatieplichtige is de betaalde partneralimentatie aftrekbaar (mogelijk tegen beperkt tarief).
            </p>
          </>
        )}

        {/* Geen partneralimentatie */}
        {data.alimentatieRegeling === 'geen' && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>2.4 Geen partneralimentatie</strong><br />
            Partijen komen overeen dat geen partij aan de andere partij een bijdrage in het levensonderhoud verschuldigd zal zijn.
          </p>
        )}

        {/* Afkoop */}
        {data.alimentatieRegeling === 'afkoop' && data.afkoopBedrag && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>2.7 Afkoop met afstemming aangiften</strong><br />
              De {data.afkoopBetaler === 'man' ? 'man' : 'vrouw'} koopt de alimentatie die{' '}
              {data.afkoopBetaler === 'man' ? 'hij' : 'zij'} met ingang van de datum van ontbinding
              van het huwelijk van partijen aan de {data.afkoopBetaler === 'man' ? 'vrouw' : 'man'}{' '}
              verschuldigd zal zijn af door storting van een afkoopsom ten bedrage van € {getValue(data.afkoopBedrag)}{' '}
              op een door de {data.afkoopBetaler === 'man' ? 'vrouw' : 'man'} aan te wijzen bankrekening.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              De storting van het gehele bedrag vindt plaats binnen veertien dagen na, maar niet eerder dan
              de datum van inschrijving van de echtscheidingsbeschikking{data.afkoopBetalingsdatum &&
              `, uiterlijk op ${formatDate(data.afkoopBetalingsdatum)}`}.
            </p>
          </>
        )}

        {/* Afstand van recht */}
        {data.alimentatieRegeling === 'afstand' && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>2.9 Afstand van recht op partneralimentatie</strong><br />
            Partijen doen over en weer afstand van hun recht op partneralimentatie. Dit kan niet bij
            rechterlijke uitspraak worden gewijzigd op grond van een wijziging van omstandigheden,
            behoudens in het geval van een zo ingrijpende wijziging van omstandigheden, dat de partij
            die de wijziging verzoekt naar maatstaven van redelijkheid en billijkheid niet langer aan
            het niet-wijzigingsbeding mag worden gehouden, zoals in artikel 1:159 lid 3 BW is bepaald.
          </p>
        )}

        {/* Indexering */}
        {(data.alimentatieRegeling === 'voorlopig-en-definitief' ||
          data.alimentatieRegeling === 'alleen-definitief') && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>2.10 Indexering</strong><br />
            Het in artikel 2.4 vastgestelde bedrag zal worden verhoogd met de wettelijke indexering
            als bedoeld in artikel 1:402a BW, voor het eerst per 1 januari volgend op de ingangsdatum.
          </p>
        )}
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 3. DE ECHTELIJKE WONING */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL 3. DE ECHTELIJKE WONING
        </h2>

        {/* VARIANT 1: HUURWONING */}
        {data.woningStatus === 'huur' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.1 Huur</strong><br />
              Partijen zijn huurders van de woning op het adres {getValue(data.woningAdres)} te{' '}
              {getValue(data.woningWoonplaats)}. Na de datum van inschrijving van de echtscheidingsbeschikking
              zal dit huurrecht toekomen aan de {data.huurToedeling === 'man' ? 'man' : 'vrouw'}.
              Partijen zullen de rechter op grond van het bepaalde in artikel 7:266 lid 5 BW verzoeken
              te bepalen dat de {data.huurToedeling === 'man' ? 'man' : 'vrouw'} met ingang van
              voormelde datum huurder zal zijn van de woning.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Alle verplichtingen die voortvloeien uit de huurovereenkomst met betrekking tot voornoemde
              woning zijn tot {formatDate(data.ondertekeningDatum)} voldaan.
              De {data.huurToedeling === 'man' ? 'man' : 'vrouw'} neemt vanaf die datum al deze
              verplichtingen voor {data.huurToedeling === 'man' ? 'zijn' : 'haar'} rekening.
            </p>
          </>
        )}

        {/* VARIANT 2: EIGEN WONING - TOEDELING */}
        {data.woningStatus === 'eigen-toedeling' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.1 Echtelijke woning toegedeeld</strong><br />
              Tot de gemeenschap van goederen van partijen behoort de onroerende zaak staande en gelegen
              aan de {getValue(data.woningAdresEigen)} te {getValue(data.woningWoonplaatsEigen)}.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.2 Toedeling</strong><br />
              De in artikel 3.1 genoemde onroerende zaak wordt voor de daaraan toegekende waarde van
              € {getValue(data.woningWaarde)} toegedeeld aan de{' '}
              {data.woningToedeling === 'man' ? 'man' : 'vrouw'}.
            </p>

            {data.hypotheekBedrag && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                <strong>3.3 Hypothecaire geldlening</strong><br />
                Op de in artikel 3.1 genoemde onroerende zaak rust een schuld uit hoofde van hypothecaire
                geldlening. De restanthoofdsom van de hypothecaire geldlening bedraagt
                per {formatDate(data.ondertekeningDatum)} € {getValue(data.hypotheekBedrag)}.
              </p>
            )}

            {data.hypotheekBedrag && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                Vanaf de datum waarop de hierna te noemen akte van verdeling wordt verleden neemt
                de {data.woningToedeling === 'man' ? 'man' : 'vrouw'} op zich om bij uitsluiting
                van de {data.woningToedeling === 'man' ? 'vrouw' : 'man'} alle uit deze
                hypothecaire geldlening voortvloeiende verplichtingen als eigen schuld te voldoen.
              </p>
            )}

            {data.overnamesom && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                <strong>3.8 Overbedeling</strong><br />
                Ten gevolge van de toedeling van de onverdeelde helft van de hiervoor in artikel 3.1
                genoemde onroerende zaak aan de {data.woningToedeling === 'man' ? 'man' : 'vrouw'},
                wordt de {data.woningToedeling === 'man' ? 'man' : 'vrouw'} overbedeeld voor een
                bedrag van € {getValue(data.overnamesom)}. Ter verwerving van die onverdeelde helft
                van de woning, dient de {data.woningToedeling === 'man' ? 'man' : 'vrouw'} derhalve
                aan de {data.woningToedeling === 'man' ? 'vrouw' : 'man'} uit te betalen de somma
                van € {getValue(data.overnamesom)}.
              </p>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.7 Levering</strong><br />
              Partijen geven hierbij opdracht aan een notaris om, zo mogelijk binnen
              één maand na inschrijving van de echtscheidingsbeschikking, een notariële akte te verlijden
              waarbij de in artikel 3.1 genoemde onroerende zaak goederenrechtelijk aan
              de {data.woningToedeling === 'man' ? 'man' : 'vrouw'} geleverd wordt.
            </p>
          </>
        )}

        {/* VARIANT 3: EIGEN WONING - VERKOOP */}
        {data.woningStatus === 'eigen-verkoop' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.1 Eigen woning wordt verkocht aan derden</strong><br />
              Tot de huwelijkse gemeenschap van partijen behoort de onroerende zaak staande en gelegen
              aan de {getValue(data.woningAdresVerkoop)} te {getValue(data.woningWoonplaatsVerkoop)}.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.2 Verkoop</strong><br />
              Partijen hebben een makelaar opdracht gegeven de verkoop
              van de in artikel 3.1 genoemde onroerende zaak ter hand te nemen.
            </p>

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Partijen zullen hun medewerking verlenen aan alle voor de verkoop noodzakelijke handelingen,
              zoals bijvoorbeeld (maar niet uitsluitend) het opruimen en schoonmaken van de woning voor
              het maken van de foto's, bezichtigingen en dergelijke.
            </p>

            {data.hypotheekBedragVerkoop && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                <strong>3.3 Hypothecaire geldlening</strong><br />
                Op de in artikel 3.1 genoemde onroerende zaak rust een schuld uit hoofde van hypothecaire
                geldlening. De restanthoofdsom van de hypothecaire geldlening bedraagt
                per {formatDate(data.ondertekeningDatum)} € {getValue(data.hypotheekBedragVerkoop)}.
              </p>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>3.5 Verdeling verkoopopbrengst</strong><br />
              Enig positief restant (verkoopopbrengst -/- kosten -/- hypothecaire geldlening) zal aan
              partijen bij helfte toekomen. Partijen zullen opdracht geven aan de notaris om onverwijld
              nadat de levering heeft plaatsgevonden ieders aandeel uit te keren. Indien na levering een
              schuld aan de hypotheeknemer resteert, dienen partijen deze schuld bij helfte te dragen.
            </p>
          </>
        )}

        {/* GEEN ECHTELIJKE WONING */}
        {data.woningStatus === 'geen' && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>3.1 Geen echtelijke woning</strong><br />
            Partijen hebben geen gemeenschappelijke woning.
          </p>
        )}
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 4. VERDELING VAN DE GEMEENSCHAP */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL 4. VERDELING VAN DE GEMEENSCHAP
        </h2>

        {/* 4.1 Privévermogen */}
        {data.heeftPrivevermogen === 'ja' && data.privevermogenDetails && (
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            <strong>4.1 Privévermogen</strong><br />
            Partijen verklaren dat het volgende vermogen tot het privévermogen behoort en buiten de
            gemeenschap valt: {getValue(data.privevermogenDetails)}. Dit vermogen zal buiten de verdeling
            blijven en toebedeeld worden aan de partij wiens privévermogen het betreft.
          </p>
        )}

        {/* 4.2 Bankrekeningen en spaargeld */}
        {data.heeftBankrekeningen === 'ja' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>4.2 Bankrekeningen en spaargeld</strong><br />
              Partijen hebben de volgende bankrekeningen:
            </p>

            {data.bankrekeningenDetails && (
              <div style={{ marginLeft: '40px', marginBottom: '16px', whiteSpace: 'pre-line' }}>
                {getValue(data.bankrekeningenDetails)}
              </div>
            )}

            {data.spaargeldVerdeling === 'fifty-fifty' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                Partijen komen overeen dat het totale saldo van de bankrekeningen
                {data.totaalSpaargeld && ` (totaal € ${getValue(data.totaalSpaargeld)})`} onderling
                bij helfte verdeeld zal worden. Ieder van partijen heeft daarmee recht op de helft
                van het totale saldo.
              </p>
            )}

            {data.spaargeldVerdeling === 'specifiek' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De bankrekeningen worden toegedeeld conform de hierboven genoemde toedeling per rekening.
              </p>
            )}

            {data.spaargeldVerdeling === 'anders' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                Partijen hebben een afwijkende verdeling van het spaargeld afgesproken, zoals hierboven
                toegelicht.
              </p>
            )}
          </>
        )}

        {/* 4.3 Auto's / voertuigen */}
        {data.heeftAutos === 'ja' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>4.3 Auto's / voertuigen</strong><br />
              Tot de gemeenschap behoren de volgende voertuigen:
            </p>

            {data.autosDetails && (
              <div style={{ marginLeft: '40px', marginBottom: '16px', whiteSpace: 'pre-line' }}>
                {getValue(data.autosDetails)}
              </div>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              De voertuigen worden toegedeeld conform de hierboven genoemde toedeling.
            </p>
          </>
        )}

        {/* 4.4 Inboedel */}
        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          <strong>4.4 Inboedel</strong><br />
          {data.inboedelRegeling === 'verdeeld' && (
            <>
              Partijen verklaren dat de inboedel reeds onderling is verdeeld naar ieders tevredenheid.
              Ieder van partijen is reeds in het bezit van zijn of haar deel van de inboedel.
              {data.inboedelDetails && (
                <> {getValue(data.inboedelDetails)}</>
              )}
            </>
          )}

          {data.inboedelRegeling === 'fifty-fifty' && (
            <>
              De inboedel heeft een taxatiewaarde van € {getValue(data.inboedelWaarde)}.
              Partijen komen overeen dat de inboedel bij helfte verdeeld zal worden, op basis van
              deze taxatiewaarde. Partijen zullen de inboedel onderling verdelen op een wijze
              die beiden passend achten.
              {data.inboedelDetails && (
                <> {getValue(data.inboedelDetails)}</>
              )}
            </>
          )}

          {data.inboedelRegeling === 'toedeling-man' && (
            <>
              De volledige inboedel wordt toegedeeld aan de man. De man neemt de inboedel over
              en de vrouw doet afstand van haar aanspraken op de inboedel.
              {data.inboedelDetails && (
                <> {getValue(data.inboedelDetails)}</>
              )}
            </>
          )}

          {data.inboedelRegeling === 'toedeling-vrouw' && (
            <>
              De volledige inboedel wordt toegedeeld aan de vrouw. De vrouw neemt de inboedel over
              en de man doet afstand van zijn aanspraken op de inboedel.
              {data.inboedelDetails && (
                <> {getValue(data.inboedelDetails)}</>
              )}
            </>
          )}
        </p>

        {/* 4.5 Schulden */}
        {data.heeftSchulden === 'ja' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>4.5 Schulden</strong><br />
              Partijen verklaren dat de volgende schulden (anders dan de eventuele hypothecaire geldlening)
              tot de gemeenschap behoren:
            </p>

            {data.schuldenDetails && (
              <div style={{ marginLeft: '40px', marginBottom: '16px', whiteSpace: 'pre-line' }}>
                {getValue(data.schuldenDetails)}
              </div>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Deze schulden worden verdeeld en/of voor rekening genomen conform de hierboven genoemde verdeling.
            </p>
          </>
        )}

        {/* 4.6 Slotbepaling gemeenschap */}
        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          <strong>4.{data.heeftSchulden === 'ja' ? '6' : '5'} Slotbepaling gemeenschap</strong><br />
          Partijen verklaren dat hetgeen hiervoor is vermeld de volledige inhoud van de
          huwelijksgemeenschap vormt. Voor zover er nog activa of passiva bestaan die niet
          hierboven zijn genoemd, zullen deze alsnog bij helfte worden verdeeld, tenzij partijen
          anders overeenkomen.
        </p>
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 5. PENSIOEN */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL 5. PENSIOEN
        </h2>

        {/* VARIANT 1: Standaard verevening */}
        {data.pensioenRegeling === 'standaard' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>5.1 Verevening pensioenaanspraken</strong><br />
              Partijen komen overeen dat de tijdens het huwelijk opgebouwde pensioenaanspraken bij helfte
              zullen worden verdeeld conform de Wet verevening pensioenaanspraken bij scheiding (WVPS).
            </p>

            {data.pensioenManHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De man heeft pensioen opgebouwd bij {getValue(data.pensioenManUitvoerder)}
                {data.pensioenManPolisnummer && `, polisnummer ${getValue(data.pensioenManPolisnummer)}`}.
                Partijen zullen bij deze pensioenuitvoerder een verzoek indienen tot verevening van de
                tijdens het huwelijk opgebouwde aanspraken.
              </p>
            )}

            {data.pensioenVrouwHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De vrouw heeft pensioen opgebouwd bij {getValue(data.pensioenVrouwUitvoerder)}
                {data.pensioenVrouwPolisnummer && `, polisnummer ${getValue(data.pensioenVrouwPolisnummer)}`}.
                Partijen zullen bij deze pensioenuitvoerder een verzoek indienen tot verevening van de
                tijdens het huwelijk opgebouwde aanspraken.
              </p>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Partijen zullen ieder een verklaring ondertekenen, waarin zij verklaren een afschrift van
              dit convenant te zullen toezenden aan de betrokken pensioenuitvoerder(s).
            </p>
          </>
        )}

        {/* VARIANT 2: Afwijkend vereveningspercentage */}
        {data.pensioenRegeling === 'afwijkend' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>5.2 Afwijkende verevening pensioenaanspraken</strong><br />
              In afwijking van de standaard 50/50 verevening komen partijen overeen dat de pensioenaanspraken
              worden verdeeld met een vereveningspercentage van {getValue(data.pensioenAfwijkendPercentage, '50')}%.
            </p>

            {data.pensioenManHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De man heeft pensioen opgebouwd bij {getValue(data.pensioenManUitvoerder)}
                {data.pensioenManPolisnummer && `, polisnummer ${getValue(data.pensioenManPolisnummer)}`}.
              </p>
            )}

            {data.pensioenVrouwHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De vrouw heeft pensioen opgebouwd bij {getValue(data.pensioenVrouwUitvoerder)}
                {data.pensioenVrouwPolisnummer && `, polisnummer ${getValue(data.pensioenVrouwPolisnummer)}`}.
              </p>
            )}

            {data.pensioenDetails && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                {getValue(data.pensioenDetails)}
              </p>
            )}
          </>
        )}

        {/* VARIANT 3: Conversie */}
        {data.pensioenRegeling === 'conversie' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>5.3 Conversie pensioen in partneralimentatie</strong><br />
              Partijen komen overeen dat de pensioenaanspraken niet worden verdeeld, maar worden omgezet
              (geconverteerd) in een verhoogde partneralimentatie zoals opgenomen in artikel 2 van dit convenant.
            </p>

            {data.pensioenManHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De man heeft pensioen opgebouwd bij {getValue(data.pensioenManUitvoerder)}
                {data.pensioenManPolisnummer && `, polisnummer ${getValue(data.pensioenManPolisnummer)}`}.
              </p>
            )}

            {data.pensioenVrouwHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De vrouw heeft pensioen opgebouwd bij {getValue(data.pensioenVrouwUitvoerder)}
                {data.pensioenVrouwPolisnummer && `, polisnummer ${getValue(data.pensioenVrouwPolisnummer)}`}.
              </p>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Door deze conversie doen partijen wederzijds afstand van hun recht op verevening van
              pensioenaanspraken als bedoeld in de WVPS.
            </p>

            {data.pensioenDetails && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                {getValue(data.pensioenDetails)}
              </p>
            )}
          </>
        )}

        {/* VARIANT 4: Uitsluiting verevening */}
        {data.pensioenRegeling === 'uitsluiting' && (
          <>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              <strong>5.4 Uitsluiting verevening pensioenaanspraken</strong><br />
              Partijen komen uitdrukkelijk overeen dat zij wederzijds afstand doen van hun recht op
              verevening van de tijdens het huwelijk opgebouwde pensioenaanspraken, zoals bedoeld in
              de Wet verevening pensioenaanspraken bij scheiding (WVPS).
            </p>

            {data.pensioenManHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De man heeft pensioen opgebouwd bij {getValue(data.pensioenManUitvoerder)}
                {data.pensioenManPolisnummer && `, polisnummer ${getValue(data.pensioenManPolisnummer)}`},
                welk pensioen voor hem behouden blijft.
              </p>
            )}

            {data.pensioenVrouwHeeft === 'ja' && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                De vrouw heeft pensioen opgebouwd bij {getValue(data.pensioenVrouwUitvoerder)}
                {data.pensioenVrouwPolisnummer && `, polisnummer ${getValue(data.pensioenVrouwPolisnummer)}`},
                welk pensioen voor haar behouden blijft.
              </p>
            )}

            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Deze afstandsverklaring is onherroepelijk en kan niet bij rechterlijke uitspraak worden
              gewijzigd, behoudens in het geval van een zo ingrijpende wijziging van omstandigheden,
              dat de partij die wijziging verzoekt naar maatstaven van redelijkheid en billijkheid niet
              langer aan dit beding mag worden gehouden.
            </p>

            {data.pensioenDetails && (
              <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
                {getValue(data.pensioenDetails)}
              </p>
            )}
          </>
        )}
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 6. BIJZONDERHEDEN (optioneel) */}
      {/* ============================================ */}
      {data.bijzonderheden && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            ARTIKEL 6. BIJZONDERHEDEN
          </h2>

          <p style={{ marginBottom: '16px', textAlign: 'justify', whiteSpace: 'pre-line' }}>
            {getValue(data.bijzonderheden)}
          </p>
        </div>
      )}

      {/* ============================================ */}
      {/* ARTIKEL 7. KOSTEN */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL {data.bijzonderheden ? '7' : '6'}. KOSTEN
        </h2>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Alle kosten verbonden aan de echtscheiding, de totstandkoming van dit convenant, de
          afwikkeling van de gemeenschap en de uitvoering van dit convenant, zoals
          (maar niet uitsluitend) de kosten van mediation, juridische bijstand, notaris,
          accountant en makelaar, komen voor rekening van partijen bij helfte, tenzij
          partijen anders overeenkomen.
        </p>
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 8. WIJZIGING CONVENANT */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL {data.bijzonderheden ? '8' : '7'}. WIJZIGING CONVENANT
        </h2>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Partijen komen overeen dat zij dit convenant alleen in onderling overleg en met
          wederzijdse instemming kunnen wijzigen. Wijzigingen dienen schriftelijk te worden
          vastgelegd en door beide partijen te worden ondertekend.
        </p>
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 9. RECHTSKEUZE */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL {data.bijzonderheden ? '9' : '8'}. RECHTSKEUZE
        </h2>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Op dit convenant is het Nederlands recht van toepassing. Geschillen die voortvloeien
          uit of verband houden met dit convenant zullen worden voorgelegd aan de bevoegde
          rechter in Nederland, te weten de {getValue(data.rechtbank, 'rechtbank')} die ook
          bevoegd is voor de echtscheidingsprocedure.
        </p>
      </div>

      {/* ============================================ */}
      {/* ARTIKEL 10. SLOTBEPALINGEN */}
      {/* ============================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          ARTIKEL {data.bijzonderheden ? '10' : '9'}. SLOTBEPALINGEN
        </h2>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Partijen verklaren dat zij:
        </p>

        <div style={{ marginLeft: '20px', marginBottom: '16px' }}>
          <p style={{ marginBottom: '8px' }}>
            - volledig op de hoogte zijn van de gevolgen van dit convenant;
          </p>
          <p style={{ marginBottom: '8px' }}>
            - de gelegenheid hebben gehad om juridisch advies in te winnen;
          </p>
          <p style={{ marginBottom: '8px' }}>
            - dit convenant uit vrije wil aangaan zonder dwang of ongeoorloofde beïnvloeding;
          </p>
          <p style={{ marginBottom: '8px' }}>
            - dit convenant beschouwen als een volledige en definitieve regeling van alle
            tussen hen bestaande aangelegenheden voortvloeiend uit hun huwelijk en de
            beëindiging daarvan;
          </p>
          <p style={{ marginBottom: '8px' }}>
            - wederzijds afstand doen van alle aanspraken jegens elkaar die niet in dit
            convenant zijn opgenomen.
          </p>
        </div>

        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          Partijen verklaren dat zij over en weer kwijting verlenen voor alle aanspraken die
          uit hun huwelijk en de gemeenschap van goederen voortvloeien, met uitzondering van
          de verplichtingen die in dit convenant zijn opgenomen.
        </p>
      </div>

      {/* ============================================ */}
      {/* ONDERTEKENING */}
      {/* ============================================ */}
      <div style={{ marginTop: '48px' }}>
        <p style={{ marginBottom: '32px', textAlign: 'justify' }}>
          Aldus overeengekomen en in drievoud opgemaakt en ondertekend te{' '}
          {getValue(data.ondertekeningPlaats)} op {formatDate(data.ondertekeningDatum)}.
        </p>

        {/* Handtekening man */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>De man,</strong>
          </p>
          <div style={{
            borderBottom: '1px solid #000',
            width: '250px',
            marginTop: '48px',
            marginBottom: '8px'
          }}></div>
          <p style={{ fontSize: '12px' }}>
            {getValue(data.manVoornamen)} {getValue(data.manAchternaam)}
          </p>
        </div>

        {/* Handtekening vrouw */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>De vrouw,</strong>
          </p>
          <div style={{
            borderBottom: '1px solid #000',
            width: '250px',
            marginTop: '48px',
            marginBottom: '8px'
          }}></div>
          <p style={{ fontSize: '12px' }}>
            {getValue(data.vrouwVoornamen)} {getValue(data.vrouwAchternaam)}
          </p>
        </div>
      </div>

      {/* ============================================ */}
      {/* PREVIEW VOLTOOID BERICHT */}
      {/* ============================================ */}
      <div style={{
        padding: '24px',
        backgroundColor: '#10b981',
        color: 'white',
        borderRadius: '8px',
        marginTop: '48px'
      }}>
        <p style={{
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'system-ui, sans-serif',
          margin: 0
        }}>
          Preview voltooid! Dit echtscheidingsconvenant bevat alle artikelen en is klaar voor export naar Word.
        </p>
      </div>

    </div>
  );
};
