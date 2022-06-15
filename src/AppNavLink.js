import React from "react";
import { NavLink } from "react-router-dom";

const isActive = (match, location, to) => {
  if (to === "/") {
    const path = location.pathname.split('/');
    if (path && path.length >= 2) {
      const [a, b] = path;
      if (a === '' && b === '') return true;
      if (a === '' && b === 'tab') return true;
      return false;
    }
  }

  return match !== null;
};

const AppNavLink = ({ icon, activeIcon, label, to }) => (
  <NavLink
    isActive={(match, location) => isActive(match, location, to)}
    to={to}
    className="app-nav-link"
    activeClassName="active"
  >
  { /* <img src={`/${icon}`} className="icon" />
    <img src={`/${activeIcon}`} className="active-icon" /> */ }
    {label}
  </NavLink>
);

export default AppNavLink;

