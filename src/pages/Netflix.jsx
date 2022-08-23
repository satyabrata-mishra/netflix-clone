import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import backgroundimage from '../assets/home.jpg';
import Movielogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Netflix() {
  const [isScrolled, setisScrolled] = useState(false);
  const navigate = useNavigate();
  window.onscroll = () => {
    setisScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundimage} alt="background" className='background-image' />
      </div>
      <div className="container">
        <div className="logo">
          <img src={Movielogo} alt="Movie logo" />
        </div>
        <div className="buttons flex">
          <button className="flex j-center a-center" onClick={() => navigate("/player")}>
            <FaPlay /> Play
          </button>
          <button className="flex j-center a-center">
            <AiOutlineInfoCircle /> Info
          </button>
        </div>

      </div>
    </Container>
  )
}
const Container = styled.div`
  background-color: black;
  .hero{
    position: relative;
    .background-image{
      filter: brightness(50%);
    }
    img{
      height: 100vh;
      width: 100vw;
    }
  }
  .container{
      position: absolute;
      bottom: 5rem;
        img{
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
    }
    .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
`;