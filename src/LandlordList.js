import React from 'react';

import Landlord from "./Landlord";

  /*
    Fullständigt namn på Uthyrare
    Telefonnummer
    Adress (inkl ort, alltså variablerna i samma rad: Adress+Postnr+Ort)
    Hustyp (typ av boende, är en array-variabel, se JSON-filen)
    Boyta
    Antal rum
    Antal sovrum
    Antal sängar
    Önskat SEK av Uthyrare (variabeln för det uthyraren vill ha betalt)
    Bilder (om den har bilder så kan det bara stå "ja")
    Knapp: Skapa offert
    Knapp: Visa mer (alla fält för Acco ID ifråga)
   * */

export default ({ landlords, selectLandlord, ...props }) => (
  <div className="landlords data-table">
    <div className="landlord data-row head">
      <div>Uthyrare</div>
      <div>Telefonnummber</div>
      <div>Adress</div>
      <div>Hustyp</div>
      <div>Boyta</div>
      <div>Antal vardagsrum</div>
      <div>Antal sovrum</div>
      <div>Antal sängar</div>
      <div>Önskat SEK</div>
      <div>Bilder</div>
      <div />
    </div>
    {
      landlords
      && landlords.length > 0
      && landlords.map((data) => (
        <Landlord
          data={data}
          key={data.id}
          onClick={selectLandlord}
          {...props}
        />
      ))
    }
  </div>
)
