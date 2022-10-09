import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/login/actions';
import Loading from '../../components/Loading';

export default function User() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.loginReducer.user);
  const isLoading = useSelector((state) => state.loginReducer.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser.id) return;
    setName(authUser.name);
    setEmail(authUser.email);
  }, [authUser.email, authUser.id, authUser.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }
    if (!authUser.id && (password.length < 6 || password.length > 12)) {
      formErrors = true;
      toast.error('Senha deve conter de 6 a 12 caracteres');
    }
    if (formErrors) {
      return;
    }

    dispatch(
      actions.doRegisterUserRequest(
        {
          id: authUser.id,
          name,
          email,
          password,
        },
        navigate
      )
    );
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{authUser.id ? 'Editar dados' : 'Crie sua conta'}</h1>
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
        <button type="submit">
          {authUser.id ? 'Salvar' : 'Crie sua conta'}
        </button>
      </Form>
    </Container>
  );
}
