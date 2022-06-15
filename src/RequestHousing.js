import React, { useState } from "react";
import axios from "axios";

import { requestFields } from './config';

import FormBuilder from './FormBuilder';
import Ingress from "./Component/Ingress.js"
import Description from "./Component/Description.js"

export default () => {
  const [done, setDone] = useState(false);
  const [data, setData] = useState({});

  const submit = (data) => {
    console.log('submit', data);

    firebase
      .auth()
      .currentUser
      .getIdToken(true)
      .then(async (idToken) => {
        console.log({ idToken });
        return axios
          .post('/saveHousingRequest', { token: idToken, data })
          .then(({ data }) => {
            console.log(data);

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
  }

  const onError = (errors) => {
    console.log('Something went wrong', errors);
  };

  return (
    <div className="formbuilder">
      <h1 className="text-5xl font-bold">
        Request housing
      </h1>
      
      <Ingress className="text-2xl font-bold">
        Renting made easy all across Europe
      </Ingress>
      
      <Description className="text-base">
        Please fill out the form and we will contact you as soon as we have a proposal for your housing request
      </Description>

      {
        done
          ? (
            <div>
              <p>Tack för ditt meddelande!</p>
              <button type="button" onClick={reset}>Vill du skicka in fler förfrågningar? Fyll i igen</button>
            </div>
          ) : (
            <FormBuilder
              fields={requestFields}
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
