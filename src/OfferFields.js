import React from 'react';
import {Trans} from 'react-i18next';

import TextInput from './Component/TextInput2';
import MultiTextInput from './Component/MultiTextInput';

export default ({ state }) => (
  <>
    <TextInput {...state("houseType")}>
      <Trans i18nKey="hyraut.houseType">Type of accommodation</Trans>
    </TextInput>

    <TextInput {...state("area")}>
      <Trans i18nKey="hyraut.area">Address</Trans>
    </TextInput>

    <TextInput {...state("livingArea")}>
      <Trans i18nKey="hyraut.livingArea">Living area</Trans>
    </TextInput>

    <TextInput {...state("bedrooms")}>
      <Trans i18nKey="hyraut.bedrooms">Bedrooms</Trans>
    </TextInput>

    <TextInput {...state("beds")}>
      <Trans i18nKey="hyraut.beds">Existing beds</Trans>
    </TextInput>

    <TextInput {...state("livingrooms")}>
      <Trans i18nKey="hyraut.livingrooms">Living Rooms</Trans>
    </TextInput>
      
    <TextInput {...state("kitchens")}>
      <Trans i18nKey="hyraut.kitchens">Kitchens</Trans>
    </TextInput>
      
    <TextInput {...state("wcs")}>
      <Trans i18nKey="hyraut.wcs">WC</Trans>
    </TextInput>

    <TextInput {...state("showers")}>
      <Trans i18nKey="hyraut.showers">Showers</Trans>
    </TextInput>
    <TextInput {...state("parkingspots")}>
      <Trans i18nKey="hyraut.parkingspots">Parking lots</Trans>
    </TextInput>
      
    <MultiTextInput {...state("included")}>
      <Trans i18nKey="hyraut.included">Included</Trans>
    </MultiTextInput>
    
    <MultiTextInput {...state("ovrigt")}>
      <Trans i18nKey="hyraut.ovrigt">Additional info</Trans>
    </MultiTextInput>
  </>
);
