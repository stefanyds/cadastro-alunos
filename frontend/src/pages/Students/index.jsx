import { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { StudentContainer, ProfilePicture, NewStudentLink } from './styled';
import Loading from '../../components/Loading';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setLoading(false);
    };

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const deleteLink = e.currentTarget;
    const exclamationIcon = e.currentTarget.nextSibling;
    exclamationIcon.setAttribute('display', 'block');
    deleteLink.remove();
  };

  const handleDelete = async (event, id, index) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.delete(`/students/${id}`);

      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
    } catch (e) {
      const status = get(e, 'response.status', 0);
      const errors = get(e, 'response.data.errors', []);

      if (status === 401) {
        toast.error('Você precisa fazer login');
        navigate('/login');
      } else if (status === 404) {
        toast.error('Aluno não encontrado');
      } else {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Listagem de Alunos</h1>
      <NewStudentLink to="/student">Novo aluno</NewStudentLink>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={student.id}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img src={student.Photos[0].url} alt="Foto do aluno" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span className="info">
              <span className="name">{student.name}</span>
              <span>{student.email}</span>
            </span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link
              to={`/student/${student.id}/delete`}
              onClick={handleDeleteAsk}
            >
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              cursor="pointer"
              display="none"
              title="Confirma a exclusão?"
              onClick={(e) => handleDelete(e, student.id, index)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
