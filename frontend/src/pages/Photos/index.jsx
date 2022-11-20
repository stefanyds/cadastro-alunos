import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import * as actions from '../../store/modules/login/actions';
import Loading from '../../components/Loading';
import { Form } from './styled';

export default function Photos() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getPhoto = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`students/${id}`);
        const photoUrl = get(data, 'Photos[0].url', '');
        setPhoto(photoUrl);
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
      } finally {
        setIsLoading(false);
      }
    };
    getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (event) => {
    const newPhoto = event.target.files[0];
    const photoUrl = URL.createObjectURL(newPhoto);
    setPhoto(photoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', newPhoto);

    try {
      setIsLoading(true);
      await axios.post('/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto atualizada com sucesso!');
      navigate(`/student/${id}/edit`);
    } catch (error) {
      toast.error('Erro ao enviar a foto do aluno');
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Fotos</h1>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
