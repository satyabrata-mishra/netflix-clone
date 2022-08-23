import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs';
import video from '../assets/video.mp4';
import { useNavigate } from 'react-router-dom';


export default function Player() {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={()=>{navigate(-1)}} />
                </div>
                <div className="video">
                    <video src={video}  loop controls ></video>
                </div>
            </div>
        </Container>
    )
} 
const Container = styled.div`
height: 100vh;
width: 100vw;
overflow:hidden;
   .player{
    width: 100vw;
    height: 100vh;
    .back{
        position: absolute;
        padding: 2rem;
        z-index: 1;
        svg{
            font-size: 3rem;
            cursor: pointer;
        }
    }
    video{
        height: 100vh;
        width: 100vw;
        object-fit: cover;
    }
   } 
`;