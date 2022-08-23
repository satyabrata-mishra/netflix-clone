import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
export default function Header(props) {
    const navigate = useNavigate();
    return (
        <Container className='flex a-center j-between'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <button onClick={() => { navigate(props.login ? "/" : "/signup") }}>
                {props.login ? "Login" : "SignIn"}
            </button>
        </Container>
    )
}
const Container = styled.div`
    padding: 0 4rem;
    .logo{
        img{
            height: 5rem;
        }
    }
    button{
        width: 5.2rem;
        height: 2rem;
        background-color: #e50914;
        border: none;
        outline: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1rem;
    }

`;