import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (isEmail(email) === false) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 12) {
      formErrors = true;
      toast.error('Senha deve conter de 6 a 12 caracteres');
    }
    if (formErrors) return;
    toast.success('Validação do formulário de Login efetuada com sucesso!');
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
