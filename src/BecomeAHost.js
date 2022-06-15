import React, { useState } from "react";
import axios from "axios";

import FormBuilder from './FormBuilder';
import { hostFields } from './config';
import Ingress from "./Component/Ingress.js"
import ImageUpload from "./Component/ImageUpload.js"

export default () => {
  const [documentId, setDocumentId] = useState(null);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({});

	const submit = () => {
    console.log('submit', data);

    firebase
      .auth()
      .currentUser
      .getIdToken(true)
      .then(async (idToken) => {
        console.log({ idToken });
        return axios
          .post('/saveLandlordRequest', { token: idToken, data })
          .then(({ data }) => {
            console.log(data);

            setDocumentId(data.documentId);

            setDone(true);
            alert('Tack för din förfrågan nr ' + data.requestId);
          });
      })
      .catch((err) => {
        console.log(err);
      });
	}

  const reset = () => {
    setDone(false);
    setData({});
    setDocumentId(null);
  }

  const onError = (errors) => {
    console.log('Something went wrong', errors);
  };

  return (
    <div className="formbuilder">
      <h1 className="text-5xl font-bold">
        Become a host
      </h1>
    
      <Ingress className="text-2xl font-bold">
        How can I become a host and rent out my apartment?
        {' '}
        <a href="https://www.sprent.se/for-hosts/">Click here for more information</a>
      </Ingress>

      {
        done
          ? (
            <div>
              <p>Tack för ditt meddelande!</p>
              <button type="button" onClick={reset}>Har du fler boenden? Fyll i igen</button>

              <ImageUpload dir={documentId + "/"} />
            </div>
          ) : (
            <FormBuilder
              fields={hostFields}
              data={data}
              setData={setData}
              onSubmit={submit}
              onError={onError}
            />
          )
      }
    </div>
  );
};
