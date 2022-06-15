import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from './Header';

const Login = ({ callback }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({
    code: '', 
    message: ''
  });

  const login = (e) => {
    setLoginError({ code: '', message: '' });

    const loginSuccess = () => {
      console.log("loginSuccess! arguments=");

      callback(true);
    }

    const loginFail = (err) => {
      console.log("loginFail! arguments=");
      
      setLoginError(err);
      callback(false);
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loginSuccess)
      .catch(loginFail);

    e.preventDefault();
  }

  return (
    <Router>
      <Header />
      <div className="p-5">
        <div className="text-center mb-8">
          <h1 className="text-th-blue-200 leading-tight text-4xl font-medium">Logga in</h1>
          <h3 className="text-xl">{loginError.code}</h3>
          <h3 className="text-xl">{loginError.message}</h3>
        </div>
      
        <form className="login-form" onSubmit={login}>
          <label className="input-label">
            Användarnamn 
            <input
              name="email"
              type="text"
              className="input"
              onChange={ ev => setEmail(ev.target.value) }
              value={email}
              placeholder="E-postadress"
            />
          </label>
      
          <label className="input-label">
            Lösenord
            <input name="password"
              type="password"
              className="input"
              onChange={ ev => setPassword(ev.target.value) }
              value={password}
              placeholder="Lösenord"
            />
          </label>
      
          <button onClick={login} className="btn btn-primary btn-block">
            Logga in
          </button>
        </form>
      </div>
    </Router>
  )
}

export default Login;
