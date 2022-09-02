import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';
import Card from '../components/Card';
import { host } from '../utils/constanst';

export default function Mylist() {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);
  const [email, setemail] = useState(undefined);
  const [isScrolled, setIsScrolled] = useState(false);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setemail(currentUser.email);
    }
    else {
      navigate("/");
    }
  });

  useEffect(() => {
    if (email) {
      getAllMovies();
    }
  }, [email])

  const getAllMovies = async () => {
    try {
      const response = await fetch(`${host}/netflixapp/get/${email}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
      setmovies(json);
    } catch (error) {
      console.log(error.message);
    }
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.length !== 0 ? movies.map((movie, index) => {
            return (
              <Card key={index} movie={movie} isLiked={true} getAllMovies={getAllMovies} />
            );
          }) : <p className='nomovies'> Empty List. </p>
          }
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 3.5rem;
      .nomovies{
        color: wheat;
        font-size: 2rem;
      }
    }
  }
`;