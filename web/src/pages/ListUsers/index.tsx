import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Header from '../../components/Header';

import './styles.css';

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <>
      <Header />
      <div className="users-page">
        <div className="users">
          {
            users.map(user => (
              <div className="user" key={user}>
                <div className="box-info">
                  <img src="https://avatars3.githubusercontent.com/u/13604790?s=400&u=4a3f579504a3a441ba6d1ef8896f84bb04841a85&v=4" alt="Perfil" />
                  <div>
                    <p>Luiz Paulo Pilegi de Almeida</p>
                    <strong>PF</strong>
                  </div>
                </div>
                <FiChevronRight size={20} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
};

export default ListUsers;
