import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Title } from './styled';
import axios from '../../services/axios';

export default function Login() {

  const showMessage = () => {
    toast.success('Login realizado com sucesso');
    toast.error('Usuário ou senha inválida');
    toast.warn('Senha informada muito fraca. Cuidado para não ser hackeado!');
    toast.info('Tudo certo');
  };

  return (
    <Container>
      <Title isRed={false}>Login</Title>
      <button type="button" onClick={showMessage}>
        Login
      </button>
    </Container>
  );
}
