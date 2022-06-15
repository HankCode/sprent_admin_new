import React, { useState } from "react";

import Input from './Input';
import Steps from './Component/Steps';

const validate = (data, fields) => {
  const errors = [];
  let lastStep;

  if (!data || data.length === 0) errors.push('Formuläret är tomt!');

  for(let i = 0; i < fields.length; i++) {
    const { inputs, step } = fields[i];

    for(let f = 0; f < inputs.length; f++) {
      const { name, type, label } = inputs[f];

      // console.log('check for', name, type, label, data[name]);
      if (type !== 'radio' && type !== 'spacer') {
        if (!data[name] || data[name] === '') {

          if (!lastStep) lastStep = step;

          errors.push(`${label} saknas`);
        }
      }
    }
  }

  return {
    errors,
    success: errors.length === 0,
    lastStep,
  };
};

const NavBtn = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

export default ({ fields, data, setData, onSubmit, onError }) => {
  const steps = fields.length;
  const [step, setStep] = useState(1);

  const next = () => setStep(Math.min(steps, step + 1));
  const prev = () => setStep(Math.max(1, step - 1));

  const set = (id, value) => {
    let newData = data;
    newData[id] = value;

    setData(newData);
  };

  const submit = (e) => {
    e.preventDefault();

    const { errors, success, lastStep } = validate(data, fields);

    console.log({ errors, lastStep });

    if (!success) {
      setStep(lastStep); // Aktivera om formuläret skall gå till första sidan det finns fel på.

      alert(errors.join('\n'));
      return onError({ errors, lastStep });
    } else if (confirm('Är du säker att du vill skicka in?')) {
      onSubmit(data);
    }
  }

  return (
    <div>
      {
        steps > 1
        && (
          <div>
            <Steps
              current={step}
              total={steps}
              change={setStep}
              className="block mx-auto"
            />
            <br />
            <br />
            { false
              && (
                <div className="flex justify-between">
                  <NavBtn onClick={prev}>
                    Föregående
                  </NavBtn>
                  <div>
                    {`${step} / ${steps}`}
                  </div>
                  <NavBtn onClick={next}>
                    Nästa
                  </NavBtn>
                </div>
              )
            }
          </div>
        )
      }
      <div>
        <form onSubmit={submit}>
          {
            fields
              .filter(({ step: id }) => id === step)
              .map(({ inputs, step, className }) => (
                <fieldset key={step} className={className}>
                  {
                    inputs.map(({ name, placeholder, label, ...props }) => {
                      console.log('typeof', typeof data[name]);
                      return (
                        <Input
                          label={label}
                          placeholder={placeholder}
                          initialValue={typeof data[name] !== 'undefined' ? data[name] : ''}
                          set={set}
                          id={name}
                          {...props}
                        />
                      )
                    })
                  }
                </fieldset>
              ))
          }

          <div className="flex justify-between">
            { 
              steps > 1
                ? (
                  <>
                    {
                      step === 1
                        ? (
                          <div />
                        ) : (
                          <NavBtn onClick={prev} disabled={step === 1}>
                            Tillbaka
                          </NavBtn>
                        )
                    }
                    {
                      step === steps
                        ? (
                          <button type="submit">Skicka in</button>
                        ) : (
                          <NavBtn onClick={next} disabled={step === steps}>
                            Nästa
                          </NavBtn>
                        )
                    }
                  </>
                ) : (
                  <>
                    <div />
                    <button type="submit">Skicka in</button>
                  </>
                )
            }
          </div>
        </form>
      </div>
    </div>
  );
};

