// ============================================
// FILE: src/templates/echtscheiding/schema.ts
// Zod validatie schema voor echtscheidingsconvenant
// ============================================

import { z } from 'zod';

// ============================================
// HELPER SCHEMAS
// ============================================

const dateSchema = z.string().optional();
const requiredDateSchema = z.string().min(1, 'Datum is verplicht');
const euroSchema = z.number().min(0, 'Bedrag moet positief zijn').optional();
const requiredStringSchema = (fieldName: string) =>
  z.string().min(1, `${fieldName} is verplicht`);

// ============================================
// MAIN VALIDATION SCHEMA
// ============================================

export const echtscheidingSchema = z.object({
  // ============================================
  // SECTIE 1: PARTIJEN
  // ============================================
  manVoornamen: requiredStringSchema('Voornamen man'),
  manAchternaam: requiredStringSchema('Achternaam man'),
  manGeboortedatum: requiredDateSchema,
  manGeboorteplaats: requiredStringSchema('Geboorteplaats man'),
  manAdres: requiredStringSchema('Adres man'),
  manPostcode: requiredStringSchema('Postcode man'),
  manWoonplaats: requiredStringSchema('Woonplaats man'),

  vrouwVoornamen: requiredStringSchema('Voornamen vrouw'),
  vrouwAchternaam: requiredStringSchema('Achternaam vrouw'),
  vrouwGeboortedatum: requiredDateSchema,
  vrouwGeboorteplaats: requiredStringSchema('Geboorteplaats vrouw'),
  vrouwAdres: requiredStringSchema('Adres vrouw'),
  vrouwPostcode: requiredStringSchema('Postcode vrouw'),
  vrouwWoonplaats: requiredStringSchema('Woonplaats vrouw'),

  // ============================================
  // SECTIE 2: HUWELIJK
  // ============================================
  huwelijksdatum: requiredDateSchema,
  huwelijksplaats: requiredStringSchema('Huwelijksplaats'),
  nationaliteit: z.string().default('Nederlandse'),
  huwelijkseVoorwaarden: z.enum(['nee', 'ja']).default('nee'),

  // ============================================
  // SECTIE 3: KINDEREN
  // ============================================
  heeftKinderen: z.enum(['ja', 'nee']).refine((val) => val !== undefined, {
    message: 'Geef aan of er kinderen zijn'
  }),
  aantalKinderen: z.number().min(0).optional(),
  kinderenDetails: z.string().optional(),
  ouderlijkGezag: z.enum([
    'gezamenlijk',
    'gezamenlijk-hoofdverblijf-man',
    'gezamenlijk-hoofdverblijf-vrouw',
    'eenhoofdig-man',
    'eenhoofdig-vrouw'
  ]).optional(),
  zorgregelingDetails: z.string().optional(),
  kinderalimentatie: z.enum([
    'geen',
    'man-betaalt',
    'vrouw-betaalt'
  ]).optional(),
  kinderalimentatieBedrag: euroSchema,
  kinderalimentatieBedragVrouw: euroSchema,
  kinderenSpaargeld: z.string().optional(),

  // ============================================
  // SECTIE 4: PARTNERALIMENTATIE
  // ============================================
  alimentatieRegeling: z.enum([
    'geen',
    'voorlopig-en-definitief',
    'alleen-definitief',
    'afkoop',
    'afstand'
  ]).refine((val) => val !== undefined, {
    message: 'Kies een alimentatieregeling'
  }),

  // Voorlopige alimentatie
  voorlopigeAlimentatieBedrag: euroSchema,
  voorlopigeAlimentatieVanaf: dateSchema,
  voorlopigeAlimentatieTot: dateSchema,

  // Definitieve alimentatie
  definitieveAlimentatieBedrag: euroSchema,
  definitieveAlimentatieBedragAlleen: euroSchema,
  alimentatieplichtige: z.enum(['man', 'vrouw']).optional(),
  alimentatieplichtigeAlleen: z.enum(['man', 'vrouw']).optional(),
  alimentatieDuur: z.enum(['12jaar', 'korter', 'duur-specificeren']).optional(),
  alimentatieDuurAlleen: z.enum(['12jaar', 'korter', 'duur-specificeren']).optional(),
  alimentatieDuurJaren: z.number().min(1).max(12).optional(),
  alimentatieDuurDetails: z.string().optional(),

  // Afkoop
  afkoopBedrag: euroSchema,
  afkoopBetaler: z.enum(['man', 'vrouw']).optional(),
  afkoopBetalingsdatum: dateSchema,

  // ============================================
  // SECTIE 5: ECHTELIJKE WONING
  // ============================================
  woningStatus: z.enum([
    'geen',
    'huur',
    'eigen-toedeling',
    'eigen-verkoop'
  ]).refine((val) => val !== undefined, {
    message: 'Kies een woning status'
  }),

  // Huurwoning
  woningAdres: z.string().optional(),
  woningPostcode: z.string().optional(),
  woningWoonplaats: z.string().optional(),
  huurToedeling: z.enum(['man', 'vrouw']).optional(),
  huurBedrag: euroSchema,

  // Eigen woning - toedeling
  woningAdresEigen: z.string().optional(),
  woningPostcodeEigen: z.string().optional(),
  woningWoonplaatsEigen: z.string().optional(),
  woningWaarde: euroSchema,
  hypotheekBedrag: euroSchema,
  hypotheekVerstrekker: z.string().optional(),
  woningOverwaarde: euroSchema,
  woningToedeling: z.enum(['man', 'vrouw']).optional(),
  overnamesom: euroSchema,

  // Eigen woning - verkoop
  woningAdresVerkoop: z.string().optional(),
  woningPostcodeVerkoop: z.string().optional(),
  woningWoonplaatsVerkoop: z.string().optional(),
  woningWaardeVerkoop: euroSchema,
  hypotheekBedragVerkoop: euroSchema,
  hypotheekVerstrekkerVerkoop: z.string().optional(),

  // ============================================
  // SECTIE 6: VERMOGEN
  // ============================================
  heeftPrivevermogen: z.enum(['nee', 'ja']).refine((val) => val !== undefined, {
    message: 'Geef aan of er privévermogen is'
  }),
  privevermogenDetails: z.string().optional(),

  // Bankrekeningen
  heeftBankrekeningen: z.enum(['nee', 'ja']).refine((val) => val !== undefined, {
    message: 'Geef aan of er bankrekeningen zijn'
  }),
  bankrekeningenDetails: z.string().optional(),
  totaalSpaargeld: euroSchema,
  spaargeldVerdeling: z.enum(['fifty-fifty', 'anders', 'specifiek']).optional(),

  // Auto's
  heeftAutos: z.enum(['nee', 'ja']).refine((val) => val !== undefined, {
    message: 'Geef aan of er auto\'s zijn'
  }),
  autosDetails: z.string().optional(),

  // Inboedel
  inboedelRegeling: z.enum([
    'verdeeld',
    'fifty-fifty',
    'toedeling-man',
    'toedeling-vrouw'
  ]).refine((val) => val !== undefined, {
    message: 'Kies een inboedelregeling'
  }),
  inboedelWaarde: euroSchema,
  inboedelDetails: z.string().optional(),

  // Schulden
  heeftSchulden: z.enum(['nee', 'ja']).refine((val) => val !== undefined, {
    message: 'Geef aan of er schulden zijn'
  }),
  schuldenDetails: z.string().optional(),

  // ============================================
  // SECTIE 7: PENSIOEN
  // ============================================
  pensioenRegeling: z.enum([
    'standaard',
    'afwijkend',
    'conversie',
    'uitsluiting'
  ]).refine((val) => val !== undefined, {
    message: 'Kies een pensioenregeling'
  }),

  pensioenManHeeft: z.enum(['nee', 'ja']).optional(),
  pensioenManUitvoerder: z.string().optional(),
  pensioenManPolisnummer: z.string().optional(),

  pensioenVrouwHeeft: z.enum(['nee', 'ja']).optional(),
  pensioenVrouwUitvoerder: z.string().optional(),
  pensioenVrouwPolisnummer: z.string().optional(),

  pensioenAfwijkendPercentage: z.number().min(0).max(100).optional(),
  pensioenDetails: z.string().optional(),

  // ============================================
  // SECTIE 8: OVERIGE GEGEVENS
  // ============================================
  mediatorNaam: z.string().optional(),
  kantoorNaam: z.string().optional(),
  rechtbank: z.string().default('Rechtbank'),
  zaakNummerBekend: z.enum(['nee', 'ja']).optional(),
  zaakNummer: z.string().optional(),
  ondertekeningDatum: requiredDateSchema,
  ondertekeningPlaats: requiredStringSchema('Plaats ondertekening'),
  bijzonderheden: z.string().optional(),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type EchtscheidingFormData = z.infer<typeof echtscheidingSchema>;

// Default values voor form initialisatie
export const echtscheidingDefaultValues: Partial<EchtscheidingFormData> = {
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
};
