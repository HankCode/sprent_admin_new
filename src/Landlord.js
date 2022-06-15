import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import HRStatus from "./HRStatus";
const db = firebase.firestore();
const storage = firebase.storage(); // Get a reference to the storage service, which is used to create references in your storage bucket
const storageRef = storage.ref(); // Create a storage reference from our storage service
const { landlordStates } = require('./config');

export default ({ data, onClick, onStatusChange }) => {
  const [images, setImages] = useState('');
  const { id, status, houseType, address, city, beds } = data;
  const [open, setOpen] = useState(false);

  const select = () => onClick(id);
  const toggle = () => setOpen(!open);

  const onChange = ({ target: { value }}) => {
    db
      .collection('landlords')
      .doc(id)
      .set({
        ...data,
        status: value,
      })
      .then(() => {
        console.log('Status uppdaterad.', value);
        if (onStatusChange) onStatusChange(value);
      })
      .catch((err) => {
        alert('Det gick inte att uppdatera status!');
        console.log(err);
      });
  }

  useEffect(() => {
    // Create a reference under which you want to list
    const listRef = storageRef.child(id);

    listRef
      .listAll()
      .then((res) => {
        setImages(res.items.length);

        }).catch((error) => {
          console.error(error);
        });
  }, []);

  let title = [];

  if (address) title.push(address);
  if (city) title.push(city);
  if (title.length === 0) title.push('-');

  const { requestId, name, phone, zip, area, livingArea, livingrooms, bedrooms, price } = data;

  return (
    <>
      <div className="landlord data-row" key={id}>
        <div>{name}</div>
        <div>{phone}</div>
        <div>{`${address} ${zip} ${area}`}</div>
        <div>{houseType}</div>
        <div>{livingArea}</div>
        <div>{livingrooms}</div>
        <div>{bedrooms}</div>
        <div>{beds}</div>
        <div>{price}</div>
        <div>{images ? `${images} st`: '-'}</div>
        <div>
          <a onClick={select}>
            <Trans i18nKey="general.createOffer">Create offer</Trans>
          </a>
          <br />
          <a onClick={toggle} className="ml-4">
            Visa mer
          </a>
        </div>
      </div>
      {
        open
        && (
          <div className="p-4 bg-gray-200">
            <h3 className="text-lg font-medium mb-4">
              Detaljerad information
            </h3>
            <HRStatus 
              states={landlordStates}
              currentState={status}
              onChange={onChange}
            />

            <div>
              {
                requestId
                && (
                  <div className="flex mb-2 border-b border-b-gray-100">
                    <div className="w-1/5">
                      <Trans i18nKey={`hyraut.address`}>Accomodation ID</Trans>
                    </div>
                    <div className="flex-1">
                      {`A${requestId}`}
                    </div>
                  </div>
                )
              }
              <div className="flex mb-2 border-b border-b-gray-100">
                <div className="w-1/5">
                  <Trans i18nKey={`hyraut.address`}>address</Trans>
                </div>
                <div className="flex-1">
                  {`${data["address"]} ${data["zip"]} ${data["area"]}`}
                </div>
              </div>
              {
                Object
                  .keys(data)
                  .filter((key) => key !== 'createdAt' && key !== 'address' && key !== 'zip' && key !== 'area' && key !== 'requestId')
                  .sort()
                  .map((key) => {
                    let val = data[key];

                    if (val.hasOwnProperty('comment') && val.hasOwnProperty('checked')) {
                      const { checked, comment } = val;
                      val = `${checked ? "Ja" : "Nej"}${comment ? `: ${comment}`: ''}`;
                    }

                    return (
                      <div className="flex mb-2 border-b border-b-gray-100">
                        <div className="w-1/5">
                          <Trans i18nKey={`hyraut.${key}`}>{key}</Trans>
                        </div>
                        <div className="flex-1">
                          {val || 'Nej'}
                        </div>
                      </div>
                    );
                  })
              }
            </div>
            <button type="button" onClick={toggle}>Stäng</button>
          </div>
        )
      }
    </>
  );
}
