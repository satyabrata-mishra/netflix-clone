import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../components/Background';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';
import {useNavigate} from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(false);
    const [formValues, setformValues] = useState({
        email: "",
        password: ""
    });
    const handleSignin = async () => {
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error.message);
        }
        navigate("/netflix");
    };
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser){
            navigate("/netflix");
        }
    });
    return (
        <Container showPassword={showPassword}>
            <Background />
            <div className="content">
                <Header login />
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Unlimited Movies</h1>
                        <h4>Watch anywhere. Cancel anytime</h4>
                        <h6>Ready to watch? Enter your email to create an account.</h6>
                    </div>
                    <div className="form">
                        <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value })} />
                        {
                            showPassword && <input type="password" placeholder='Password' value={formValues.password} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value })} name='password' />
                        }
                        {
                            !showPassword && <button onClick={() => setshowPassword(true)}>Get Started</button>
                        }
                    </div>
                    <button onClick={handleSignin}>Signup</button>
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
    .body{
        gap: 1rem;
        .text{
            gap: 1rem;
            text-align: center;
            font-size: 2rem;
            h1{
                padding: 0 2.5rem;
            }
        }
        .form{
            display: grid;
            grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
            width: 60%;
            input{
                color: black;
                border: 1px solid black;
                padding: 1rem;
                font-size: 1.2rem;
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
`;