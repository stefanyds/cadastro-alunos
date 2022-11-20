import styled from 'styled-components';
import * as colors from '../../styles/colors';

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 2px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    width: 180px;
    height: 180px;
  }

  input {
    display: none;
  }
`;
