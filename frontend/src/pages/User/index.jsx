import { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function User() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', { name, email, password }); // endereço do backend
      toast.info(`${response.data.name} foi cadastrado com sucesso`);
    } catch (error) {
      const listError = get(error, 'response.data.errors', []);
      listError.forEach((err) => {
        toast.error(err);
      });
    }
  };
  return (
    <Container>
      <h1>Crie sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
