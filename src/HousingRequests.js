import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import HRStatus from './HRStatus';

const db = firebase.firestore();
const { housingStates: states } = require('./config');

export default () => {
	const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('ready');

  const setDocs = (snap) => {
    if (!snap) return;

    const docs = [];

    snap.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;

      const { companyname, createdAt } = data;

      console.log(companyname, createdAt);

      if (companyname && createdAt) {
        docs.push(data);
      } else {
        console.log(data);
      }
    });

    setRequests(docs);

    console.log(docs);
	}

	const getDocuments = () => {
		db
      .collection("rental")
      .where("status", "==", status)
      .get()
      .then(setDocs)
      .catch((err) => {
        console.log(err);
      });
  }

  const onChange = ({ target: { value } }) => setStatus(value);

	useEffect(getDocuments, []);
	useEffect(getDocuments, [status]);

  // if (!requests || requests.length === 0) return null;

	return (
    <>
      <HRStatus 
        states={states}
        currentState={status}
        onChange={onChange}
      />
      <div className="housing-requests data-table">
        <div className="house-request data-row head">
          <div>Ärende-number</div>
          <div>Inkommen</div>
          <div>Kontakt</div>
          <div>Plats</div>
          <div>Antal personer</div>
          <div>Hyrestid</div>
          <div>Budget</div>
          <div>Övrigt</div>
        </div>
        {
          requests
          && requests.length > 0
          && requests.map(({
            id,
            companyname,
            headcount,
            location: place,
            createdAt,
            orgnumber,
            ovrigt,
            budget,
            start,
            stop,
            phone,
            email,
            requestId,
          }) => {
            const inkom = moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm');
      
            return (
              <Link className="house-request data-row" key={id} to={`/match/${id}`}>
                <div>{requestId || id}</div>
                <div>{inkom}</div>
                <div>
                  {`${companyname}, ${orgnumber}`}
                  {'\n'}
                  {`${email} ${phone}`}
                </div>
                <div>{place}</div>
                <div>{headcount ? `${headcount} st` : ''}</div>
                <div>{`${start} - ${stop}`}</div>
                <div>{budget}</div>
                <div>{ovrigt}</div>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}
