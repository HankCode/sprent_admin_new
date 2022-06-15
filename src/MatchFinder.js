import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Trans } from 'react-i18next';
import moment from 'moment';

import LandlordList from "./LandlordList";
import CreateOffer from "./CreateOffer";
import HRStatus, { Numbers } from "./HRStatus";

const { housingStates } = require('./config');
const db = firebase.firestore();

let timeout;

const Client = ({ data, tenant, refresh }) => {
  const { requestId, status, createdAt, companyname, orgnumber, email, phone, location, headcount, start, stop, budget, ovrigt } = data;
  const inkom = moment(createdAt ? createdAt.toDate() : '').format('YYYY-MM-DD HH:mm');

  const onChange = ({ target: { value }}) => {
    db
      .collection('rental')
      .doc(tenant)
      .set({
        ...data,
        status: value,
      })
      .then(() => {
        console.log('Status uppdaterad.', value);
        refresh();
      })
      .catch((err) => {
        alert('Det gick inte att uppdatera status!');
        console.log(err);
      });
  }

  return (
    <div className="mb-8 clientcard">
      <h3 className="text-lg font-medium mb-4">
        <Trans i18nKey={`housingRequests.singular`}>Housing Request</Trans>
      </h3>
      <HRStatus 
        states={housingStates}
        currentState={status}
        onChange={onChange}
      />

      <div className="grid grid-cols-2 w-1/2">
        <div>ID-nummer</div>
        <div>{requestId ? `${requestId} (${tenant})` : tenant}</div>
        
        <div>Inkommen</div>
        <div>{inkom}</div>
        
        <div>Kontakt</div>
        <div>
          {`${companyname}, ${orgnumber}`}
          <br />
          <a href={`mailto:${email}`}>{email}</a>
          <br />
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
        
        <div>Plats</div>
        <div>{location}</div>
        
        <div>Antal personer</div>
        <div>{headcount ? `${headcount} st` : ''}</div>
        
        <div>Hyrestid</div>
        <div>{`${start} - ${stop}`}</div>
        
        <div>Budget</div>
        <div>{budget}</div>
        
        <div>Övrigt</div>
        <div>{ovrigt}</div>
      </div>
    </div>
  )
};

export default () => {
	const [clientInfo, setClientInfo] = useState({});
	const [landlords, setLandlords] = useState([]);
	const [landlord, setLandlord] = useState(null);
	const [areas, setAreas] = useState([]);
	const [area, setArea] = useState('');
	const [reqBeds, setBeds] = useState(0);
	const [reqRooms, setRooms] = useState(0);
	const [query, setQuery] = useState('');

	const { tenant } = useParams();

  const doQuery = (e) => {
    clearTimeout(timeout);
    const value = e.target.value;

    setTimeout(() => {
      setQuery(value);
      setLandlord(null);
    }, 300);
  }


	const getTenantInfo = () => {
    if (!tenant) return null;

		db
      .collection("rental")
      .doc(tenant)
      .get()
      .then((doc) => {
        if (!doc.exists) return;

        const data = doc.data();
        const { location, headcount } = data;

        console.log("gotTenantInfo: data:", data);
        setClientInfo(data);
        if (location) setArea(location.toLowerCase());
        setBeds(parseInt(headcount, 10));
        setRooms(parseInt(headcount, 10));
      })
      .catch((err) => {
        console.log(err);
      });
	}

	const getHouseSuggestions = () => {
		db
      .collection("landlords")
      .where("status", "!=", "pending")
      .get()
      .then((snap) => {
        const documents = [];

        snap.forEach((doc) => {
          if (!doc.exists) return;

          let match = query === ''; // No search? Always match
          const data = doc.data();

          data.id = doc.id;

          Object
            .keys(data)
            .filter((key) => key !== 'createdAt')
            .map((key) => {
              let val = data[key];

              console.log({ val, query });

              if (typeof val === 'number') val = val.toString();
              if (val && val.toLowerCase && val.toLowerCase().indexOf(query.toLowerCase()) >= 0) match = true;
            });

          if (match) documents.push(data);
          // documents.push(data);
        });

        setLandlords(documents);
      })
      .catch((err) => {
        console.log(err);
      });
	}

	const getAreas = () => {
		db
      .collection("landlords")
      .where("beds", "!=", null)
      .get()
      .then((snap) => {
        const areas = {};

        snap.forEach((doc) => {
          if (!doc.exists) return;

          const { area } = doc.data();

          if (area && area.length > 3 && !areas.hasOwnProperty(location)) areas[area] = 1;
        });

        const data = Object
          .keys(areas)
          .map((key) => ({
            key: key.toLowerCase(),
            label: key,
          }));

        setAreas([
          { key: '', label: 'Alla' },
          ...data,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
	}

  const selectLandlord = (id) => {
    setLandlord(null);
    setTimeout(() => setLandlord(id), 200);
  }

  const changeArea = ({ target: { value }}) => setArea(value);
  const changeRooms = ({ target: { value }}) => setRooms(parseInt(value, 10));
  const changeBeds = ({ target: { value }}) => setBeds(parseInt(value, 10));
  const exit = () => setLandlord(null);

	useEffect(getHouseSuggestions, [clientInfo, query]);
	useEffect(getTenantInfo, [tenant]);
	useEffect(getAreas, []);

  let filter = landlords.filter(({ bedrooms, beds }) => {
    const b = parseInt(beds, 10);
    const br = parseInt(bedrooms, 10);

    return b && b >= reqBeds && br && br >= reqRooms;
  });

  if (area && area !== '') {
    filter = filter.filter(({ area: str }) => str && str.toLowerCase().indexOf(area) >= 0);
  }

	return (
    <div>
      <Client
        data={clientInfo}
        tenant={tenant}
        refresh={getTenantInfo}
      />

      <div>
        <h3 className="text-xl mt-8 mb-4">Dessa hyresvärdar matchar</h3>
        <input type="text" className="w-full p-2 border border-grey-100" placeholder="Sök" onChange={doQuery} />
        <HRStatus 
          states={areas}
          currentState={area}
          onChange={changeArea}
          label="Ort"
        />
        <Numbers 
          currentState={reqRooms}
          onChange={changeRooms}
          label="Sovrum"
        />
        <Numbers 
          currentState={reqBeds}
          onChange={changeBeds}
          label="Sängar"
        />
        <LandlordList
          landlords={filter}
          selectLandlord={selectLandlord}
          onStatusChange={getHouseSuggestions}
        />
      </div>

      {
        landlord !== null
        && (
          <div className="pt-4">
            <CreateOffer landlordId={landlord} exit={exit} />
          </div>
        )
      }
    </div>
  );
}
