import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../components/Background';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setformValues] = useState({
    email: "",
    password: ""
  });
  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/netflix");
    }
  });
  return (
    <Container>
      <Background />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <h3>Login</h3>
            <div className="container flex column">
              <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value })} />
              <input type="password" placeholder='Password' value={formValues.password} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value })} name='password' />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
position:relative;
height: 100vh;
overflow: hidden;
.content{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vw;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
      gap: 2rem;
      height: 85vh;
      .form{
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap:2rem;
        color: white;
        .container{
          gap:2rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;
            &:focus{
                outline: none;
            }
          }
          button{
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            outline: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1rem;
          }
        }
      }
    }
}
`;