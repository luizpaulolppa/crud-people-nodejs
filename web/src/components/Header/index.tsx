import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/medprev-logo.png';

const Header: React.FC = () => (
  <nav className="header-menu">
    <div className="container">
      <Link to="/">
        <img src={logo} alt="Logo MedPrev"/>
      </Link>
      <div>
        <Link to="/">USUÁRIOS</Link>
        <Link to="/users/new">NOVO USUÁRIO</Link>
      </div>
    </div>
  </nav>
);

export default Header;
