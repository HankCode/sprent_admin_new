import React, { useState, useEffect } from "react";

const db = firebase.firestore();

import CreateOffer from './CreateOffer';
import LandlordList from './LandlordList';
import HRStatus from './HRStatus';

let timeout;
const { landlordStates: states } = require('./config');

export default () => {
	const [landlords, setLandlords] = useState([]);
	const [landlord, setLandlord] = useState(null);
	const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ready');

  const setDocs = (snap) => {
    if (!snap) return;

    const docs = [];

    snap.forEach((doc) => {
      const data = doc.data();
      let match = query === ''; // No search? Always match

      data.id = doc.id;

      Object
        .keys(data)
        .filter((key) => key !== 'createdAt')
        .map((key) => {
          let val = data[key];

          if (val && typeof val === 'number') val = val.toString();
          if (val && val.toLowerCase && val.toLowerCase().indexOf(query.toLowerCase()) >= 0) match = true;
        });

      if (match) docs.push(data);
    });

    setLandlords(docs);

    console.log(docs);
	}

	const getDocuments = () => {
		db
      .collection("landlords")
      .where("status", "==", status)
      .get()
      .then(setDocs)
      .catch((err) => {
        console.log(err);
      });
  }

  const selectLandlord = (id) => {
    setLandlord(null);
    setTimeout(() => setLandlord(id), 200);
  }

  const doQuery = (e) => {
    clearTimeout(timeout);
    const value = e.target.value;

    setTimeout(() => {
      setQuery(value);
      setLandlord(null);
    }, 300);
  }

  const onChange = ({ target: { value } }) => setStatus(value);
  const exit = () => setLandlord(null);

	useEffect(getDocuments, [query, status]);

	return (
    <>
      <div className="flex justify-between">
        <HRStatus 
          states={states}
          currentState={status}
          onChange={onChange}
        />
        <input type="text" className="w-full p-2 border border-grey-100" placeholder="Sök" onChange={doQuery} />
      </div>

      {
        landlords
        && landlords.length > 0
        && (
          <LandlordList
            landlords={landlords}
            selectLandlord={selectLandlord}
            onStatusChange={setStatus}
          />
        )
      }

      {
        landlord !== null
        && (
          <div className="pt-4">
            <CreateOffer landlordId={landlord} exit={exit} />
          </div>
        )
      }
    </>
  )
}
