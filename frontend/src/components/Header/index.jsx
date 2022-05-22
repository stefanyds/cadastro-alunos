import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav } from './styles';

export default function Header() {
  const usuarioLogado = useSelector(
    (state) => state.loginReducer.usuarioLogado
  );

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      {usuarioLogado ? (
        <Link to="/user">
          <FaUserAlt size={24} />
        </Link>
      ) : (
        <Link to="/exit">
          <FaSignInAlt size={24} />
        </Link>
      )}
      <span style={{ color: '#fff' }}>
        {`Usuário Logado: ${usuarioLogado}`}
      </span>
    </Nav>
  );
}
