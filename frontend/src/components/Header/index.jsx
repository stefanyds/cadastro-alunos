import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from './styles';
import * as actions from '../../store/modules/login/actions';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.doLoginFailure());
    navigate('/login');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/user">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/login" onClick={handleLogout}>
            <FaPowerOff size={24} title="Logout" />
          </Link>
          <div>
            <FaCircle size={24} color="#66ff33" title="Online" />
          </div>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} title="Login" />
        </Link>
      )}
    </Nav>
  );
}
