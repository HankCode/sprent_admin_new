import React from 'react';
import { Link } from "react-router-dom";
import logo from './gfx/sprent-logo.png';

const Header = ({ children }) => (
  <div className="header">
    <Link to="/">
      <img src={logo} alt="Sprent Logotype" width="122" />
    </Link>
    {children}
  </div>
)

export default Header;
