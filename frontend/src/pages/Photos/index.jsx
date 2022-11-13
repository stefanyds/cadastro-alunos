import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import * as actions from '../../store/modules/login/actions';

export default function Photos() {
  const { id } = useParams();
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getPhoto = async () => {
      try {
        const { data } = await axios.get(`students/${id}`);
        const photoUrl = get(data, 'Photos[0].url', '');
        setPhoto(photoUrl);
        console.log(photo);
      } catch (error) {
        const errors = get(error, 'respoonse.data.errors', []);
        const status = get(error, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer o login!');
          dispatch(actions.doLoginFailure());
          navigate('/login');
        } else {
          errors.forEach((e) => toast.error(e));
          navigate('/');
        }
      }
    };
    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <h1>Fotos</h1>
    </Container>
  );
}
