import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import Header from '../../components/Header';

import './styles.css';
import api from '../../service/api';
import UserDTO from '../../dto/UserDTO';

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    api.get('/users')
    .then((response) => {
      setUsers(response.data.users);
    })
  }, []);

  return (
    <>
      <Header />
      <div className="users-page">
        <div className="users">
          {
            users.map(user => (
              <Link to={`/users/${user.id}`} className="user" key={user.id}>
                <div className="box-info">
                  <img src={user.photoUrl} alt="Perfil" />
                  <div>
                    <p>{user.name}</p>
                    <strong>{user.type}</strong>
                  </div>
                </div>
                <FiChevronRight size={20} />
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
};

export default ListUsers;
