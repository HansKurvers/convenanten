// ============================================
// FILE: src/templates/echtscheiding/config.ts
// Configuratie voor echtscheidingsconvenant template
// ============================================

import type { TemplateConfig } from '../../types/template.types';

export const echtscheidingConfig: Omit<TemplateConfig, 'schema' | 'defaultValues'> = {
  metadata: {
    id: 'echtscheiding' as const,
    name: 'Echtscheidingsconvenant',
    fullName: 'Convenant inzake echtscheiding met algehele gemeenschap van goederen',
    description: 'Convenant voor echtscheiding met algehele gemeenschap van goederen',
    version: '1.0.0',
    organization: 'Convenanten Generator',
    color: '#2563eb',
  },

  sections: [
    // ============================================
    // SECTIE 1: PARTIJEN
    // ============================================
    {
      id: 'partijen',
      title: 'Gegevens Partijen',
      order: 1,
      fields: [
        // Man
        {
          id: 'manVoornamen',
          label: 'Voornamen man',
          type: 'text',
          placeholder: 'Bijv. Johannes Petrus',
          required: true,
        },
        {
          id: 'manAchternaam',
          label: 'Achternaam man',
          type: 'text',
          placeholder: 'Bijv. van der Berg',
          required: true,
        },
        {
          id: 'manGeboortedatum',
          label: 'Geboortedatum man',
          type: 'date',
          required: true,
        },
        {
          id: 'manGeboorteplaats',
          label: 'Geboorteplaats man',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          required: true,
        },
        {
          id: 'manAdres',
          label: 'Adres man',
          type: 'text',
          placeholder: 'Straat en huisnummer',
          required: true,
          helpText: 'Het huidige woonadres van de man',
        },
        {
          id: 'manPostcode',
          label: 'Postcode man',
          type: 'text',
          placeholder: '1234 AB',
          required: true,
        },
        {
          id: 'manWoonplaats',
          label: 'Woonplaats man',
          type: 'text',
          placeholder: 'Bijv. Utrecht',
          required: true,
        },

        // Vrouw
        {
          id: 'vrouwVoornamen',
          label: 'Voornamen vrouw',
          type: 'text',
          placeholder: 'Bijv. Maria Elisabeth',
          required: true,
        },
        {
          id: 'vrouwAchternaam',
          label: 'Achternaam vrouw',
          type: 'text',
          placeholder: 'Bijv. Jansen',
          required: true,
        },
        {
          id: 'vrouwGeboortedatum',
          label: 'Geboortedatum vrouw',
          type: 'date',
          required: true,
        },
        {
          id: 'vrouwGeboorteplaats',
          label: 'Geboorteplaats vrouw',
          type: 'text',
          placeholder: 'Bijv. Rotterdam',
          required: true,
        },
        {
          id: 'vrouwAdres',
          label: 'Adres vrouw',
          type: 'text',
          placeholder: 'Straat en huisnummer',
          required: true,
          helpText: 'Het huidige woonadres van de vrouw',
        },
        {
          id: 'vrouwPostcode',
          label: 'Postcode vrouw',
          type: 'text',
          placeholder: '5678 CD',
          required: true,
        },
        {
          id: 'vrouwWoonplaats',
          label: 'Woonplaats vrouw',
          type: 'text',
          placeholder: 'Bijv. Den Haag',
          required: true,
        },
      ],
    },

    // ============================================
    // SECTIE 2: HUWELIJK
    // ============================================
    {
      id: 'huwelijk',
      title: 'Huwelijksgegevens',
      order: 2,
      fields: [
        {
          id: 'huwelijksdatum',
          label: 'Datum huwelijk',
          type: 'date',
          required: true,
        },
        {
          id: 'huwelijksplaats',
          label: 'Plaats huwelijk',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          required: true,
        },
        {
          id: 'nationaliteit',
          label: 'Nationaliteit beide partijen',
          type: 'text',
          defaultValue: 'Nederlandse',
          required: true,
          helpText: 'Indien verschillend, beide nationaliteiten vermelden',
        },
        {
          id: 'huwelijkseVoorwaarden',
          label: 'Huwelijkse voorwaarden',
          type: 'select',
          options: [
            { value: 'nee', label: 'Geen huwelijkse voorwaarden (algehele gemeenschap)' },
            { value: 'ja', label: 'Wel huwelijkse voorwaarden' },
          ],
          defaultValue: 'nee',
          required: true,
        },
      ],
    },

    // ============================================
    // SECTIE 3: KINDEREN
    // ============================================
    {
      id: 'kinderen',
      title: 'Kinderen',
      order: 3,
      fields: [
        {
          id: 'heeftKinderen',
          label: 'Zijn er (minderjarige) kinderen uit dit huwelijk?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee, er zijn geen kinderen' },
            { value: 'ja', label: 'Ja, er zijn kinderen' },
          ],
          required: true,
        },
        {
          id: 'aantalKinderen',
          label: 'Aantal kinderen',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'heeftKinderen',
            value: 'ja',
          },
        },
        {
          id: 'kinderenDetails',
          label: 'Gegevens kinderen',
          type: 'textarea',
          placeholder: 'Bijv.:\n- Anna Maria Jansen, geboren 15-03-2010 te Utrecht, minderjarig\n- Piet Johannes Jansen, geboren 22-08-2012 te Utrecht, minderjarig',
          conditional: {
            field: 'heeftKinderen',
            value: 'ja',
          },
          helpText: 'Vermeld per kind: voornamen, achternaam, geboortedatum, geboorteplaats en of minderjarig',
        },
        {
          id: 'ouderlijkGezag',
          label: 'Ouderlijk gezag en zorgregeling',
          type: 'select',
          options: [
            { value: 'gezamenlijk', label: 'Gezamenlijk ouderlijk gezag met co-ouderschap' },
            { value: 'gezamenlijk-hoofdverblijf-man', label: 'Gezamenlijk gezag, hoofdverblijf bij vader' },
            { value: 'gezamenlijk-hoofdverblijf-vrouw', label: 'Gezamenlijk gezag, hoofdverblijf bij moeder' },
            { value: 'eenhoofdig-man', label: 'Eenhoofdig gezag bij vader' },
            { value: 'eenhoofdig-vrouw', label: 'Eenhoofdig gezag bij moeder' },
          ],
          conditional: {
            field: 'heeftKinderen',
            value: 'ja',
          },
        },
        {
          id: 'zorgregelingDetails',
          label: 'Omgangsregeling details',
          type: 'textarea',
          placeholder: 'Beschrijf de afspraken over de omgangsregeling',
          conditional: {
            field: 'heeftKinderen',
            value: 'ja',
          },
          helpText: 'Bijv. elke week van woensdag tot zondag, vakanties fifty-fifty',
        },
        {
          id: 'kinderalimentatie',
          label: 'Kinderalimentatie',
          type: 'select',
          options: [
            { value: 'geen', label: 'Geen kinderalimentatie (beide ouders dragen bij)' },
            { value: 'man-betaalt', label: 'Vader betaalt kinderalimentatie' },
            { value: 'vrouw-betaalt', label: 'Moeder betaalt kinderalimentatie' },
          ],
          conditional: {
            field: 'heeftKinderen',
            value: 'ja',
          },
        },
        {
          id: 'kinderalimentatieBedrag',
          label: 'Bedrag kinderalimentatie per kind per maand',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'kinderalimentatie',
            value: 'man-betaalt',
          },
          helpText: 'Bruto bedrag per maand per kind',
        },
        {
          id: 'kinderalimentatieBedragVrouw',
          label: 'Bedrag kinderalimentatie per kind per maand',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'kinderalimentatie',
            value: 'vrouw-betaalt',
          },
          helpText: 'Bruto bedrag per maand per kind',
        },
      ],
    },

    // ============================================
    // SECTIE 4: PARTNERALIMENTATIE
    // ============================================
    {
      id: 'alimentatie',
      title: 'Partneralimentatie',
      order: 4,
      fields: [
        {
          id: 'alimentatieRegeling',
          label: 'Partneralimentatie regeling',
          type: 'select',
          options: [
            { value: 'geen', label: 'Geen partneralimentatie' },
            { value: 'voorlopig-en-definitief', label: 'Voorlopige �n definitieve alimentatie' },
            { value: 'alleen-definitief', label: 'Alleen definitieve alimentatie' },
            { value: 'afkoop', label: 'Afkoop alimentatie (eenmalige betaling)' },
            { value: 'afstand', label: 'Afstand van recht op alimentatie' },
          ],
          required: true,
        },

        // Voorlopige alimentatie
        {
          id: 'voorlopigeAlimentatieBedrag',
          label: 'Voorlopige alimentatie (bruto per maand)',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
        },
        {
          id: 'voorlopigeAlimentatieVanaf',
          label: 'Voorlopige alimentatie vanaf datum',
          type: 'date',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
          helpText: 'De datum vanaf wanneer de voorlopige alimentatie ingaat',
        },
        {
          id: 'voorlopigeAlimentatieTot',
          label: 'Voorlopige alimentatie tot datum',
          type: 'date',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
          helpText: 'De datum tot wanneer de voorlopige alimentatie geldt (bijv. echtscheidingsdatum)',
        },

        // Definitieve alimentatie
        {
          id: 'definitieveAlimentatieBedrag',
          label: 'Definitieve alimentatie (bruto per maand)',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
        },
        {
          id: 'definitieveAlimentatieBedragAlleen',
          label: 'Definitieve alimentatie (bruto per maand)',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'alleen-definitief',
          },
        },
        {
          id: 'alimentatieplichtige',
          label: 'Wie betaalt de alimentatie?',
          type: 'radio',
          options: [
            { value: 'man', label: 'De man betaalt aan de vrouw' },
            { value: 'vrouw', label: 'De vrouw betaalt aan de man' },
          ],
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
        },
        {
          id: 'alimentatieplichtigeAlleen',
          label: 'Wie betaalt de alimentatie?',
          type: 'radio',
          options: [
            { value: 'man', label: 'De man betaalt aan de vrouw' },
            { value: 'vrouw', label: 'De vrouw betaalt aan de man' },
          ],
          conditional: {
            field: 'alimentatieRegeling',
            value: 'alleen-definitief',
          },
        },
        {
          id: 'alimentatieDuur',
          label: 'Duur van de alimentatie',
          type: 'select',
          options: [
            { value: '12jaar', label: 'Maximaal 12 jaar (wettelijk)' },
            { value: 'korter', label: 'Korter dan 12 jaar' },
            { value: 'duur-specificeren', label: 'Andere termijn specificeren' },
          ],
          conditional: {
            field: 'alimentatieRegeling',
            value: 'voorlopig-en-definitief',
          },
        },
        {
          id: 'alimentatieDuurAlleen',
          label: 'Duur van de alimentatie',
          type: 'select',
          options: [
            { value: '12jaar', label: 'Maximaal 12 jaar (wettelijk)' },
            { value: 'korter', label: 'Korter dan 12 jaar' },
            { value: 'duur-specificeren', label: 'Andere termijn specificeren' },
          ],
          conditional: {
            field: 'alimentatieRegeling',
            value: 'alleen-definitief',
          },
        },
        {
          id: 'alimentatieDuurJaren',
          label: 'Aantal jaren',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'alimentatieDuur',
            value: 'korter',
          },
        },
        {
          id: 'alimentatieDuurDetails',
          label: 'Specificatie termijn',
          type: 'text',
          placeholder: 'Bijv. tot en met 31 december 2030',
          conditional: {
            field: 'alimentatieDuur',
            value: 'duur-specificeren',
          },
        },

        // Afkoop
        {
          id: 'afkoopBedrag',
          label: 'Afkoopsom (eenmalig bedrag)',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'afkoop',
          },
          helpText: 'Het totaalbedrag waarmee de alimentatie wordt afgekocht',
        },
        {
          id: 'afkoopBetaler',
          label: 'Wie betaalt de afkoopsom?',
          type: 'radio',
          options: [
            { value: 'man', label: 'De man betaalt aan de vrouw' },
            { value: 'vrouw', label: 'De vrouw betaalt aan de man' },
          ],
          conditional: {
            field: 'alimentatieRegeling',
            value: 'afkoop',
          },
        },
        {
          id: 'afkoopBetalingsdatum',
          label: 'Datum betaling afkoopsom',
          type: 'date',
          conditional: {
            field: 'alimentatieRegeling',
            value: 'afkoop',
          },
        },
      ],
    },

    // ============================================
    // SECTIE 5: ECHTELIJKE WONING
    // ============================================
    {
      id: 'woning',
      title: 'Echtelijke Woning',
      order: 5,
      fields: [
        {
          id: 'woningStatus',
          label: 'Status van de woning',
          type: 'select',
          options: [
            { value: 'geen', label: 'Geen echtelijke woning' },
            { value: 'huur', label: 'Huurwoning' },
            { value: 'eigen-toedeling', label: 'Eigen woning - toedeling aan ��n partij' },
            { value: 'eigen-verkoop', label: 'Eigen woning - verkoop' },
          ],
          required: true,
        },

        {
          id: 'woningAdres',
          label: 'Adres echtelijke woning',
          type: 'text',
          placeholder: 'Straat en huisnummer',
          conditional: {
            field: 'woningStatus',
            value: 'huur',
          },
        },
        {
          id: 'woningAdresEigen',
          label: 'Adres echtelijke woning',
          type: 'text',
          placeholder: 'Straat en huisnummer',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'woningAdresVerkoop',
          label: 'Adres echtelijke woning',
          type: 'text',
          placeholder: 'Straat en huisnummer',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
        },
        {
          id: 'woningPostcode',
          label: 'Postcode',
          type: 'text',
          placeholder: '1234 AB',
          conditional: {
            field: 'woningStatus',
            value: 'huur',
          },
        },
        {
          id: 'woningPostcodeEigen',
          label: 'Postcode',
          type: 'text',
          placeholder: '1234 AB',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'woningPostcodeVerkoop',
          label: 'Postcode',
          type: 'text',
          placeholder: '1234 AB',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
        },
        {
          id: 'woningWoonplaats',
          label: 'Woonplaats',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          conditional: {
            field: 'woningStatus',
            value: 'huur',
          },
        },
        {
          id: 'woningWoonplaatsEigen',
          label: 'Woonplaats',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'woningWoonplaatsVerkoop',
          label: 'Woonplaats',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
        },

        // Huurwoning
        {
          id: 'huurToedeling',
          label: 'Huurrecht toegedeeld aan',
          type: 'radio',
          options: [
            { value: 'man', label: 'De man' },
            { value: 'vrouw', label: 'De vrouw' },
          ],
          conditional: {
            field: 'woningStatus',
            value: 'huur',
          },
        },
        {
          id: 'huurBedrag',
          label: 'Maandelijkse huur',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'huur',
          },
        },

        // Eigen woning
        {
          id: 'woningWaarde',
          label: 'WOZ-waarde / Taxatiewaarde woning',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
          helpText: 'De geschatte waarde van de woning',
        },
        {
          id: 'woningWaardeVerkoop',
          label: 'WOZ-waarde / Taxatiewaarde woning',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
          helpText: 'De geschatte waarde van de woning',
        },
        {
          id: 'hypotheekBedrag',
          label: 'Restant hypotheekschuld',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'hypotheekBedragVerkoop',
          label: 'Restant hypotheekschuld',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
        },
        {
          id: 'hypotheekVerstrekker',
          label: 'Hypotheekverstrekker',
          type: 'text',
          placeholder: 'Bijv. ABN AMRO',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'hypotheekVerstrekkerVerkoop',
          label: 'Hypotheekverstrekker',
          type: 'text',
          placeholder: 'Bijv. ABN AMRO',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-verkoop',
          },
        },
        {
          id: 'woningOverwaarde',
          label: 'Overwaarde (automatisch berekend)',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
          helpText: 'Waarde minus hypotheek = overwaarde',
        },
        {
          id: 'woningToedeling',
          label: 'Woning toegedeeld aan',
          type: 'radio',
          options: [
            { value: 'man', label: 'De man' },
            { value: 'vrouw', label: 'De vrouw' },
          ],
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
        },
        {
          id: 'overnamesom',
          label: 'Overnamesom / verrekening overwaarde',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'woningStatus',
            value: 'eigen-toedeling',
          },
          helpText: 'Bedrag dat de overnemende partij aan de ander betaalt',
        },
      ],
    },

    // ============================================
    // SECTIE 6: VERMOGEN
    // ============================================
    {
      id: 'vermogen',
      title: 'Vermogen en Bezittingen',
      order: 6,
      fields: [
        {
          id: 'heeftPrivevermogen',
          label: 'Is er priv�vermogen van ��n van de partijen?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee, geen priv�vermogen' },
            { value: 'ja', label: 'Ja, er is priv�vermogen' },
          ],
          required: true,
          helpText: 'Vermogen dat v��r het huwelijk was of door erfenis/schenking is verkregen',
        },
        {
          id: 'privevermogenDetails',
          label: 'Omschrijving priv�vermogen',
          type: 'textarea',
          placeholder: 'Beschrijf het priv�vermogen en van wie',
          conditional: {
            field: 'heeftPrivevermogen',
            value: 'ja',
          },
        },

        // Bankrekeningen
        {
          id: 'heeftBankrekeningen',
          label: 'Zijn er bankrekeningen?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee' },
            { value: 'ja', label: 'Ja' },
          ],
          required: true,
        },
        {
          id: 'bankrekeningenDetails',
          label: 'Overzicht bankrekeningen',
          type: 'textarea',
          placeholder: 'Bijv.:\n- ING rekening NL12 INGB 0001 2345 67, saldo � 5.000, toedeling: man\n- Rabobank NL98 RABO 0123 4567 89, saldo � 8.000, toedeling: vrouw',
          conditional: {
            field: 'heeftBankrekeningen',
            value: 'ja',
          },
          helpText: 'Vermeld per rekening: bank, rekeningnummer, saldo en toedeling',
        },

        // Spaargelden totaal
        {
          id: 'totaalSpaargeld',
          label: 'Totaal spaargeld beide partijen',
          type: 'number',
          placeholder: '0',
          helpText: 'Totaalbedrag van alle spaargelden samen',
        },
        {
          id: 'spaargeldVerdeling',
          label: 'Verdeling spaargeld',
          type: 'select',
          options: [
            { value: 'fifty-fifty', label: '50/50 verdeling' },
            { value: 'anders', label: 'Andere verdeling' },
            { value: 'specifiek', label: 'Per rekening toegedeeld (zie details hierboven)' },
          ],
        },

        // Auto's
        {
          id: 'heeftAutos',
          label: 'Zijn er auto\'s / voertuigen?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee' },
            { value: 'ja', label: 'Ja' },
          ],
          required: true,
        },
        {
          id: 'autosDetails',
          label: 'Overzicht auto\'s / voertuigen',
          type: 'textarea',
          placeholder: 'Bijv.:\n- Volkswagen Golf, kenteken AB-123-CD, waarde � 15.000, toedeling: man\n- Toyota Yaris, kenteken EF-456-GH, waarde � 8.000, toedeling: vrouw',
          conditional: {
            field: 'heeftAutos',
            value: 'ja',
          },
          helpText: 'Vermeld per voertuig: merk/model, kenteken, waarde en toedeling',
        },

        // Inboedel
        {
          id: 'inboedelRegeling',
          label: 'Inboedel regeling',
          type: 'select',
          options: [
            { value: 'verdeeld', label: 'Inboedel is onderling verdeeld' },
            { value: 'fifty-fifty', label: 'Inboedel 50/50 verdelen op basis van taxatie' },
            { value: 'toedeling-man', label: 'Volledige inboedel naar man' },
            { value: 'toedeling-vrouw', label: 'Volledige inboedel naar vrouw' },
          ],
          required: true,
        },
        {
          id: 'inboedelWaarde',
          label: 'Taxatiewaarde inboedel',
          type: 'number',
          placeholder: '0',
          conditional: {
            field: 'inboedelRegeling',
            value: 'fifty-fifty',
          },
        },
        {
          id: 'inboedelDetails',
          label: 'Toelichting inboedel verdeling',
          type: 'textarea',
          placeholder: 'Bijv. specifieke afspraken over bepaalde items',
          helpText: 'Optioneel: extra details over de inboedelverdeling',
        },

        // Schulden
        {
          id: 'heeftSchulden',
          label: 'Zijn er gemeenschappelijke schulden (excl. hypotheek)?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee' },
            { value: 'ja', label: 'Ja' },
          ],
          required: true,
        },
        {
          id: 'schuldenDetails',
          label: 'Overzicht schulden',
          type: 'textarea',
          placeholder: 'Bijv.:\n- Studielening man bij DUO, bedrag � 15.000, voor rekening: man\n- Persoonlijke lening Rabobank � 10.000, fifty-fifty verdelen',
          conditional: {
            field: 'heeftSchulden',
            value: 'ja',
          },
          helpText: 'Vermeld per schuld: type, schuldeiser, bedrag en verdeling',
        },
      ],
    },

    // ============================================
    // SECTIE 7: PENSIOENEN
    // ============================================
    {
      id: 'pensioen',
      title: 'Pensioenen',
      order: 7,
      fields: [
        {
          id: 'pensioenRegeling',
          label: 'Pensioenverevening',
          type: 'select',
          options: [
            { value: 'standaard', label: 'Standaard verevening (50/50)' },
            { value: 'afwijkend', label: 'Afwijkend vereveningsdeel' },
            { value: 'conversie', label: 'Conversie (omzetting in alimentatie)' },
            { value: 'uitsluiting', label: 'Uitsluiting verevening (geen verevening)' },
          ],
          required: true,
          helpText: 'Standaard wordt pensioen 50/50 verdeeld over huwelijksperiode',
        },

        {
          id: 'pensioenManHeeft',
          label: 'Heeft de man pensioen opgebouwd?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee' },
            { value: 'ja', label: 'Ja' },
          ],
        },
        {
          id: 'pensioenManUitvoerder',
          label: 'Pensioenuitvoerder man',
          type: 'text',
          placeholder: 'Bijv. ABP, PGGM',
          conditional: {
            field: 'pensioenManHeeft',
            value: 'ja',
          },
        },
        {
          id: 'pensioenManPolisnummer',
          label: 'Polisnummer / deelnemersnummer man',
          type: 'text',
          conditional: {
            field: 'pensioenManHeeft',
            value: 'ja',
          },
        },

        {
          id: 'pensioenVrouwHeeft',
          label: 'Heeft de vrouw pensioen opgebouwd?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee' },
            { value: 'ja', label: 'Ja' },
          ],
        },
        {
          id: 'pensioenVrouwUitvoerder',
          label: 'Pensioenuitvoerder vrouw',
          type: 'text',
          placeholder: 'Bijv. ABP, PGGM',
          conditional: {
            field: 'pensioenVrouwHeeft',
            value: 'ja',
          },
        },
        {
          id: 'pensioenVrouwPolisnummer',
          label: 'Polisnummer / deelnemersnummer vrouw',
          type: 'text',
          conditional: {
            field: 'pensioenVrouwHeeft',
            value: 'ja',
          },
        },

        {
          id: 'pensioenAfwijkendPercentage',
          label: 'Afwijkend vereveningspercentage',
          type: 'number',
          placeholder: '50',
          conditional: {
            field: 'pensioenRegeling',
            value: 'afwijkend',
          },
          helpText: 'Percentage dat wordt verdeeld (standaard 50%)',
        },
        {
          id: 'pensioenDetails',
          label: 'Toelichting pensioenafspraken',
          type: 'textarea',
          placeholder: 'Extra details of afwijkende afspraken',
          helpText: 'Optioneel: aanvullende informatie',
        },
      ],
    },

    // ============================================
    // SECTIE 8: OVERIGE GEGEVENS
    // ============================================
    {
      id: 'overig',
      title: 'Overige Gegevens',
      order: 8,
      fields: [
        {
          id: 'mediatorNaam',
          label: 'Naam mediator/advocaat',
          type: 'text',
          placeholder: 'Naam van de begeleidende professional',
          helpText: 'Optioneel: degene die het convenant heeft begeleid',
        },
        {
          id: 'kantoorNaam',
          label: 'Naam kantoor/praktijk',
          type: 'text',
          placeholder: 'Bijv. Mediation Centrum Amsterdam',
          helpText: 'Optioneel',
        },
        {
          id: 'rechtbank',
          label: 'Bevoegde rechtbank',
          type: 'text',
          placeholder: 'Bijv. Rechtbank Amsterdam',
          defaultValue: 'Rechtbank',
        },
        {
          id: 'zaakNummerBekend',
          label: 'Is het zaaknummer al bekend?',
          type: 'radio',
          options: [
            { value: 'nee', label: 'Nee, nog niet bekend' },
            { value: 'ja', label: 'Ja, zaaknummer is bekend' },
          ],
        },
        {
          id: 'zaakNummer',
          label: 'Zaaknummer rechtbank',
          type: 'text',
          placeholder: 'Bijv. C/13/123456 / FA RK 12-3456',
          conditional: {
            field: 'zaakNummerBekend',
            value: 'ja',
          },
        },
        {
          id: 'ondertekeningDatum',
          label: 'Datum ondertekening convenant',
          type: 'date',
          required: true,
        },
        {
          id: 'ondertekeningPlaats',
          label: 'Plaats ondertekening',
          type: 'text',
          placeholder: 'Bijv. Amsterdam',
          required: true,
        },
        {
          id: 'bijzonderheden',
          label: 'Bijzonderheden / aanvullende afspraken',
          type: 'textarea',
          placeholder: 'Eventuele extra afspraken die niet onder andere secties vallen',
          helpText: 'Optioneel: overige afspraken of opmerkingen',
        },
      ],
    },
  ],
};
