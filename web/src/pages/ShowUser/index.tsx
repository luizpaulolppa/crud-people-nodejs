import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import './styles.css';
import api from '../../service/api';
import UserDTO from '../../dto/UserDTO';
import Header from '../../components/Header';

interface Params {
  id: string;
}

const ShowUser: React.FC = () => {
  const [user, setUser] = useState<UserDTO>();

  const { params } = useRouteMatch<Params>();

  useEffect(() => {
    api.get(`/users/${params.id}`)
      .then((response) => {
        setUser(response.data);
      })
  }, []);

  return (
    <>
      <Header />
      <div className="show-user-page">
        <div className="show-user-container">
          <h1>Usuário {user?.name}</h1>
          <div className="box-group">
            <div>
              <strong>Tipo</strong>
              <p>{user?.type}</p>
            </div>
          </div>

          <div className="box-group">
            <div>
              <strong>E-mail</strong>
              <p>{user?.email}</p>
            </div>
          </div>

          {user?.type === 'PF' &&
            <div className="box-group">
              <div>
                <strong>Data de aniversário</strong>
                <p>{user?.birthday}</p>
              </div>
            </div>}

          {user?.type === 'PF' &&
            <div className="box-group">
              <div>
                <strong>Sexo</strong>
                <p>{user?.sex}</p>
              </div>
            </div>}

          <div className="box-group">
            <div>
              <strong>CPF/CNPJ</strong>
              <p>{user?.cpfCnpj}</p>
            </div>
          </div>

          <div className="box-group">
            <div>
              <strong>Telefone</strong>
              <p>{user?.phone}</p>
            </div>
          </div>

          <div className="box-button">
            <Link to={`/users/${user?.id}/edit`} className="button-save">Editar</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUser;
