// ============================================
// FILE: src/templates/echtscheiding/export.ts
// Word document export voor echtscheidingsconvenant
// ============================================

import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export const generateEchtscheidingDocument = (data: Record<string, any>): Document => {

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

  const createHeading = (text: string, level: string = HeadingLevel.HEADING_1): Paragraph => {
    return new Paragraph({
      text: text,
      heading: level as any,
      spacing: { before: 400, after: 200 }
    });
  };

  const createParagraph = (text: string, bold: boolean = false): Paragraph => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: bold
        })
      ],
      spacing: { before: 120, after: 120 },
      alignment: AlignmentType.JUSTIFIED
    });
  };

  const createNumberedParagraph = (number: string, text: string): Paragraph => {
    return new Paragraph({
      children: [
        new TextRun({ text: number, bold: true }),
        new TextRun({ text: ' ' + text })
      ],
      spacing: { before: 120, after: 120 },
      alignment: AlignmentType.JUSTIFIED
    });
  };

  // ============================================
  // DOCUMENT SECTIES
  // ============================================

  const sections: Paragraph[] = [];

  // ============================================
  // HEADER
  // ============================================

  sections.push(
    new Paragraph({
      text: 'CONVENANT ALGEHELE GEMEENSCHAP VAN GOEDEREN',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: 'ECHTSCHEIDINGSCONVENANT',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // ============================================
  // DE ONDERGETEKENDEN
  // ============================================

  sections.push(
    createParagraph('DE ONDERGETEKENDEN:', true),
    createParagraph(
      `${getValue(data.manVoornamen)} ${getValue(data.manAchternaam).toUpperCase()}, ` +
      `geboren op ${formatDate(data.manGeboortedatum)} te ${getValue(data.manGeboorteplaats)}, ` +
      `wonende op het adres ${getValue(data.manAdres)}, ${getValue(data.manPostcode)} te ${getValue(data.manWoonplaats)}, ` +
      `hierna te noemen: "de man";`
    ),
    createParagraph('en', false),
    createParagraph(
      `${getValue(data.vrouwVoornamen)} ${getValue(data.vrouwAchternaam).toUpperCase()}, ` +
      `geboren op ${formatDate(data.vrouwGeboortedatum)} te ${getValue(data.vrouwGeboorteplaats)}, ` +
      `wonende op het adres ${getValue(data.vrouwAdres)}, ${getValue(data.vrouwPostcode)} te ${getValue(data.vrouwWoonplaats)}, ` +
      `hierna te noemen: "de vrouw";`
    ),
    createParagraph('samen te noemen: "partijen";', false)
  );

  // ============================================
  // NEMEN IN AANMERKING
  // ============================================

  sections.push(
    createParagraph('NEMEN IN AANMERKING:', true),
    createParagraph(
      `Partijen zijn op ${formatDate(data.huwelijksdatum)} te ${getValue(data.huwelijksplaats)} met elkaar gehuwd.`
    ),
    createParagraph(
      `De man en de vrouw hebben beiden de ${getValue(data.nationaliteit, 'Nederlandse')} nationaliteit.`
    ),
    createParagraph(
      'De vraag of ontbinding van het huwelijk kan worden uitgesproken en op welke gronden, ' +
      'wordt volgens artikel 10:56 BW bepaald door het Nederlandse recht.'
    ),
    createParagraph(
      'Partijen hebben voorafgaand aan en tijdens hun huwelijk geen huwelijkse voorwaarden gemaakt. ' +
      'Omdat partijen met elkaar in het huwelijk zijn getreden v��r 1 januari 2018, ' +
      'bestaat tussen hen een algehele gemeenschap van goederen.'
    )
  );

  // ============================================
  // KINDEREN SECTIE
  // ============================================

  if (data.heeftKinderen === 'ja') {
    const kinderenTekst = data.aantalKinderen === 1
      ? 'Uit dit huwelijk is het volgende kind geboren:'
      : 'Uit dit huwelijk zijn de volgende kinderen geboren:';

    sections.push(createParagraph(kinderenTekst));

    if (data.kinderenDetails) {
      sections.push(createParagraph(getValue(data.kinderenDetails)));
    }

    if (data.ouderlijkGezag) {
      let gezagTekst = '';
      if (data.ouderlijkGezag === 'gezamenlijk') {
        gezagTekst = 'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit en hebben een co-ouderregeling afgesproken.';
      } else if (data.ouderlijkGezag === 'gezamenlijk-hoofdverblijf-man') {
        gezagTekst = 'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit. Het hoofdverblijf van het kind/de kinderen is bij de vader.';
      } else if (data.ouderlijkGezag === 'gezamenlijk-hoofdverblijf-vrouw') {
        gezagTekst = 'Partijen oefenen over hun minderjarige kind(eren) gezamenlijk het ouderlijk gezag uit. Het hoofdverblijf van het kind/de kinderen is bij de moeder.';
      } else if (data.ouderlijkGezag === 'eenhoofdig-man') {
        gezagTekst = 'Het eenhoofdig ouderlijk gezag over de minderjarige kind(eren) wordt uitgeoefend door de vader.';
      } else if (data.ouderlijkGezag === 'eenhoofdig-vrouw') {
        gezagTekst = 'Het eenhoofdig ouderlijk gezag over de minderjarige kind(eren) wordt uitgeoefend door de moeder.';
      }
      sections.push(createParagraph(gezagTekst));
    }

    if (data.zorgregelingDetails) {
      sections.push(createParagraph(`De omgangsregeling is als volgt: ${getValue(data.zorgregelingDetails)}`));
    }

    if (data.kinderalimentatie && data.kinderalimentatie !== 'geen') {
      if (data.kinderalimentatie === 'man-betaalt') {
        sections.push(createParagraph(
          `De vader betaalt aan de moeder een bijdrage in de kosten van verzorging en opvoeding van ` +
          `� ${getValue(data.kinderalimentatieBedrag, '[bedrag]')} bruto per kind per maand.`
        ));
      } else if (data.kinderalimentatie === 'vrouw-betaalt') {
        sections.push(createParagraph(
          `De moeder betaalt aan de vader een bijdrage in de kosten van verzorging en opvoeding van ` +
          `� ${getValue(data.kinderalimentatieBedragVrouw, '[bedrag]')} bruto per kind per maand.`
        ));
      }
    }
  } else if (data.heeftKinderen === 'nee') {
    sections.push(createParagraph('Uit dit huwelijk zijn geen kinderen geboren.'));
  }

  // ============================================
  // MEDIATOR/RECHTBANK TEKST
  // ============================================

  sections.push(
    createParagraph(
      `Het huwelijk van partijen is duurzaam ontwricht. Partijen wensen daarom dat hun huwelijk ` +
      `door echtscheiding wordt ontbonden. Partijen hebben zich daartoe gewend tot ` +
      `${data.mediatorNaam ? `mr. ${getValue(data.mediatorNaam)}` : 'een advocaat-mediator'}, ` +
      `met het verzoek hen beiden te informeren en te begeleiden bij de totstandkoming van ` +
      `een regeling voor de gevolgen van hun scheiding en voor hen aan de ` +
      `${getValue(data.rechtbank, 'rechtbank')} te verzoeken tussen hen de echtscheiding uit te spreken.`
    ),
    createParagraph(
      'Voor het geval de echtscheiding tussen partijen wordt uitgesproken en de beschikking ' +
      'wordt ingeschreven in de registers van de burgerlijke stand, hebben partijen de gevolgen ' +
      'van deze echtscheiding op de hieronder omschreven wijze met elkaar geregeld.'
    )
  );

  // ============================================
  // PARTIJEN VERKLAREN
  // ============================================

  sections.push(
    createParagraph('PARTIJEN VERKLAREN HET VOLGENDE MET ELKAAR TE ZIJN OVEREENGEKOMEN:', true)
  );

  // ============================================
  // ARTIKEL 1 - KINDEREN
  // ============================================

  if (data.heeftKinderen === 'ja') {
    sections.push(
      createHeading('ARTIKEL 1. KINDEREN', HeadingLevel.HEADING_2),
      createNumberedParagraph(
        '1.1',
        `Partijen hebben als ouders van hun ${data.aantalKinderen === 1 ? 'kind' : 'kinderen'} ` +
        'afspraken vastgelegd in een ouderschapsplan, dat als bijlage 1 aan dit convenant wordt gehecht ' +
        'en daarvan onlosmakelijk deel uitmaakt.'
      )
    );

    if (data.kinderalimentatie === 'man-betaalt' || data.kinderalimentatie === 'vrouw-betaalt') {
      const plichtige = data.kinderalimentatie === 'man-betaalt' ? 'man' : 'vrouw';
      const gerechtigde = data.kinderalimentatie === 'man-betaalt' ? 'vrouw' : 'man';
      const bedrag = data.kinderalimentatie === 'man-betaalt'
        ? data.kinderalimentatieBedrag
        : data.kinderalimentatieBedragVrouw;

      sections.push(createParagraph(
        `De ${plichtige} zal aan de ${gerechtigde} ten behoeve van de verzorging en opvoeding van ` +
        `${data.aantalKinderen === 1 ? 'het kind' : 'de kinderen'} een bijdrage betalen van ` +
        `� ${getValue(bedrag)} bruto per maand per kind.`
      ));
    }
  }

  // ============================================
  // ARTIKEL 2 - PARTNERALIMENTATIE
  // ============================================

  sections.push(
    createHeading('ARTIKEL 2. PARTNERALIMENTATIE', HeadingLevel.HEADING_2)
  );

  // Voorlopige alimentatie
  if (data.alimentatieRegeling === 'voorlopig-en-definitief' && data.voorlopigeAlimentatieBedrag) {
    const plichtige = data.alimentatieplichtige === 'man' ? 'man' : 'vrouw';
    const gerechtigde = data.alimentatieplichtige === 'man' ? 'vrouw' : 'man';
    const pronoun = data.alimentatieplichtige === 'man' ? 'haar' : 'hem';

    sections.push(
      createNumberedParagraph(
        '2.1',
        `Partijen stellen vast dat zij met ingang van ${formatDate(data.voorlopigeAlimentatieVanaf)} ` +
        `duurzaam gescheiden leven. Vanaf die datum tot aan de dag waarop de hieronder in artikel 2.4 genoemde regeling ` +
        `in werking treedt, draagt de ${plichtige} in het levensonderhoud van de ${gerechtigde} bij met een bedrag ` +
        `van � ${getValue(data.voorlopigeAlimentatieBedrag)} bruto per maand. Dit bedrag zal maandelijks bij ` +
        `vooruitbetaling aan ${pronoun} worden voldaan en wel v��r de eerste van iedere nieuwe maand.`
      )
    );
  }

  // Definitieve alimentatie
  if (data.alimentatieRegeling === 'voorlopig-en-definitief' && data.definitieveAlimentatieBedrag) {
    const plichtige = data.alimentatieplichtige === 'man' ? 'man' : 'vrouw';
    const gerechtigde = data.alimentatieplichtige === 'man' ? 'vrouw' : 'man';
    const pronoun = data.alimentatieplichtige === 'man' ? 'haar' : 'hem';

    sections.push(
      createNumberedParagraph(
        '2.4',
        `Op basis van de aldus vastgestelde behoefte en draagkracht, alsmede op basis van een vergelijking ` +
        `van de draagkracht van partijen, komen partijen overeen dat de ${plichtige} aan de ${gerechtigde} ` +
        `met ingang van de datum van inschrijving van de echtscheidingsbeschikking zal bijdragen in het levensonderhoud ` +
        `van de ${gerechtigde} met een bedrag van � ${getValue(data.definitieveAlimentatieBedrag)} bruto per maand, ` +
        `welk bedrag bij vooruitbetaling maandelijks aan ${pronoun} zal worden voldaan.`
      )
    );
  }

  if (data.alimentatieRegeling === 'alleen-definitief' && data.definitieveAlimentatieBedragAlleen) {
    const plichtige = data.alimentatieplichtigeAlleen === 'man' ? 'man' : 'vrouw';
    const gerechtigde = data.alimentatieplichtigeAlleen === 'man' ? 'vrouw' : 'man';
    const pronoun = data.alimentatieplichtigeAlleen === 'man' ? 'haar' : 'hem';

    sections.push(
      createNumberedParagraph(
        '2.4',
        `Op basis van de aldus vastgestelde behoefte en draagkracht, alsmede op basis van een vergelijking ` +
        `van de draagkracht van partijen, komen partijen overeen dat de ${plichtige} aan de ${gerechtigde} ` +
        `met ingang van de datum van inschrijving van de echtscheidingsbeschikking zal bijdragen in het levensonderhoud ` +
        `van de ${gerechtigde} met een bedrag van � ${getValue(data.definitieveAlimentatieBedragAlleen)} bruto per maand, ` +
        `welk bedrag bij vooruitbetaling maandelijks aan ${pronoun} zal worden voldaan.`
      )
    );
  }

  // Geen alimentatie
  if (data.alimentatieRegeling === 'geen') {
    sections.push(
      createNumberedParagraph(
        '2.4',
        'Partijen komen overeen dat geen partij aan de andere partij een bijdrage in het levensonderhoud verschuldigd zal zijn.'
      )
    );
  }

  // Afkoop
  if (data.alimentatieRegeling === 'afkoop' && data.afkoopBedrag) {
    const betaler = data.afkoopBetaler === 'man' ? 'man' : 'vrouw';
    const ontvanger = data.afkoopBetaler === 'man' ? 'vrouw' : 'man';
    const pronoun = data.afkoopBetaler === 'man' ? 'hij' : 'zij';

    sections.push(
      createNumberedParagraph(
        '2.7',
        `De ${betaler} koopt de alimentatie die ${pronoun} met ingang van de datum van ontbinding ` +
        `van het huwelijk van partijen aan de ${ontvanger} verschuldigd zal zijn af door storting van een ` +
        `afkoopsom ten bedrage van � ${getValue(data.afkoopBedrag)} op een door de ${ontvanger} aan te wijzen bankrekening.`
      )
    );
  }

  // Afstand van recht
  if (data.alimentatieRegeling === 'afstand') {
    sections.push(
      createNumberedParagraph(
        '2.9',
        'Partijen doen over en weer afstand van hun recht op partneralimentatie. Dit kan niet bij ' +
        'rechterlijke uitspraak worden gewijzigd op grond van een wijziging van omstandigheden, ' +
        'behoudens in het geval van een zo ingrijpende wijziging van omstandigheden, dat de partij ' +
        'die de wijziging verzoekt naar maatstaven van redelijkheid en billijkheid niet langer aan ' +
        'het niet-wijzigingsbeding mag worden gehouden, zoals in artikel 1:159 lid 3 BW is bepaald.'
      )
    );
  }

  // Indexering
  if (data.alimentatieRegeling === 'voorlopig-en-definitief' || data.alimentatieRegeling === 'alleen-definitief') {
    sections.push(
      createNumberedParagraph(
        '2.10',
        'Het in artikel 2.4 vastgestelde bedrag zal worden verhoogd met de wettelijke indexering ' +
        'als bedoeld in artikel 1:402a BW, voor het eerst per 1 januari volgend op de ingangsdatum.'
      )
    );
  }

  // ============================================
  // ARTIKEL 3 - WONING
  // ============================================

  sections.push(
    createHeading('ARTIKEL 3. DE ECHTELIJKE WONING', HeadingLevel.HEADING_2)
  );

  if (data.woningStatus === 'huur') {
    const toedeling = data.huurToedeling === 'man' ? 'man' : 'vrouw';
    sections.push(
      createNumberedParagraph(
        '3.1',
        `Partijen zijn huurders van de woning op het adres ${getValue(data.woningAdres)} te ` +
        `${getValue(data.woningWoonplaats)}. Na de datum van inschrijving van de echtscheidingsbeschikking ` +
        `zal dit huurrecht toekomen aan de ${toedeling}. Partijen zullen de rechter op grond van het bepaalde ` +
        `in artikel 7:266 lid 5 BW verzoeken te bepalen dat de ${toedeling} met ingang van voormelde datum ` +
        `huurder zal zijn van de woning.`
      )
    );
  } else if (data.woningStatus === 'eigen-toedeling') {
    const toedeling = data.woningToedeling === 'man' ? 'man' : 'vrouw';
    sections.push(
      createNumberedParagraph(
        '3.1',
        `Tot de gemeenschap van goederen van partijen behoort de onroerende zaak staande en gelegen ` +
        `aan de ${getValue(data.woningAdresEigen)} te ${getValue(data.woningWoonplaatsEigen)}.`
      ),
      createNumberedParagraph(
        '3.2',
        `De in artikel 3.1 genoemde onroerende zaak wordt voor de daaraan toegekende waarde van ` +
        `� ${getValue(data.woningWaarde)} toegedeeld aan de ${toedeling}.`
      )
    );

    if (data.hypotheekBedrag) {
      sections.push(
        createNumberedParagraph(
          '3.3',
          `Op de in artikel 3.1 genoemde onroerende zaak rust een schuld uit hoofde van hypothecaire geldlening. ` +
          `De restanthoofdsom van de hypothecaire geldlening bedraagt per ${formatDate(data.ondertekeningDatum)} ` +
          `� ${getValue(data.hypotheekBedrag)}.`
        )
      );
    }
  } else if (data.woningStatus === 'eigen-verkoop') {
    sections.push(
      createNumberedParagraph(
        '3.1',
        `Tot de huwelijkse gemeenschap van partijen behoort de onroerende zaak staande en gelegen ` +
        `aan de ${getValue(data.woningAdresVerkoop)} te ${getValue(data.woningWoonplaatsVerkoop)}.`
      ),
      createNumberedParagraph(
        '3.2',
        `Partijen hebben een makelaar opdracht gegeven de verkoop van de in artikel 3.1 genoemde onroerende zaak ter hand te nemen.`
      ),
      createNumberedParagraph(
        '3.5',
        `Enig positief restant (verkoopopbrengst -/- kosten -/- hypothecaire geldlening) zal aan partijen bij helfte toekomen.`
      )
    );
  } else if (data.woningStatus === 'geen') {
    sections.push(
      createNumberedParagraph(
        '3.1',
        'Partijen hebben geen gemeenschappelijke woning.'
      )
    );
  }

  // ============================================
  // SLOTBEPALINGEN
  // ============================================

  sections.push(
    createHeading('SLOTBEPALINGEN', HeadingLevel.HEADING_2),
    createParagraph(
      'Partijen verklaren dat zij volledig op de hoogte zijn van de gevolgen van dit convenant, ' +
      'de gelegenheid hebben gehad om juridisch advies in te winnen, en dit convenant uit vrije wil ' +
      'aangaan zonder dwang of ongeoorloofde be�nvloeding.'
    ),
    createParagraph(
      'Aldus overeengekomen en in drievoud opgemaakt en ondertekend te ' +
      getValue(data.ondertekeningPlaats) + ' op ' + formatDate(data.ondertekeningDatum) + '.'
    )
  );

  // ============================================
  // HANDTEKENINGEN
  // ============================================

  sections.push(
    new Paragraph({ text: '', spacing: { before: 400 } }),
    createParagraph('De man,', true),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    new Paragraph({
      children: [new TextRun('_________________________')],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [new TextRun(`${getValue(data.manVoornamen)} ${getValue(data.manAchternaam)}`)],
      spacing: { after: 400 }
    }),
    createParagraph('De vrouw,', true),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    new Paragraph({
      children: [new TextRun('_________________________')],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [new TextRun(`${getValue(data.vrouwVoornamen)} ${getValue(data.vrouwAchternaam)}`)]
    })
  );

  // ============================================
  // RETURN DOCUMENT
  // ============================================

  return new Document({
    sections: [{
      properties: {},
      children: sections
    }]
  });
};
