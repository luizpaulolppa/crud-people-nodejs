import React, { useState, FormEvent } from 'react';
import Header from '../../components/Header';

import api from '../../service/api';

import './styles.css';

const NewUser: React.FC = () => {
  const [type, setType] = useState('PF');
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  async function handleAddUser(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const user = {
        type,
        name,
        cpfCnpj,
        sex: type === 'PF' ? sex : null,
        birthday: type === 'PF' ? birthday : null,
        email,
        phone,
        photoUrl,
      }
      const response = await api.post('/users', user);
      console.log(response);
    } catch(e) {
      alert('Erro ao salvar usuário! tente novamente.')
    }
  }

  return (
    <>
      <Header />
      <div className="user-page">
        <form onSubmit={handleAddUser}>
          <h1>Novo usuário</h1>

          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <br />
            <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="cpfCnpj">{type == 'PF' ? 'CPF' : 'CNPJ'}</label>
            <input
              type="text"
              name="cpfCnpj"
              onChange={(e) => setCpfCnpj(e.target.value)} />
          </div>

          {type === 'PF' &&
            <div className="form-group">
              <label htmlFor="sex">Sexo</label>
              <input
                type="text"
                name="sex"
                onChange={(e) => setSex(e.target.value)} />
            </div>}

          {type === 'PF' &&
            <div className="form-group">
              <label htmlFor="birthday">Data de nascimento</label>
              <input
                type="date"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)} />
            </div>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="mail"
              name="email"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="photoUrl">Foto URL</label>
            <input
              type="text"
              name="photoUrl"
              onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>

          <div className="box-button">
            <button type="submit" className="button-save">Salvar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewUser;
