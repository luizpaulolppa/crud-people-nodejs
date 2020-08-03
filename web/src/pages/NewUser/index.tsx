import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

import api from '../../service/api';

import './styles.css';

const NewUser: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [type, setType] = useState('PF');
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const history = useHistory();

  async function handleAddUser(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setErrors([]);

      if (!validateFields()) {
        return;
      }

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
      await api.post('/users', user);
      history.push('/');
    } catch(e) {
      setErrors(['Não foi possível salvar o usuário! Por favor tente novamente.'])
    }
  }

  function validateFields(): boolean {
    let newErrors: string[] = [];

    if (!name) {
      newErrors = [...newErrors, 'Nome deve ser preenchido'];
    }

    if (!cpfCnpj) {
      if (type == 'PF') {
        newErrors = [...newErrors, 'CPF é obrigatório'];
      } else {
        newErrors = [...newErrors, 'CNPJ é obrigatório'];
      }
    }

    if (type == 'PF' && !sex) {
      newErrors = [...newErrors, 'Sexo deve ser preenchido'];
    }

    if (type == 'PF' && !birthday) {
      newErrors = [...newErrors, 'Data de nascimento deve ser preenchido'];
    }

    if (!email) {
      newErrors = [...newErrors, 'E-mail deve ser preenchido'];
    }

    if (!photoUrl) {
      newErrors = [...newErrors, 'Foto URL deve ser preenchido'];
    }

    if (!phone) {
      newErrors = [...newErrors, 'Telefone deve ser preenchido'];
    }

    setErrors(newErrors);
    return !!!newErrors.length;
  }

  return (
    <>
      <Header />
      <div className="user-page">
        <form onSubmit={handleAddUser}>
          <h1>Novo usuário</h1>

          {
            errors.map((error, index) => (
              <div key={index} className="message-error">{error}</div>
            ))
          }

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
