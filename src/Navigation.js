import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import AppNavLink from './AppNavLink';

const Navigation = () => {
  const [requestCounter, setRequestCounter] = useState(0);

  const attachListenerForNewDocuments = () => {
    const db = firebase.firestore();

    // Listen for changes
    db
      .collection("rental")
      .where("1", "==", "1")
      .onSnapshot(({ size }) => setRequestCounter(size));

    // Get initial count
    db
      .collection("rental")
      .get()
      .then(({ size }) => setRequestCounter(size));
  }

  useEffect(attachListenerForNewDocuments, []);

  return (
    window.innerWidth > 800
      ? (<DesktopNav requestCounter={requestCounter} />)
      : (<MobileNav requestCounter={requestCounter} />)
  )
}

const DesktopNav = ({ requestCounter }) => (
  <NavMenu className="desktop" requestCounter={requestCounter} />
)

const MobileNav = ({ requestCounter }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  if (!open) {
    return (
      <button className="mobileMenu" onClick={toggle}>☰</button>
    )
  }

  return (
    <div className="mobileMenu">
      <button className="mobileMenu" onClick={toggle}>x</button>
      <NavMenu className="mobile" requestCounter={requestCounter} />
    </div>
  )
}

const NavMenu = ({ className, requestCounter }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  // const nav = t("housingRequests.nav") + ` (${requestCounter})`;
  const nav = t("housingRequests.nav");
  const landlords = t("landlords.nav");
  const hyra = t("hyra.nav");
  const hyraut = t("hyraut.nav");

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout successful! arguments=");
      }).catch((err) => {
        console.log("logout error! arguments=");
        setLoginError(err);
      });
  }

  return (
    <>
      <div className={`navMenu ${className}`}>
        <div>
          <p>
            Visas bara för er
          </p>
          <AppNavLink to="/" label={nav} />
          <AppNavLink to="/landlords" label={landlords} />
        </div>
        <div>
          <p>
            Publika sidor
          </p>
          <AppNavLink to="/become-a-host" label={hyraut} />
          <AppNavLink to="/request-housing" label={hyra} />
        </div>
        <a onClick={logout} className="app-nav-link">
          <Trans i18nKey="general.logout">Logout</Trans>
        </a>
      </div>

      <div className="lang-select">
        {
          language === 'en'
            ? (
              <button type="button" onClick={() => changeLanguage('sv')}>
                <Trans i18nKey="general.language.english">English</Trans>
              </button>
            ) : (
              <button type="button" onClick={() => changeLanguage('en')}>
                <Trans i18nKey="general.language.swedish">Swedish</Trans>
              </button>
            )
        }
      </div>
    </>
  )
}

export default Navigation;
