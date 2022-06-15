export const housingStates = [
  { key: 'pending', label: 'Väntar granskning' },
  { key: 'ready', label: 'Redo' },
];

export const landlordStates = [
  { key: 'pending', label: 'Inväntar granskning' },
  { key: 'ready', label: 'Redo för uthyrning' },
  { key: 'sprent', label: 'Uthyrd av Sprent AB' },
  { key: 'rented', label: 'Uthyrd av annan' },
  { key: 'sold', label: 'Såld' },
  { key: 'sent-offert', label: 'Skickad i Offert' },
  { key: 'denied', label: 'Neckad' },
];

export const objectTypes = [
  { key: '', label: '[ Välj hustyp ]' },
  { key: 'Lägenhet', label: 'Lägenhet' },
  { key: 'Hus', label: 'Hus' },
  { key: 'Villa', label: 'Villa' },
  { key: 'Radhus', label: 'Radhus' },
  { key: 'Stuga', label: 'Stuga' },
  { key: 'Parhus', label: 'Parhus' },
  { key: 'Korridorsrum', label: 'Korridorsrum' },
  { key: 'Herrgård', label: 'Herrgård' },
  { key: 'Loftgångshus', label: 'Loftgångshus' },
  { key: 'Övrigt', label: 'Övrigt' },
];

export const requestFields = [{
  step: 1,
  inputs: [{
    name: 'companyname',
    label: 'Företagsnamn',
  }, {
    name: 'orgnumber',
    label: 'Organisationsnummer',
  }, {
    name: 'email',
    label: 'E-postaddress',
  }, {
    name: 'phone',
    label: 'Telefonnummer',
  }, {
    name: 'location',
    label: 'Plats',
  }, {
    name: 'headcount',
    label: 'Antal personer',
  }, {
    name: 'start',
    label: 'Start för hyrestid',
  }, {
    name: 'stop',
    label: 'Slut för hyrestid',
  }, {
    name: 'budget',
    label: 'Budget i SEK',
  }, {
    name: 'ovrigt',
    label: 'Övrig information',
    type: 'textarea'
  }],
}];

export const hostFields = [{
  step: 1,
  inputs: [{
    name: 'name',
    placeholder: 'Ditt namn',
    label: 'Fullständigt namn',
  }, {
    name: 'email',
    placeholder: 'Din e.postadress',
    label: 'E-post',
  }, {
    name: 'phone',
    placeholder: 'Ditt telefonnummer',
    label: 'Telefonnummer',
  }],
}, {
  step: 2,
  className: 'formgrid',
  inputs: [{
    name: 'address',
    label: 'Address',
    className: 'col-span-2',
  }, {
    name: 'area',
    label: 'Ort',
  }, {
    name: 'zip',
    label: 'Postnummer',
  }, {
    name: 'houseType',
    label: 'Type av hus',
    type: 'select',
    options: objectTypes,
  }, {
    name: 'livingArea',
    label: 'Boyta',
    type: 'number',
    suffix: 'm2',
    min: 0,
    max: 400,
  }, {
    name: 'rooms',
    label: 'Antal rum',
    type: 'number',
  }, {
    name: 'bedrooms',
    label: 'Antal sovrum',
    type: 'number',
  }, {
    name: 'beds',
    label: 'Antal sängar',
    type: 'number',
  }, {
    name: 'livingrooms',
    label: 'Antal vardagsrum',
    type: 'number',
  }, {
    name: 'kitchens',
    label: 'Antal kök',
    type: 'number',
  }, {
    name: 'wcs',
    label: 'Antal toaletter (wcs)',
    type: 'number',
  }, {
    name: 'showers',
    label: 'Antal duschar',
    type: 'number',
  }, {
    name: 'parkingspots',
    label: 'Antal parkeringsplatser',
    type: 'number',
  }, {
    name: 'dateAvailable',
    label: 'Datum när uthyrning är tillgängligt',
    placeholder: 'När är boendet tillgängligt',
  }, {
    name: 'price',
    label: 'Önskat månadspris',
    placeholder: '9600 kr / mån',
  }],
}, {
  step: 3,
  className: 'formgrid',
  inputs: [{
    name: 'internet',
    placeholder: '100/100 Mbit Fiber',
    helper: 'Fyll gärna i mer information här',
    label: 'Internet finns?',
    type: 'radio',
  }, {
    name: 'washmachine',
    label: 'Tvättmaskin finns?',
    type: 'radio',
  }, {
    name: 'dryer',
    label: 'Torktumlare finns?',
    type: 'radio',
  }, {
    name: 'garbage',
    label: 'Sophämtning ingår?',
    type: 'radio',
  }, {
    name: 'koksutrustning',
    label: 'Köksutrustning ingår?',
    type: 'radio',
  }, {
    name: 'moblerat',
    label: 'Möblereat?',
    type: 'radio',
  }, {
    name: 'water-heating',
    label: 'Vatten värme el?',
    type: 'radio',
  }, {
    name: 'tradgard-skottning',
    label: 'Trädgårdsskötsel, skottning?',
    type: 'radio',
  }, {
    name: 'ovrigt',
    label: 'Andra bekvämligheter',
    placeholder: 'Balkong, uteplats, pool etc',
    type: 'textarea',
    className: 'col-span-2',
  }, {
    name: 'gdpr',
    label: 'I understand and agree to the Terms and conditions',
    placeholder: 'Balkong, uteplats, pool etc',
    type: 'checkbox',
    url: 'https://www.sprent.se/privacy-policy/',
    className: 'col-span-2',
  }],
}];
